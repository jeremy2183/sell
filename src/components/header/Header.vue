<template>
	<div class="header">
			<!-- {{poiInfo2.name}} -->
		<!-- 頂部 -->
		<div class="top-wrapper">
			<div class="back-wrapper">
				<span class="icon-arrow_lift"></span>
			</div>

			<div class="search-wrapper">
				<span class="search-icon"></span>
				<input class="search-bar" type="text" placeholder="搜索店內商品">
			</div>

			<div class="more-wrapper">
				<a class="spelling-bt" href="#">選單</a>
				<div class="more-bt"></div>
			</div>
		</div>

		<!-- 主體內容 -->
		<div class="content-wrapper"></div>

		<!-- 公告內容 -->
		<div class="bulletin-wrapper"></div>

	</div>
</template>

<script>
	export default{
		props: {
			poiInfo2: {	//自定義屬性
				type: Object,
				default: {}
			}
		}
	}
</script>

<style>
	/*導入字體圖標*/
	@import url(../../common/styles/icon.css);
	/* 導入css樣式 */
	@import url(Header.css);
</style>