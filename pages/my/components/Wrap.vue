<template>
	<view class="wrap">
		<text>{{title}}</text>
		<slot>
			<text>{{data}}</text>
		</slot>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
			},
			data: {
				type: String,
			},
		},
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 680rpx;
		height: 135rpx;
		padding: 0 20px;
		border-radius: 26rpx;
		margin: 0 auto;
		box-shadow: 0px 0px 42px 0px rgba(0,0,0,0.08);
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		background-color: #fff;
		font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
		
		text {
			&:first-child {
				font-size: 35rpx;
				font-weight: 400;
				color: #8E8E8E;
			}
			&:last-child {
				font-size: 38rpx;
				font-weight: 600;
				color: #333333;
			}
		}
	}
</style>
