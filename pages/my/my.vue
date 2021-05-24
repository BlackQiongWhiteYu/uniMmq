<template>
	<view class="user-page">
		<!-- 用户资料 -->
		<TitleImg class="user-data">
			<view class="assets-title">资产</view>
			<view class="user-assets">
				1000000usdt
			</view>
			<view class="user-account">
				<text>账号:</text>
				<text class="account">12312313143</text>
			</view>
		</TitleImg>
		
		<!-- 用户收益详细 -->
		<view class="income-wrap">
			<Wrap v-for="(item,index) in data" :title="item.title" :data="item.data" :key="index"/>
		</view>
		
		<!-- 交易记录 -->
		<view class="record-text">我的交易记录</view>
		<Wrap title="交易记录" >
			<u-image src="@static/my/arrow_right.png" :width="50" :height="50"></u-image>
		</Wrap>
		
		<!-- 退出登录 -->
		<!-- <u-button size="medium">退出登录</u-button> -->

	</view>
</template>

<script>
	import Wrap from "./components/Wrap.vue"
	export default {
		components: {
			Wrap,
		},
		data() {
			return {
				data: [
					{
						title: "今日收益",
						data: "100.00usdt",
					},{
						title: "今日收益率",
						data: "7000%",
					},{
						title: "累计收益",
						data: "100.00usdt",
					},{
						title: "累计收益lv",
						data: "1000.09%",
					}
				]
			}
		},
		beforeCreate() {
			// 路由守卫，未登录跳转登录页面
			this.routerDefend()
		},
	}
</script>

<style lang="scss" scoped>

.user-page {
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
	// 用户资料
	.user-data {
		padding: 40rpx;
		// background-color: rgb(238, 229, 215);
		color: #7F4826;
		position: relative;
		
		.image {
			width: 500rpx;
			height: 400rpx;
			right: 0;
			bottom: 0;
			
			position: absolute;
		}
		.assets-title {
			margin-top: 20rpx;
			font-size: 27rpx;
			font-weight: 600;
		}
		.user-assets {
			margin-top: 20rpx;
			font-size: 77rpx;
			font-weight: 600;
		}
		.user-account {
			
			margin-top: 100rpx;
			font-size: 35rpx;
			font-weight: 600;
			
			.account {
				margin-left: 10px;
			}
		}
	}
	
	// 我的交易记录文字
	.record-text {
		width: 680rpx;
		margin: 0 auto;
		font-size: 35rpx;
		font-weight: 600;
		color: #333333;
		line-height: 69px;
	}
	.income-wrap {
		z-index: 100;
		margin-top: -67.5rpx;
	}
	
	
}
</style>
