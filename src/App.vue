<template>
  <div id="app">
    <!-- header -->
    <Myheader></Myheader>

    <!-- nav -->
    <Mynav></Mynav>

    <!-- content -->
    <!-- <div class="content">
      content
    </div> -->
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>

  </div>
</template>

<script>
//1.導入
import Myheader from './components/Header/Header';
import Mynav from './components/Nav/Nav';

export default {
  name: 'App',
  components: { //2.註冊
    Myheader,Mynav
  },
  data(){
    return{
      //header組件需要的信息(商家信息)
      poiInfo: {}
    }
  }
}
</script>

<style>

</style>
