<template>
  <div class="authlogin">
    <div class="content">
      <p class="title">一键授权登录</p>
      <p>使用你在微信授权的公开信息</p>
      <div class="loginbtn">
        <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">绑定手机号</button>
      </div>
    </div>
  </div>
</template>
<script>
import { getphone } from "../../api/api";
import { redirectTo } from '../../utils';
export default {
  data() {
    return {
      phone: ""
    };
  },
  methods: {
    getPhoneNumber(e) {
      if (e.mp.detail.errMsg == "getPhoneNumber:fail user deny") {
        wx.showToast({ title: "您取消了授权", icon: "none", mask: true });
        return;
      }
      let _this = this;
      let iv = e.mp.detail.iv;
      let encrypted = e.mp.detail.encryptedData;
      getphone({
        iv: iv,
        openid: wx.getStorageSync("openid"),
        encryptedData: encrypted
      }).then(res => {
        if (res.data.code == 0) {
          wx.setStorageSync("phone", res.data.data.phone);
          redirectTo('/pages/personalInfomation/main')
        } else {
          wx.showToast({
            title: `${res.data.msg}`,
            icon: "none",
            mask: true
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