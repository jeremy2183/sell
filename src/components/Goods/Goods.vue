<template>
	<div class="goods">
		<!-- 分類 -->
		<div class="menu-wrapper"></div>

		<!-- 商品列表 -->
		<div class="foods-wrapper"></div>
	</div>
</template>

<script>
	export default{
			date(){
				return{
					container: {},
					goods: []
				}
			},
			created(){  //發起異步請求，獲取數據
	    var that = this;
	    //通過axios發起get請求
	    this.$axios.get('/api/goods')
	      .then(function (response) { //獲取到數據
	        var dataSource = response.data;
	        if(dataSource.code == 0){
	        	that.container = dataSource.data.container_operation_source;
	        	that.goods = dataSource.data.food_spu_tags;
	          console.log(that.container);
	          console.log(that.goods);
	        }
	      })
	      .catch(function (error) { //出錯處理
	        console.log(error);
	      });
	  }
	}
</script>

<style>
	@import url(Goods.css);
</style>