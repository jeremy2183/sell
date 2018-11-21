<template>
	<transition name="detail">
		<div class="foods" v-show="showFlag">
			<div class="food-wrapper">
				<div class="food-content">
					<div class="img-wrapper">
						<img class="food-img" :src="food.picture">
						<span class="close-bt icon-close" @click="closeView"></span>
						<img class="share-bt" src="./share.png">
						<img class="more-bt" src="./more.png">
					</div>
					<div class="content-wrapper">
						<h3 class="name">{{food.name}}</h3>
						<p class="saled">{{food.month_saled_content}}</p>
						<img class="product" v-show="food.product_label_picture" :src="food.product_label_picture">
						<p class="price">
							<span class="text">¥{{food.min_price}}</span>
							<span class="unit">/{{food.unit}}</span>
						</p>
						<div class="cartcontrol-wrapper">
							<Cartcontrol :food='food'></Cartcontrol>
						</div>
						<div class="buy" v-show="!food.count || food.count==0" @click="addFirst">選規格</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	//導入Cartcontrol
	import Cartcontrol from 'components/Cartcontrol/Cartcontrol'
	//導入Vue
	import Vue from 'vue'
	export default{
		data(){
			return {
				showFlag: false
			}
		},
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			//父組件是可以調用子組件的方法
			showView(){
				this.showFlag = true;
			},
			closeView(){
				this.showFlag = false;
			},
			addFirst(){
				Vue.set(this.food,'count',1);
			}
		},
		components: {
			Cartcontrol
		}
	}
</script>

<style>
	@import url('Food.css');
</style>