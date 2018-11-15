<template>
	<div class="cartcontrol">
		<div class="cart-decrease icon-remove_circle_outline" @click="decreaseCart" v-show="food2.count"></div>
		<div class="cart-count" v-show="food2.count">{{food2.count}}</div>
		<div class="cart-add icon-add_circle" @click="addCart">
			<i class="bg"></i>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default{
		props: {
			food2: {
				type: Object
			}
		},
		methods: {
			decreaseCart(){
				this.food2.count--;
			},
			addCart(){
				if(!this.food2.count){
					//Vue.set( target, key, value )
					Vue.set(this.food2,'count',1)
				}else {
					this.food2.count++;
				}
			}	
		}
	}
</script>

<style>
@import url('Cartcontrol.css');
</style>