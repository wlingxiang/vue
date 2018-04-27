<template>
<div class="header">
  <!-------内容区---------->
  <div class="content-wrapper">
    <!-------头像---------->
    <div class="avatar">
      <img :src="seller.avatar" alt="" width="64" height="64">
    </div>
    <!-------内容---------->
    <div class="content">
      <div class="title">
        <!-------商标--------->
        <span class="brand"></span>
        <!-------商家名字---------->
        <span class="name">{{seller.name}}</span>
      </div>
      <!-------配送描叙---------->
      <div class="description">
        {{seller.description}}/{{seller.deliveryTime}}分钟送达
      </div>
      <!---因为是异步加载数据，所以要先判断数据是否存在再渲染---------->
      <div v-if="seller.supports" class="support">
        <span class="icon" :class="classMap[seller.supports[0].type]"></span>
        <span class="text">{{seller.supports[0].description}} </span>
      </div>
    </div>
    <div class="support-count" v-if="seller.supports" @click="showDetail">
      <span class="count">{{seller.supports.length}}个</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>

  </div>

  <!-------公告区---------->
  <div class="bulletin-wrapper" @click="showDetail">
    <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
    <i class="icon-keyboard_arrow_right"></i>
  </div>
  <!-------背景图---------->
  <div class="background">
    <img :src="seller.avatar" alt="" width="100%" height="100%">
  </div>
  <!-------弹出层---------->
  <transition name="fade">
    <div class="detail" v-show="detailShow">
      <!-------sticky footers布局---------->
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item,index) in seller.supports">
              <span class="icon":class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公共</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>

        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </transition>









</div>
</template>

<script>
  import star from '@/components/star/star'
    export default {
        name: "header",
      data(){
          return{
            detailShow:false
          }
      },
      props:{
          seller : {
            type: Object
          }
      },
      components:{star},
      methods:{
          showDetail(){
            this.detailShow=true
          },
          hideDetail(){
            this.detailShow=false
          }
      },
      mounted(){
          this.classMap=['decrease','discount','special','invoice','guarantee']
      }
    }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"

  .header
    position relative
    overflow hidden
    color: #fff
    background rgba(7,17,27,0.5)

    .content-wrapper
      position relative
      padding : 24px 12px 18px 24px
      font-size 0//因为有空白字符所以设置为0
      .avatar
        display : inline-block
        vertical-align top
        img
          border-radius 2px
      .content
        display : inline-block
        margin-left 16px

        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align top//对齐方式
            width : 30px
            height 18px
            bg-image('brand')//背景导入函数
            background-size 30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight bold

        .description
          margin-bottom 10px
          line-height 12px
          font-size 12px
        .support
          .icon
            display inline-block

            width 12px
            height 12px
            margin-right 4px
            background-size 12px 12px
            background-repeat no-repeat

            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')


          .text
            line-height 12px
            font-size 10px



      .support-count
        position absolute
        right 12px
        bottom 18px
        padding 0 8px
        height 24px
        line-height 24px
        border-radius 14px
        background rgba(0,0,0,0.2)
        text-align center
        .count
          font-size 10px
        .icon-keyboard_arrow_right
          font-size 10px
          margin-left 2px
          line-height 24px
          font-size 10px


    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space  nowrap
      overflow hidden
      text-overflow ellipsis
      background rgba(7,17,87,0.2)


      .bulletin-title
        display inline-block
        vertical-align top
        margin-top 7px

        width 22px
        height 12px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        vertical-align top
        margin 0 4px
        font-size 10px

      .icon-keyboard_arrow_right
        position absolute
        font-size 10px
        right 12px
        top 8px


    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)//模糊背景
    .detail
      position fixed
      top 0
      left 0
      z-index 100
      width 100%
      height 100%
      overflow auto
      opacity 1
      background rgba(7,17,27,0.8)
      background-filter blur(10px)
      &.fade-enter,&.fade-leave-active
        transition all 0.8s

      &.fade-enter-active,&.fade-leave-active
        opacity 0
        background rgba(7,17,27,0)
      .detail-wrapper
        width 100%
        min-height 100%
        .detail-main
          margin-top 64px
          padding-bottom  64px
          .name
            line-height 16px
            text-align center
            font-size 16px
            font-weight 700
          .star-wrapper
            margin-top 18px
            padding 2px 0
            text-align center
          .title
            display flex
            width 80%
            margin 28px auto 24px auto
            .line
              flex 1
              position relative
              top -6px
              border-bottom 1px solid rgba(255,255,255,0.2)
            .text
              padding 0 12px
              font-weight 700
              font-size 14px

          .supports
            width 80%
            margin 0 auto
            .support-item
              padding 0 12px
              margin-bottom 12px
              font-size 0
              &:last-child
                margin-bottom 0
              .icon
                display inline-block
                width 16px
                height 16px
                vertical-align top
                margin-right 6px
                background-size 16px 16px
                background-repeat no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')


              .text
                line-height 16px
                font-size 12px

          .bulletin
            width 80%
            margin 0 auto
            .content
              padding 0 12px
              line-height 24px
              font-size 12px

  .detail-close
        postion relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px





</style>
