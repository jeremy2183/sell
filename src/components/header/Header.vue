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
				<div class="more-bt">
					<i class="s-radius"></i>
					<i class="s-radius"></i>
					<i class="s-radius"></i>
				</div>
			</div>
		</div>

		<!-- 主體內容 -->
		<div class="content-wrapper">
			<div class="icon" :style="head_bg">
				<!-- <img :src="poiInfo2.pic_url"> -->
			</div>
			<div class="name">
				<h3>{{poiInfo2.name}}</h3>
			</div>
			<div class="collect">
				<img src="../../../resource/img/star.png">
				<span>收藏</span>
			</div>
		</div>

		<!-- 公告內容 -->
		<div class="bulletin-wrapper">
			<img class="icon" v-if="poiInfo2.discounts2" :src="poiInfo2.discounts2[0].icon_url">
			<span class="text" v-if="poiInfo2.discounts2">
				{{poiInfo2.discounts2[0].info}}
			</span>
			<div class="detail" v-if="poiInfo2.discounts2">
				{{poiInfo2.discounts2.length}}個活動
				<span class="icon-keyboard_arrow_right"></span>
			</div>
		</div>

		<!-- 背景 -->
		<div class="bg-wrapper" :style="content_bg">
			<!-- <img :src="poiInfo2.head_pic_url"> -->
		</div>

		<!-- 公告詳情 -->
		<div class="bulletin-detail">
			<div class="detail-wrapper">
				<div class="content-wrapper">
					<div class="icon" :style="head_bg"></div>
					<h3 class="name">{{poiInfo2.name}}</h3>
					<!-- 評價 稍後 -->
					<p class="tip">
						{{poiInfo2.min_price_tip}} <i>|</i>
						{{poiInfo2.shipping_fee_tip}} <i>|</i>
						{{poiInfo2.delivery_time_tip}}
					</p>
					<div class="time">
						配送時間:{{poiInfo2.shipping_time}}
					</div>
					<div class="discounts">
						<p>
							<img v-if="poiInfo2.discounts2" :src="poiInfo2.discounts2[0].icon_url">
							<span v-if="poiInfo2.discounts2">{{poiInfo2.discounts2[0].info}}</span>
						</p>
					</div>
				</div>

				<div class="close-wrapper">
					<span class="icon-close"></span>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default{
		props: {	//組件傳值
			poiInfo2: {	//自定義屬性
				type: Object,
				default: {}
			}
		},
		computed: {	//計算屬性
			content_bg(){	//背景
				return "background-image: url(" + this.poiInfo2.head_pic_url + ")";
			},
			head_bg(){	//麥當勞icon
				return "background-image: url(" + this.poiInfo2.pic_url + ")";
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