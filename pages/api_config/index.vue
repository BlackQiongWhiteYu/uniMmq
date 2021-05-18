<template>
  <view>
    <view class="content">
      <!-- 头部logo -->
      <view class="header">
        <image :src="logoImage"></image>
      </view>
      <!-- 主体 -->
      <view class="main">
        <!-- <wButton
          class="wbutton"
          text="一键启动"
          :rotate="isRotate"
          @click.native="startApi()"
        ></wButton> -->
        <navigator style="color: red, float: 'right'" url="addApi" open-type="navigate">添加API</navigator>
      </view>
      <wButton
        v-if="!apiStatus"
        class="wbutton"
        text="一键启动"
        :rotate="isStartRotate"
        @click.native="startApi()"
      ></wButton>
      <wButton
        v-else
        class="wbutton"
        text="一键停止"
        :rotate="isStopRotate"
        @click.native="stopApi()"
      ></wButton>
    </view>
  </view>
</template>

<script>
import wInput from "../../components/watch-login/watch-input.vue"; //input
import wButton from "../../components/watch-login/watch-button.vue"; //button
import Logo from "../../static/logo.png";
export default {
  data() {
    return {
      logoImage: Logo,
      apiStatus: false,
      isStopRotate: false,
      isStartRotate: false,
    };
  },
  mounted() {
    this.isStart();
  },
  methods: {
    isStart() {
      // 判断缓存中是否有信息
      try {
        const value = uni.getStorageSync("userData");
        if (!value?.accessToken) {
          uni.reLaunch({
            url: "../../pages/login/login",
          });
          return
        }
        this.apiStatus = uni.getStorageSync("apiStatus");
      } catch (e) {
        // error
      }
    },
    // 启动Api量化
    startApi() {
      if (this.isStartRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      this.isStartRotate = true
      uni.showLoading({
        title: "启动中",
      });
      try {
        this.$http.post("/robot/start")
          .then((res) => {
            switch (res.code) {
              case 0:
                uni.showToast({
                  icon: "success",
                  position: "bottom",
                  title: "启动成功",
                  duration: 1000,
                })
                this.apiStatus = true
                uni.setStorageSync("apiStatus", this.apiStatus); //存入缓存
                break
              case 7:
                uni.showToast({
                  icon: "none",
                  position: "bottom",
                  title: res.msg,
                  duration: 2000,
                })
                break
            }
          })
          uni.hideLoading();
      } catch (e) {
        uni.showToast({
          title: "启动失败，请稍后再试",
          icon: "none",
          duration: 1000,
        });
        uni.hideLoading();
      }
      this.isStartRotate = false
    },
    // 停止Api量化
    stopApi() {
      if (this.isStopRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      this.isStopRotate = true
      uni.showLoading({
        title: "停止量化中...",
      });
      try {
        this.$http.post("/robot/stop")
          .then((res) => {
            switch (res.code) {
              case 0:
              case 8:
                uni.showToast({
                  icon: "success",
                  position: "bottom",
                  title: "停止成功",
                  duration: 1000,
                })
                this.apiStatus = false
                uni.setStorageSync("apiStatus", this.apiStatus); //存入缓存
                break
            }
          })
          uni.hideLoading();
      } catch (e) {
        uni.showToast({
          title: "停止失败，请稍后再试",
          icon: "none",
          duration: 1000,
        });
        uni.hideLoading();
      }
      this.isStopRotate = false
    },
  },
  components: {
    wInput,
    wButton,
  },
};
</script>

<style>
@import url("../../components/watch-login/css/icon.css");
@import url("./css/index.css");
</style>
