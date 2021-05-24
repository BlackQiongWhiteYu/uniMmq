<template>
	<view class="api-card">
		<!-- 顶部api名称 和 状态 -->
		<view class="top">
			<view class="top-cell">
				API名称
			</view>
			<u-picker 
			:default-selector="[0]" 
			:range="selector" 
			v-model="pickerShow"
			@confirm="pickSelect"
			mode="selector">
			</u-picker>
			<view class="top-btn" @click="pickerShow = true">
				选择
			</view>
		</view>
		
		<view class="api-data">
			<view class="">
				AccessKey:
			</view>
			<view class="api-key">
				asdsahdihskhfksavgklfdhsklgfsdhisodskahfioashfiosahfiohasdofihasiohfoafhalfohais
			</view>
		</view>
		
		<!-- 备注 -->
		<view class="remarks">
			<text class="remarks-title">备注:</text>
			<text class="">xxxx</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"ApiCard",
		props:{
			apiData: {
				type: Object,
			}
		},
		data() {
			return {
				pickerShow: false,
				selector: ["火币", "币安", "其他"],
			};
		},
		methods: {
			pickSelect(e) {
				// console.log(this.selector[e[0]])
				if(e[0] !== 0) {
					uni.showToast({
						title: `${this.selector[e[0]]}暂时无法使用`,
						icon:"none"
					})
				}else {
					uni.showToast({
						title: `你选择了${this.selector[e[0]]}`,
						icon:"none"
					})
				}
			}
		},
	}
</script>

<style lang="scss">
	.api-card {
		width: 690rpx;
		height: 420rpx;
		margin: 0 auto;
		background: #FFFFFF;
		box-shadow: 0px 0px 42rpx 0rpx rgba(0,0,0,0.08);
		border-radius: 26rpx;
		font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 130rpx;
			font-size: 35rpx;
			font-weight: 600;
			color: #333333;
			box-shadow: 0px 0px 42rpx 0rpx rgba(0,0,0,0.08);
			border-radius: 26rpx 26rpx 0rpx 0rpx;
			.top-cell {
				text-align: center;
				line-height: 130rpx;
				// width: 200rpx;
				margin-left: 40rpx;
			}
			.top-btn {
				width: 125rpx;
				height: 55rpx;
				margin-right: 40rpx;
				line-height: 55rpx;
				text-align: center;
				font-size: 27rpx;
				font-weight: 600;
				color: #FFFFFF;
				background-color: #0084F3;
				border-radius: 5rpx;
			}
		}
		
		// api信息
		.api-data {
			width: 610rpx;
			margin: 0 auto;
			padding: 5px;
			font-size: 27rpx;
			font-weight: 500;
			color: #333333;
			line-height: 46rpx;
			
			.api-key {
				width: 100%;
				word-break:break-all;
			}
		} 
		
		// 备注
		.remarks {
			height: 70rpx;
			width: 610rpx;
			margin: 0 auto;
			font-size: 27rpx;
			font-weight: 400;
			color: #8E8E8E;
			line-height: 35rpx;
			
			.remarks-title {
				margin-right: 10px;
			}
		}
	}
</style>