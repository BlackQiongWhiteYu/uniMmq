<template>
	<view class="card-wrap" :class="{different:bcColor}">
		<view class="class-text" :class="{color:bcColor}">
			{{title}}
		</view>
		<view class="data-text" :class="{color:bcColor}">
			{{data}}
		</view>
		<!-- <image class="image"  v-if="bcColor" src="../../../static/Home/card_bcimg.png" mode=""></image> -->
	</view>
</template>

<script>
	export default {
		props: {
			bcColor: {
				type: Boolean,
				default: false,
			},
			title: {
				type: String,
			},
			data: {
				type: String,
			}
		}
	}
</script>


<style lang="scss" scoped>
	.different {
		// background: linear-gradient(156deg, #F7F3EC 0%, #EFE7DB 39%, #EADDC8 100%);
		// background-image: url(../../../static/Home/card_bcimg.png) ;
		// background-size: cover;
		// background-repeat:no-repeat;
		
	}
	.color {
		color: #7F4826 !important;
	}
	.card-wrap {
		// height: 115px;
		// width: 360px;
		width: 680rpx;
		height: 220rpx;
		margin: 0 auto;
		margin-top: 20px;
		padding: 20px;
		border-radius: 26rpx;
		// box-shadow: 0px 0px 22px 0px rgba(0, 0, 0, 0.08);
		box-shadow: 0px 0px 42rpx 0px rgba(0,0,0,0.08);
		font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		color: #7F4826;
		position: relative;
		// .image {
		// 	position: absolute;
		// 	top: 0;
		// 	left: 0;
		// 	width: 680rpx;
		// 	height: 220rpx;
		// }
		.class-text {
			color: #8E8E8E;
			font-size: 27rpx;
			font-weight: 600;	
		}
		
		.data-text {
			color: #333333;
			font-size: 69rpx;
			font-weight: 600;
		}
	}
</style>
