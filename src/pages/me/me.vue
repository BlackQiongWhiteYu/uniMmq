<!--
 * @Author: your name
 * @Date: 2021-04-14 21:14:53
 * @LastEditTime: 2021-04-15 08:11:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \uniMmq\src\pages\me\me.vue
-->

<template>
  <view class="content">
    欢迎, {{ userData.userName }} <a href="#" @click="logout()">注销</a>
  </view>
</template>

<script>
import CustomRequest from "@/utils/CustomRequest";

export default {
  data() {
    return {
      userData: null,
    };
  },
  created() {
    try {
      this.userData = uni.getStorageSync("setUserData");
      console.log(this.userData);
    } catch (e) {
      console.log(e);
    }
  },
  onLoad() {},
  methods: {
    logout() {
      let header = {
        token: this.userData.token,
      };
      CustomRequest("/api/user/logout", header).then((res) => {
        // 注销成功
        if (res[1].data.code == 0) {
          try {
            uni.removeStorageSync("setUserData");
          } catch (e) {
            console.log(e);
          }
          uni.showToast({
            icon: "success",
            position: "bottom",
            title: "注销成功",
          });
          uni.redirectTo({
            url: "../../pages/login/login",
          });
        } else {
          uni.showToast({
            icon: "error",
            position: "bottom",
            title: "注销失败",
          });
        }
      });
    },
  },
};
</script>

<style>
.content {
  text-align: center;
  height: 400upx;
  margin-top: 200upx;
}
</style>
