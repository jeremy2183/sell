<template>
	<div class="ratings">
		<div class="ratings-wrapper">
			<div class="overview">
				<div class="overview-left">
					<div class="comment-score">
						<p class="score">{{ratings.comment_score}}</p>
						<p class="text">商家評分</p>
					</div>
					<div class="other-score">
						<div class="quality-score item">
							<span class="text">口味</span>
							<Star :score="ratings.quality_score" class="star"></Star>
							<span class="score">{{ratings.quality_score}}</span>
						</div>
						<div class="pack-socre item">
							<span class="text">包裝</span>
							<Star :score="ratings.pack_score" class="star"></Star>
							<span class="score">{{ratings.pack_score}}</span>
						</div>
					</div>
				</div>
				<div class="overview-right">
					<div class="delivery-score">
						<p class="score">{{ratings.delivery_score}}</p>
						<p class="text">配送評分</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//導入Star組件
	import Star from 'components/Star/Star'
	export default{
		data(){
			return{
				ratings: {},
			}
		},
		created(){
			var that = this;
			//通過axios發起get請求
    	this.$axios.get('/api/ratings')
      .then(function (response) { //獲取到數據
        var dataSource = response.data;
        if(dataSource.code == 0){
          that.ratings = dataSource.data;
        }
      })
      .catch(function (error) { //出錯處理
        console.log(error);
      });
		},
		components: {
			Star
		}
	}
</script>

<style>
	@import url(Ratings.css);
	.ratings{
		/*text-align: center;*/
	}
</style>