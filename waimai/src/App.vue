<template>
  <div id="app">
    <!--头部----------------------------------------------------------------------------------->


      <v-header :seller="seller"></v-header>

      <!--标签----------------------------------------------------------------------------------->
      <div class="tab border-1px">
        <div class="tab-item">
          <router-link :to="{name:'goods'}">点餐</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/ratings">评论</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/seller">商家</router-link>
        </div>

      </div>

      <router-view :seller="seller"></router-view>


    <!--导航----------------------------------------------------------------------------------->
    <div class="nav">

    </div>


    <!--内容----------------------------------------------------------------------------------->
    <div class="content">

    </div>

  </div>
</template>

<script>
import header from './components/header/header'
  export default {
  data(){
    return{
      //获取1商家信息
      seller : {}
    }
  },
    mounted(){
      this.$http.get('./api/seller').then((res)=>{
          res = res.body
        //console.log(res)
        //获取商家信息并附值
        this.seller = res.data
      })
    },
  components:{
    'v-header':header
  }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  #app
    .tab
      display : flex
      width : 100%
      height : 40x
      line-height : 40px
     // border-bottom : 1px solid rgba(7,17,27,0.1)
      //position : relative
     &>.tab

      border-1px( rgba(7,17,27,0.1))
      .tab-item
          flex : 1
          text-align : center
          &>a
            display : block
            font-size: 14px
            color: rgb(77,85,93)
            &.active
              color: rgb(240,20,20)

</style>
