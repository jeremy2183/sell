<template>
	<div class="nav">
		<!-- 使用 router-link 組件來導航. -->
    <!-- 通過傳入 `to` 屬性指定鏈接. -->
    <!-- <router-link> 默認會被渲染成一個 `<a>` 標籤 -->
    <router-link to="/goods" class="nav-item">點菜</router-link>
    <router-link to="/ratings" class="nav-item">評價</router-link>
    <router-link to="/seller" class="nav-item">商家</router-link>
	</div>
</template>

<script>
	export default{

	}
</script>

<style>
	.nav{
		display: flex;
		width: 100%;
		height: 40px;
		line-height: 40px;
	}
	.nav .nav-item{
		flex: 1;
		text-align: center;
	}
</style>