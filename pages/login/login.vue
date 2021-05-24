<template>
  <view class="login">
    <view class="content">
      <!-- 头部logo -->
      <TitleIcon />
      <!-- 主体表单 -->
      <view class="main">
        <wInput
          v-model="account"
          type="text"
          maxlength="11"
          placeholder="用户名/电话"
          :focus="isFocus"
        ></wInput>
        <wInput
          v-model="password"
          type="password"
          maxlength="11"
          placeholder="密码"
        ></wInput>
      </view>
      <wButton
        class="wbutton"
        text="登 录"
				bgColor="#0084F3"
        :rotate="isRotate"
        @click="startLogin"
      ></wButton>

      <!-- 底部信息 -->
      <view class="footer">
        <!-- <navigator url="forget" open-type="navigate">找回密码</navigator>
        <text>|</text> -->
        <text class="goLink" @click="goRegister">注册账号</text>
      </view>
    </view>
  </view>
</template>

<script>
let _this;
import wInput from "../../components/watch-login/watch-input.vue"; //input
import wButton from "../../components/watch-login/watch-button.vue"; //button
import Logo from '../../static/logo.png'
import { login } from "@/utils/api.js"

export default {
  data() {
    return {
      //logo图片 base64
      logoImage: Logo,
      account: "", //用户/电话
      password: "", //密码
      isRotate: false, //是否加载旋转
      isFocus: true, // 是否聚焦
    };
  },
  components: {
    wInput,
    wButton,
  },
  mounted() {
    this.isLogin();
  },
  methods: {
    isLogin() {
      //判断缓存中是否登录过，直接登录
      try {
        const value = uni.getStorageSync("userData");
        if (value?.accessToken) {
          //有登录信息
          uni.showLoading({
            title: "已登录用户, 重新链接",
          });
          setTimeout(()=> {
            uni.hideLoading();
            uni.switchTab({
              url: "../api_config/index",
            });
          }, 1000)
        }
      } catch (e) {
        // error
      }
    },
	// 跳转注册页面
    goRegister () {
      uni.navigateTo({
      	url: "./register",
      });
    },
    //登录
    startLogin(e) {
      //登录
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (this.account === "") {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "用户名不能为空",
        });
        return;
      }
      if (this.password.length < 5) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "密码不正确",
        });
        return;
      }
      uni.showLoading({
        title: "登录中",
      });
      try {
		  (async () =>{
		  	const res = await login({
				passwd: this.password,
				userName: this.account
			})
		  	if(res.code === 0){
				uni.showToast({
				  icon: "success",
				  position: "bottom",
				  title: "登录成功",
				  duration: 1000,
				})
				uni.hideLoading();
				let userdata = {
				  accessToken: res?.data?.token,
				}
				uni.setStorageSync("userData", userdata); //存入缓存
				// uni.navigateBack({
				//     delta: 1
				// });
				uni.switchTab({
				    url: '/pages/home/home'
				});
			}else{
				uni.showToast({
				  position: "bottom",
				  title: "登录异常",
				  duration: 1000,
				})
			}
		  })()
		  
      } catch (e) {
        switch (res.code) {
          case 3:
            uni.showToast({
              title: "用户名不存在",
              icon: "none",
              duration: 1000,
            });
            break;
          case 4:
            uni.showToast({
              title: "密码错误",
              icon: "none",
              duration: 1000,
            });
            break;
        }
        uni.hideLoading();
      }
    },
    // login_weixin() {
    // 	//微信登录
    // 	uni.showToast({
    // 		icon: 'none',
    // 		position: 'bottom',
    // 		title: '...'
    // 	});
    // },
    // login_weibo() {
    // 	//微博登录
    // 	uni.showToast({
    // 		icon: 'none',
    // 		position: 'bottom',
    // 		title: '...'
    // 	});
    // },
    // login_github() {
    // 	//github登录
    // 	uni.showToast({
    // 		icon: 'none',
    // 		position: 'bottom',
    // 		title: '...'
    // 	});
    // }
  },
};
</script>

<style>
@import url("../../components/watch-login/css/icon.css");
@import url("./css/main.css");
</style>
