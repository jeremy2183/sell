<template>
	<div class="goods">
		<!-- 分類 -->
		<div class="menu-wrapper" ref="menuScroll">
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
		<div class="foods-wrapper" ref="foodScroll">
			<ul>
				<!-- 專場 -->
				<li class="container-list food-list-hook">
					<div v-for="item in container.operation_source_list">
						<img :src="item.pic_url">
					</div>
				</li>

				<!-- 具體分類 -->
				<li v-for="item in goods" class="food-list food-list-hook">
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
	//導入BSscroll
	import BScroll from 'better-scroll'

	export default{
			data(){
				return{
					container: {},
					goods: [],
					listHeight: [],
					scrollY: 0,
					menuScroll: {},
					foodScroll: {}
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

	          //調用滾動的初始化方法
	          // that.initScroll();
	          //開始時, DOM元素沒有渲染，即高度是有問題
	          //在獲取到元素之後，且DOM已經被渲染，表示列表高度是沒有問題

	          // nextTick
	          that.$nextTick( ()=>{
	          	//DOM已經更新
	          	that.initScroll();

	          	//計算分類區間高度
	          	that.calculateHeight();

	          });


	        }
	      })
	      .catch(function (error) { //出錯處理
	        console.log(error);
	      });
	  },
	  methods: {
	  	head_bg(imgName){
	  		return "background-image: url(" + imgName + ")";
	  	},
	  	//滾動初始化
	  	initScroll(){
	  		// ref屬性就是用來綁定某個DOM元素或某個組件，然後在this.$refs裡面
	  		this.menuScroll = new BScroll(this.$refs.menuScroll);
	  		this.foodScroll = new BScroll(this.$refs.foodScroll, {
	  			probeType: 3
	  		});

	  		//添加滾動監聽事件
	  		this.foodScroll.on('scroll', (pos) => {
	  			// console.log(pos.y);
	  			this.scrollY = Math.abs(Math.round(pos.y));
	  		});
	  	},
	  	calculateHeight(){
	  		//通過$refs獲取到對應的元素
	  		let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');

	  		//添加到數組區間
	  		// 0~218 第一個區間(專場)
	  		// 219~1477 第二個區間(熱銷)
	  		let height = 0;
	  		this.listHeight.push(height);
	  		for(let i=0; i<foodlist.length; i++){
	  			let item = foodlist[i];

	  			//累加
	  			height += item.clientHeight;
	  			this.listHeight.push(height);
	  		}
	  	}
	  },
	  computed: {	//計算屬性(不能傳遞參數)
	  	currentIndex(){	//根據右側滾動位置，確定對應的索引下標
	  		for (let i=0; i<this.listHeight.length; i++){
	  			//獲取商品區間的範圍
	  			let height1 = this.listHeight[i];
	  			let height2 = this.listHeight[i+1];

	  			//是否在上述區間中
	  			if(this.scrollY >= height1 && this.scrollY < height2){
	  				console.log(1);
	  				return 1;
	  			}
	  		}
	  	}
	  }
	}
</script>

<style>
	@import url(Goods.css);
</style>