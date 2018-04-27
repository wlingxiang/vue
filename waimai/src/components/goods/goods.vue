<template>
   <div class="goods">
     <div class="menu-wrapper" ref="menuwrapper">
       <ul>
         <li v-for="(item,index) in goods"class="menu-item" :class="{'current':
         currentIndex===index}" @click="selectMenu(index,$event)">
           <span class="text border-1px ">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
           </span>

         </li>
       </ul>
     </div>
     <div class="foods-wrapper" ref="foodswrapper" >
       <ul>
         <li v-for="(item,index) in goods" class="foot-list food-list-hook">
           <h1 class="title">{{item.name}}</h1>
           <ul>
             <li v-for="(food,index) in item.foods" class="food-item border-1px">
               <div icon>
                 <img :src="food.icon" width="57" height="57">
               </div>
               <div class="content">
                 <h2 class="name">{{food.name}}</h2>
                 <p class="desc">{{food.description}}</p>
                 <div class="extra">
                   <span class="count">月售{{food.sellCount}}份</span>
                   <span>好评率{{food.rating}}%</span>
                 </div>
                 <div class="price">
                   <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                 </div>
                 <div class="cartcontrol-wrapper">
                   <cartcontrol :food="food"></cartcontrol>
                 </div>
               </div>
             </li>
           </ul>
         </li>
       </ul>
     </div>


      <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"></shopcart>
   </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart'
  import cartcontrol from '../cartcontrol/cartcontrol'
    export default {
        name: "goods",
      props :{
          seller:{}
      },
      data(){
        return{
          goods:[],
          listHeight:[],
          scrollY : 0
        }

      },
      methods:{
          //添加菜单点击事件
        selectMenu(index,event){
          //阻止浏览器默认派发事件
          if(!event._constructed){
            return
          }
          let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook')
          let el = foodList[index]
          //调用插件跳转
          this.foodScroll.scrollToElement(el,300)

          console.log(2)

        },
          //商品界面滚动函数，运用插件better-scroll
        _initScroll(){
          this.meunScroll = new BScroll(this.$refs.menuwrapper,{
            //插件默认阻止点击事件
            click:true
          })
          this.foodScroll = new BScroll(this.$refs.foodswrapper,{
            //插件默认阻止点击事件
            click:true,
            //可以时刻获取滚动的位置
            probeType:3
          })
          //监听滚动事件 获取手指y坐标
          this.foodScroll.on('scroll',(pos)=>{
            //先取整数再取绝对值
            this.scrollY =Math.abs( Math.round(pos.y))

          })

        },
        _calculateHeight (){
          //习惯class后加hook为js操作用
          //获取每个子元素的高度
          let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook')
          let height = 0
          this.listHeight.push(height)
          for(let i=0;i<foodList.length;i++){
            let item = foodList[i]
            height +=item.clientHeight
            this.listHeight.push(height)
          //  console.log(1)
          }

        }



      },
      computed:{
        //获取当前手指滚动到第几个元素
        currentIndex(){
          for(let i=0;i<this.listHeight.length;i++){
            let height1 = this.listHeight[i]
            let height2=this.listHeight[i+1]
            if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
              return i;
            }

            }
          return 0

          },
        selectFoods(){
          let foods =[]
          this.goods.forEach((good)=>{
            good.foods.forEach((food)=>{
              if(food.count){
                foods.push(food)
              }
            })
          })
          return foods
        }


        },






      mounted(){
        this.classMap=['decrease','discount','special','invoice','guarantee']
          this.$http.get('./api/goods').then((res)=>{
           res = res.body

            this.goods = res.data
            //很重要-----------------------------------------------------------
            this.$nextTick(()=>{
              this._initScroll()
              this._calculateHeight ()


            })


          })
        //
        //this. _calculateHeight ()



      },
      components:{
          shopcart,
        cartcontrol
      }

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"

  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden

    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height 14px
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #fff
          font-weight 700
          .text
            border-none()

        .icon
          display inline-block
          width 12px
          height 12px
          vertical-align top
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')


        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7,17,27,0.1))
          font-size 12px


    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147,153,159)
        background #f3f5f
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          boder-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(1,17,27)
          .desc, .extra
            margin-bottom 8px
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
          .desc
            line-height 12px
            margin-bottom 8px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240,20,20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147,153,159)


          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px







</style>
