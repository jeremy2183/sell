<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease " @click="decreaseCart" v-show="food.count">
				<span class="icon-remove_circle_outline"></span>
			</div>
		</transition>

		<div class="cart-count" v-show="food.count">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click="addCart">
			<i class="bg"></i>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';

	export default{
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			decreaseCart(){
				this.food.count--;
			},
			addCart(){
				if(!this.food.count){
					//Vue.set( target, key, value )
					Vue.set(this.food,'count',1)
				}else {
					this.food.count++;
				}
			}	
		}
	}
</script>

<style>
@import url('Cartcontrol.css');
</style>