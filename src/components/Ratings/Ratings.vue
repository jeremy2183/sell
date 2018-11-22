<template>
	<div class="ratings">
		<div class="ratings-wrapper">
			<div class="overview">
				<div class="overview-left">{{ratings.quality_score}}</div>
				<div class="overview-right"></div>
			</div>
		</div>
	</div>
</template>

<script>
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
		}
	}
</script>

<style>
	@import url(Ratings.css);
	.ratings{
		/*text-align: center;*/
	}
</style>