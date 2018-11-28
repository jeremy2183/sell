<template>
	<div class="seller">
		<div class="seller-wrapper">
			<Split></Split>
			<div class="seller-view">
				<div class="address-wrapper">
					<div class="address-left">
						{{seller.address}}
					</div>
					<div class="address-right">
						<div class="content"></div>
					</div>
				</div>
				<div class="pic-wrapper" v-if="seller.poi_env" ref="picsView">
					<ul class="pics-list" ref="picsList">
						<li class="pics-item" v-for="imgurl in seller.poi_env.thumbnails_url_list" ref="picsItem">
							<img :src="imgurl">
						</li>
					</ul>
				</div>
				<div class="safety-wrapper">
					查看食品安全檔案
					<span class="icon-keyboard_arrow_right"></span>
				</div>
			</div>
			
			<Split></Split>
			<div class="tip-wrapper">
				<div class="delivery-wrapper">配送服務：{{seller.app_delivery_tip}}</div>
				<div class="shipping-wrapper">配送時間：{{seller.shipping_time}}</div>
			</div>

			<Split></Split>
			<div class="other-wrapper">
				<div class="service-wrapper">
					商家服務
					<div class="poi-service" v-for="item in seller.poi_service">
						<img :src="item.icon">
						{{item.content}}
					</div>
				</div>
				<div class="discounts-wrapper">
					<div class="discounts-item" v-for="item in seller.discounts2">
						<div class="icon">
							<img :src="item.icon_url">
						</div>
						<div class="text">
							{{item.info}}
						</div>
					</div>
				</div>
			</div>
			<Split class="bottom"></Split>
		</div>

	</div>
</template>

<script>
	//導入Split
	import Split from 'components/Split/Split'
	//導入BSscroll
	import BScroll from 'better-scroll'

	export default{
		data(){
			return{
				seller: {}
			}
		},
		created(){
			var that = this;
			//通過axios發起get請求
    	this.$axios.get('/api/seller')
      .then(function (response) { //獲取到數據
        var dataSource = response.data;
        if(dataSource.code == 0){
          that.seller = dataSource.data;


          //初始化滾動
					that.$nextTick(()=>{
						if(that.seller.poi_env.thumbnails_url_list){
							let imgW = that.$refs.picsItem[0].clientWidth; //一張圖片的寬度
							let marginR = 11;
							let width = (imgW + marginR) * that.seller.poi_env.thumbnails_url_list.length;	//圖片寬度 * 圖片的個數

							that.$refs.picsList.style.width = width + 'px';	//獲取<ul>的寬度
							that.scroll = new BScroll(that.$refs.picsView, {	//外層盒子
								scrollX: true
							});
						}else {
							that.scroll.refresh();
						}
					});
        }
      })
      .catch(function (error) { //出錯處理
        console.log(error);
      });
		},
		components: {
			Split,
			BScroll
		}
	}
</script>

<style>
	@import url('Seller.css');
</style>