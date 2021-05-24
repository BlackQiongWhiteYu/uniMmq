<template>
	<view class="header">
	  <image :src="logoImage"></image>
		<view class="header-title">搬山量子</view>
	</view>
</template>

<script>
	import Logo from "../../static/new_logo.png";
	export default {
		name:"TitleIcon",
		data() {
			return {
				logoImage: Logo,
			};
		}
	}
</script>

<style lang="scss">
.header {
  width: 256rpx;
  height: 256rpx;
	/* box-shadow:0rpx 0rpx 60rpx 0rpx rgba(0,0,0,0.1);
	border-radius:50%; */
	margin-top: 128rpx;
	margin-bottom: 72rpx;
	margin-left: auto;
	margin-right: auto;
}
.header image{
	/* width:384rpx;
	height:216rpx; */
	width: 220rpx;
	height: 150rpx;
  margin-left: 0rpx;
  margin-top: 20rpx;
	/* border-radius:50%; */
}
.header .header-title {
	width: 230rpx;
	height: 50rpx;
	padding: 5px;
	margin-top: 10px;
	text-align: center;
	font-size: 38rpx;
	font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
	font-weight: 700;
	color: #313131;
}
</style>
