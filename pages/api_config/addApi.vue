<template>
  <view>
    <view class="content">
      <!-- 头部logo -->
      <view class="header">
        <image :src="logoImage"></image>
      </view>
      <!-- 主体 -->
      <view class="main">
        <wInput
          class="mmq-input"
          v-model="desc"
          type="text"
          maxlength="15"
          placeholder="api名称"
        />
        <wInput 
          v-model="apiKey"
          maxlength="200" 
          placeholder="apiKey"></wInput>
        <wInput 
          v-model="secret" 
          maxlength="200" 
          placeholder="secret"></wInput>
        <!-- <wInput
          @input="select"
          v-model="secret"
          placeholder="secret"
        ></wInput> -->
      </view>
      <wButton
        class="wbutton"
        text="添 加"
        :rotate="isRotate"
        @click.native="addApi()"
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
      desc: "",
      apiKey: "",
      isRotate: false, //是否加载旋转
      secret: "",
      exchangeType: 1,
    };
  },
  mounted() {
    this.isStart()
  },
  methods: {
    isStart() {
      // 判断缓存中是否有登录信息
      try {
        const value = uni.getStorageSync("userData");
        if (!value?.accessToken) {
          uni.navigateTo({
            url: "../../pages/login/login",
          });
        }
      } catch (e) {
        // error
      }
    },
    //添加Api
    addApi() {
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (this.desc === "") {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "api名称不能为空",
        });
        return;
      }
      if (this.apiKey === "") {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "apiKey不能为空",
        });
        return;
      }
      if (this.secret === "") {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "secret不能为空",
        });
        return;
      }
      uni.showLoading({
        title: "提交中",
      });
      try {
        this.$http.post("/account/addApiKey", {
            desc: this.desc,
            accessKey: this.apiKey,
            secret: this.secret,
            exchangeType: this.exchangeType,
          })
          .then((res) => {
            uni.showToast({
              icon: "success",
              position: "bottom",
              title: "添加成功",
              duration: 1000,
            });
            uni.reLaunch({
              url: "../../pages/api_config/index",
            });
          });
        uni.hideLoading();
      } catch (e) {
        uni.showToast({
          title: "用户名不存在",
          icon: "none",
          duration: 1000,
        });
        uni.hideLoading();
      }
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
