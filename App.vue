<script>
	import Vue from 'vue'
  import request from "@/utils/request.js";
 

	export default {
		created() {
			// #ifdef APP-PLUS
			plus.navigator.closeSplashscreen(); 
			// #endif 
		},
		onLaunch: function() {

			uni.getSystemInfo({
				success: function(e) {
					
          Vue.prototype.$http = request;
					// #ifndef MP
					// 获取设备状态栏高度
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
		
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
		
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
					
					// // #ifdef APP-PLUS
					// Vue.prototype.StatusBar = e.statusBarHeight + 100;
					// Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// // #endif
				}
			})
		},
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	body{
		// 应用距离 设备状态栏
		padding-top: var(--status-bar-height);
		background: #FFFFFF !important;
	}
	
</style>
