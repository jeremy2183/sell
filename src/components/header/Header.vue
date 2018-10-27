<template>
	<div class="header">
		{{poiInfo.name}}
	</div>
</template>

<script>
	export default{
		props: {
			poiInfo: {	//自定義屬性
				type: Object,
				default: {}
			}
		}
	}
</script>

<style>

</style>