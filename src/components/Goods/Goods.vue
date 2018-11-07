<template>
	<div class="goods">
		<!-- 分類 -->
		<div class="menu-wrapper">
			<ul>
				<!-- 專場 -->
				<li class="menu-item">
					<p class="text">
						<img :src="container.tag_icon" v-if="container.tag_icon" class="icon">
						{{container.tag_name}}
					</p>
				</li>

				<li class="menu-item" v-for="item in goods">
					<p class="text">
						<img :src="item.icon" v-if="item.icon" class="icon">
						{{item.name}}
					</p>
				</li>
			</ul>
		</div>

		<!-- 商品列表 -->
		<div class="foods-wrapper">
			<ul>
				<!-- 專場 -->
				<!-- <li class="container-list">
					<div v-for="item in container.operation_source_list">
						<img :src="item.pic_url">
					</div>
				</li> -->

				<!-- 具體分類 -->
				<li v-for="item in goods" class="food-list">
					<h3 class="title">{{item.name}}</h3>
					<!-- 具體商品列表 -->
					<ul>
						<li v-for="food in item.spus" class="food-item">
							<div class="icon" :style="head_bg(food.picture)"></div>

							<div class="content">
								<h3 class="name">{{food.name}}</h3>	<!--商品名稱-->
								<p class="desc" v-if="food.description">{{food.description}}</p> <!--商品描述-->
								<div class="extra">
									<span class="saled">{{food.month_saled_content}}</span>	<!--月銷售-->
									<span class="praise">{{food.praise_content}}</span>	<!--按讚數-->
								</div>
								<img class="product" :src="food.product_label_picture">
								<p class="price">
									<span class="text">¥{{food.min_price}}</span>
									<span class="unit">/{{food.unit}}</span>
								</p>
							</div>
						</li>
					</ul>

				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
			data(){
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
	          // console.log(that.container);
	          // console.log(that.goods);
	        }
	      })
	      .catch(function (error) { //出錯處理
	        console.log(error);
	      });
	  },
	  methods: {
	  	head_bg(imgName){
	  		return "background-image: url(" + imgName + ")";
	  	}
	  }
	  // computed: {	//計算屬性(不能傳遞參數)
	  // 	head_bg(){
	  // 		return
	  // 	}
	  // }
	}
</script>

<style>
	@import url(Goods.css);
</style>