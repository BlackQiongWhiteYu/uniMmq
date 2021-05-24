<template>
	<view class="api-list-page">
		
		<TitleImg>
			<view class="api-title">
				<u-image @click="toBack" src="@static/api/arrow_left.png" :width="50" :height="50"></u-image>
				<text class="text">API列表</text>
			</view>
		</TitleImg>
		<!-- api显示列表 -->
		<view class="api-list">
			<ApiCard class="api-card" v-for="(item,index) in 3" :key="index" />
		</view>
		
		
		<!-- 加载更多 -->
		<u-loadmore style="margin: 20px 0px;" status="nomore" />
	</view>
</template>

<script>
	import ApiCard from "./components/ApiCard.vue"
	import { apiList } from "../../../utils/api.js"
	export default {
		components: {
			ApiCard,
		},
		data() {
			return {
				
			}
		},
		methods: {
			toBack() {
				uni.navigateBack({
				    delta: 1
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.api-list-page {
	
	.api-title {
		padding: 100rpx;
		padding-left: 40rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.text {
			font-size: 54rpx;
			font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
			font-weight: 500;
			color: #7F4826;
			line-height: 69rpx;
			margin-left: 40rpx;
		}
	}
	
	.api-list {
		margin-top: -230rpx;
		.api-card {
			margin-bottom: 40rpx;
		}
	}
}
</style>
