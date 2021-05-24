<template>
	<view class="title-img">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:"TitleImg",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

.title-img {
	width: 750rpx;
	height: 460rpx;
	background-image: url(../../static/title_img.png);
}
</style>
