<template>
  <view class="register">
    <view class="content">
      <!-- 头部logo -->
      <view class="header">
        <image :src="logoImage"></image>
      </view>
      <!-- 主体 -->
      <view class="main">
        <text class="goLink" @click="goLogin">已有账号，去登录</text>
        <wInput
          v-model="account"
          type="text"
          maxlength="11"
          placeholder="账号"
        ></wInput>
        <wInput
          v-model="password"
          type="password"
          maxlength="11"
          placeholder="登录密码"
          isShowPass
        ></wInput>
        <!-- <wInput v-model="verCode" type="number" maxlength="4" placeholder="验证码" isShowCode ref="runCode"
          @setCode="getVerCode()"></wInput> -->
      </view>

      <wButton
        class="wbutton"
        text="注 册"
        :rotate="isRotate"
        @click.native="startReg()"
      ></wButton>

      <!-- 底部信息 -->
      <view class="footer">
        <text
          @tap="isShowAgree"
          class="cuIcon"
          :class="showAgree ? 'cuIcon-radiobox' : 'cuIcon-round'"
        >
          同意</text
        >
        <!-- 协议地址 -->
        <text url="" open-type="navigate">《协议》</text>
      </view>
    </view>
  </view>
</template>

<script>
let _this;
import wInput from "../../components/watch-login/watch-input.vue"; //input
import wButton from "../../components/watch-login/watch-button.vue"; //button
import Logo from '../../static/logo.png'

import { reg } from "@/utils/api.js"
export default {
  data() {
    return {
      //logo图片 base64
      logoImage: Logo,
      account: "", // 用户/电话
      password: "", //密码
      verCode: "", //验证码
      showAgree: true, //协议是否选择
      isRotate: false, //是否加载旋转
    };
  },
  components: {
    wInput,
    wButton,
  },
  updated() {
    this.isStart()
  },
  mounted() {
    this.isStart()
    _this = this;
  },
  methods: {
    goLogin() {
      uni.navigateTo({
        url: "../../pages/login/login",
      });
    },
    isStart() {
      // 判断缓存中是否有登录信息
      try {
        const value = uni.getStorageSync("userData");
        if (value?.accessToken) {
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
    isShowAgree() {
      //是否选择协议
      _this.showAgree = !_this.showAgree;
    },
    getVerCode() {
      //获取验证码
      if (_this.account.length != 11) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "手机号不正确",
        });
        return false;
      }
      console.log("获取验证码");
      this.$refs.runCode.$emit("runCode"); //触发倒计时（一般用于请求成功验证码后调用）
      uni.showToast({
        icon: "none",
        position: "bottom",
        title: "模拟倒计时触发",
      });

      setTimeout(function () {
        _this.$refs.runCode.$emit("runCode", 0); //假装模拟下需要 终止倒计时
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "模拟倒计时终止",
        });
      }, 3000);
    },
    //注册
    async startReg() {
      //注册
	  
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (this.showAgree == false) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "请先同意《协议》",
        });
        return false;
      }
      if (this.account.length === 0) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "请输入账号",
        });
        return false;
      }
      if (this.password.length < 6) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "密码不正确",
        });
        return false;
      }
      _this.isRotate = true;
      try {
		const res =  await reg({
			passwd: this.password,
			userName: this.account
		})
		setTimeout(() => {
		  _this.isRotate = false;
		}, 1000)
          switch (res.code) {
            case 0:
              uni.showToast({
                title: '注册成功',
                duration: 1000
              });
              //保存用户信息和accessToken
              let userdata = {
                accessToken: res?.data?.token,
              } 
              //存入缓存
              uni.setStorageSync("userData", userdata); 
              setTimeout(() => {
                uni.switchTab({
                  url: "../api_config/index",
                })
              }, 100)
              
              break;
            case 1:
              uni.showToast({
                title: '用户名已注册',
                icon: "none",
                duration: 1000
              });
              break
          }
        // })
        
      } catch (err) {
        uni.showToast({
          title: '注册失败',
          icon: "none",
          duration: 1000
        })
        setTimeout(() => {
          _this.isRotate = false;
        }, 1000);
      }
    },
  },
};
</script>

<style>
@import url("../../components/watch-login/css/icon.css");
@import url("./css/main.css");
</style>
