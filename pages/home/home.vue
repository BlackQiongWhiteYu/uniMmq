<template>
	<view class="home-page">
		<!-- 顶部图片标题 -->
		<view class="top-img">
			<!-- <u-image width="100%" height="100%" src="@static/Home/top.png" mode=""></u-image> -->
			<!-- <u-image width="100%" height="100%" :src="src" mode=""></u-image> -->
			<u-swiper height="350" name="picUrl" mode="none" :list="swiperList"></u-swiper>
			<view class="top-text" @click="goLogin">
				<view>GO</view>
				<view>注册</view>
			</view>
		</view>
		
		<view class="roll-wrap">
			<view class="title">
				头条
			</view>
			<!-- 滚动条 -->
			<u-notice-bar
			 class="scroll-bar"
			 mode="horizontal" 
			 :list="list" 
			 type="none" 
			 :volume-icon="false" >
			</u-notice-bar>
		</view>
		
		<Card 
			v-for="(item,index) in cardData" 
			:bcColor="item.bcColor"
			:title="item.title"
			:data="item.data"
			:key="index"/>
		
	</view>
</template>

<script>
	import Card from "./components/Card.vue"
	import { homeInfo } from "../../utils/api.js"
	export default {
		components: {
			Card,
		},
		data() {
			return {
				homeInfo:{},
				// 首页顶部图片
				src:"",
				swiperList:[],
				// 滚动条内容
				list: [],
				cardData: [
					{
						bcColor: true,
						title: "用户总收益",
						data: "10000000usdt"
					},{
						bcColor: false,
						title: "7天年化收益率",
						data: "7000%"
					},{
						bcColor: false,
						title: "今日用户总收益率",
						data: "1800000usdt"
					}
				]
			}
		},
		methods: {
			// 点击跳转登录
			goLogin() {
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
		},
		created() {
			homeInfo().then(res => {
				console.log(res.data)
				this.src = res.data.banners[0].picUrl
				this.swiperList = res.data.banners
				console.log(this.swiperList)
				this.cardData[0].data = res.data.totalProfit + "usdt"
				this.cardData[1].data = res.data.svnDayYearRate +"%"
				this.cardData[2].data = res.data.dailyProfit + "usdt"
				
				for(let item of res.data.newsList) {
					this.list.push(item.title)
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.home-page {
		font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
		// 顶部区域
		.top-img {
			width: 750rpx;
			height: 350rpx;
			position: relative;
			
			.top-text {
				width: 190rpx;
				height: 266rpx;
				line-height: 133rpx;
				text-align: center;
				color: #fff;
				font-size: 90rpx;
				font-weight: 600;
				position: absolute;
				top: 50%;
				right: 10px;
				margin-top: -70px;
			}
		}
		
		// 滚动条区域
		.roll-wrap {
			width: 100%;
			height: 50px;
			background: #F5F5F5;
			display: flex;
			justify-content: space-between;
			.title {
				height: 50px;
				width: 72px;
				text-align: center;
				line-height: 50px;
				font-weight: 500;
				font-family: AlibabaPuHuiTi-Medium, AlibabaPuHuiTi;
				color: #333;
				font-size: 18px;
				background-image: url(../../static/Home/1.png);
			}
			.scroll-bar {
				width: calc(750rpx - 72px);
				height: 50px;
				line-height: 50px;
			}
		}
	}
	
	// 滚动条
	/deep/ .u-notice-bar {
		padding:  0 !important;
	}
</style>
