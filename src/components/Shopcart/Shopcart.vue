<template>
	<div class="shopcart" :class="{highlight: totalCount>0}">
		<div class="shopcart-wrapper">
			<div class="content-left">
				<div class="logo-wrapper" :class="{highlight: totalCount>0}" @click="toggleList">
					<span class="logo icon-shopping_cart" :class="{highlight: totalCount>0}"></span>
					<i class="num" v-show="totalCount">{{totalCount}}</i>
				</div>
				<div class="desc-wrapper">
					<p class="total-price" v-show="totalPrice">¥{{totalPrice}}</p>
					<p class="tip" :class="{highlight: totalCount>0}">{{poiInfo.shipping_fee_tip}}</p>
				</div>
			</div>
		
			<div class="content-right" :class="{highlight: totalCount>0}">
				{{payStr}}
			</div>

			<div class="shopcart-list" v-show="listShow" :class="{show: listShow}">
				<div class="list-top" v-if="poiInfo.discounts2">
					{{poiInfo.discounts2[0].info}}
				</div>
				<div class="list-header">
					<div class="title">1號口袋</div>
					<div class="empty" @click="emptyFn">
						<img src="./ash_bin.png"/>
						<span>清空購物車</span>
					</div>				
				</div>
				<div class="list-content" ref="listContent">
					<ul>
						<li class="food" v-for="food in selectFoods">
							<div class="desc">
								<div class="desc-left">
									<p class="name">{{food.name}}</p>
									<p class="unit" v-show="!food.description">{{food.unit}}</p>
									<p class="description" v-show="food.description">{{food.description}}</p>
								</div>
								<div class="desc-right">
									<div class="price">¥{{food.min_price}}</div>
								</div>
							</div>
							<div class="cartcontrol-wrapper">
								<Cartcontrol :food='food'></Cartcontrol>
							</div>
						</li>
					</ul>
				</div>

				<div class="list-bottom"></div>
			</div>
		</div>
		
		<div class="shopcart-mask" v-show="listShow" @click="hideMask"></div>
	</div>

	
</template>

<script>
	//導入Cartcontrol
	import Cartcontrol from 'components/Cartcontrol/Cartcontrol'
	//導入BSscroll
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				fold: true
			}
		},
		props: {
			// min_price_tip: {
			// 	type: String,
			// 	default: ''
			// },
			// shipping_fee_tip: {
			// 	type: String,
			// 	default: '', 
			// },
			poiInfo: {
				type: Object,
				default: {}
			},
			selectFoods: {
				type: Array,
				default(){
					return [
						// {
						// 	min_price: 10,
						// 	count: 3
						// },
						// {
						// 	min_price: 7,
						// 	count: 5
						// }
					];
				}
			}
		},
		computed: {
			//總個數
			totalCount(){
				let num = 0;
				this.selectFoods.forEach((food)=>{
					num += food.count;
				});
				return num;
			},
			//計算總金額
			totalPrice(){
				let total = 0;
				this.selectFoods.forEach((food)=>{
					total += food.min_price * food.count; //價格乘個數
				});
				return total;
			},
			//結算按鈕顯示
			payStr(){
				if(this.totalCount > 0){
					return "去結算";
				}else{
					return this.poiInfo.min_price_tip;
				}
			},
			listShow(){
				if(!this.totalCount){	//個數為0
					this.fold = true;	
					return false;
				}
				let show = !this.fold;

				// BScroll相關
				if(show){
					//DOM更新時的處理
					this.$nextTick(()=>{
						if(!this.shopScroll){	//DOM更新前
							this.shopScroll = new BScroll(this.$refs.listContent, {
								click: true
							});
						}else {	//DOM更新後
							this.shopScroll.refresh();
						}
					});
				}
				return show;
			}
		},
		methods: {
			toggleList(){
				if(!this.totalCount){	//個數為0
					return;
				}
				this.fold = !this.fold
			},
			emptyFn(){
				this.selectFoods.forEach((food)=>{
					food.count = 0;
				})
			},
			hideMask(){
				this.fold = true;
			}
		},
		components: {
			Cartcontrol,
			BScroll
		}
	}
</script>

<style>
	@import url('Shopcart.css')
</style>