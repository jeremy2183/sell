<template>
	<div class="foods" v-show="showFlag">
		
	</div>
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
			}
		}
	}
</script>

<style>
	@import url('Food.css');
</style>