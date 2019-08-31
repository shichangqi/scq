<template>
  <div class="authlogin">
    <div class="content">
      <p class="title">一键授权登录</p>
      <p>使用你在微信授权的公开信息</p>
      <div class="loginbtn">
        <button v-if="canIUse" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
        <div v-else>请升级微信版本</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getopenid, coachdetail } from "../../api/api";
import { redirectTo } from "../../utils";
export default {
  data() {
    return {
      canIUse: wx.canIUse("button.open-type.getUserInfo")
    };
  },
  methods: {
    getUserInfo(e) {
      let userInfo = e.target ? e.target.userInfo : null;
      console.log(userInfo);
      if (!userInfo) {
        return wx.showToast({
          title: "为了更好的体验，请允许授权 ",
          icon: "none"
        });
      }
      wx.setStorageSync("avatar", userInfo.avatarUrl);
      // 点击了授权
      wx.showToast({ title: "授权成功", icon: "sucess" });
      wx.login({
        success(res) {
          wx.setStorageSync("code", res.code);
          getopenid({
            code: res.code
          }).then(res1 => {
            if (res1.data.code == 0) {
              wx.setStorageSync("openid", res1.data.data.openid);
              coachdetail({
                openid: res1.data.data.openid
              }).then(res2 => {
                if (res2.data.data.name) {
                  redirectTo("/pages/index/main");
                } else {
                  redirectTo("/pages/getPhone/main");
                }
              });
            } else {
              wx.showToast({
                title: `${res1.data.msg}`,
                icon: "none",
                mask: true
              });
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.authlogin {
  .content {
    margin: 99rpx 0 0 75rpx;
    p {
      color: #aca9a9;
      font-size: 28rpx;
    }
    .title {
      font-size: 50rpx;
      margin-bottom: 20rpx;
      color: #000;
    }
    .loginbtn {
      position: relative;
      width: 600rpx;
      color: #fff;
      height: 100rpx;
      text-align: center;
      line-height: 100rpx;
      margin-top: 99rpx;
      font-size: 36rpx;
      background: linear-gradient(90deg, #ea4e27, #fc9148);
      border-radius: 50rpx;
      button {
        color: #fff;
        background: linear-gradient(90deg, #ea4e27, #fc9148);
        border-radius: 50rpx;
      }
      &::after {
        content: "";
        position: absolute;
        z-index: -1;
        bottom: -10px;
        left: 0;
        right: 0;
        margin: auto;
        height: 105%;
        width: 85%;
        opacity: 0.4;
        border-radius: 50rpx;
        background: inherit;
        -webkit-filter: blur(6px);
        -moz-filter: blur(6px);
        -o-filter: blur(6px);
        -ms-filter: blur(6px);
        filter: blur(6px);
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
      }
    }
  }
}
</style>