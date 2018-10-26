<template>
	<div class="nav">
		<!-- 使用 router-link 組件來導航. -->
    <!-- 通過傳入 `to` 屬性指定鏈接. -->
    <!-- <router-link> 默認會被渲染成一個 `<a>` 標籤 -->
    <router-link to="/goods" class="nav-item">
    	點菜
    	<i class="line"></i>
    </router-link>
    <router-link to="/ratings" class="nav-item">
	    評價
	    <i class="line"></i>
  	</router-link>
    <router-link to="/seller" class="nav-item">
    	商家
			<i class="line"></i>
    </router-link>
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
		border-bottom: 1px solid #e4e4e4;
	}
	.nav .nav-item{
		flex: 1;
		text-align: center;
		font-size: 16px;
		text-decoration: none;
		color: #666;
		position: relative;
	}
	.nav .active{
		color: #ffbb22;
	}
	.nav .active .line{
		width: 20px;
		height: 2px;
		display: inline-block;
		background: #ffbb22;
		position: absolute;
		left: 50%;
		bottom: 0;
		margin-left: -10px;
	}
</style>