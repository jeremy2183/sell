<template>
  <div id="app">
    <!-- header -->
    <Myheader :poiInfo2='poiInfo'></Myheader>

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
  },
  created(){  //發起異步請求，獲取數據
    var that = this;
    //通過axios發起get請求
    this.$axios.get('/api/goods')
      .then(function (response) { //獲取到數據
        // console.log(response);
        var dataSource = response.data;
        // console.log(dataSource);
        if(dataSource.code == 0){
          that.poiInfo = dataSource.data.poi_info;
          // console.log(that.poiInfo);
        }
      })
      .catch(function (error) { //出錯處理
        console.log(error);
      });
  }
}
</script>

<style>

</style>
