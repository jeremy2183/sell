<template>
	<transition name="detail">
		<div class="foods" v-show="showFlag" @click="closeView">
		</div>
	</transition>
</template>

<script>
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
			}
		}
	}
</script>

<style>
	@import url('Food.css');
</style>