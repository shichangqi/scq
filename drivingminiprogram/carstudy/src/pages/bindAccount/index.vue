<template>
  <div class="bindaccount">
    <div class="container">
      <div class="bind">
        <div class="panel">
          <span>支付宝姓名</span>
          <input
            type="text"
            placeholder="账号姓名"
            placeholder-style="color:#7E7E7E;font-size:17px"
            v-model="name"
          />
        </div>
        <div class="panel">
          <span>支付宝账号</span>
          <input
            type="text"
            placeholder="手机号或邮箱"
            placeholder-style="color:#7E7E7E;font-size:17px"
            v-model="account"
          />
        </div>
      </div>
      <div class="loginbtn" @click="bindaccount">保存</div>
      <div class="tips">保存后无法修改，请仔细填写。</div>
    </div>
  </div>
</template>

<script>
import { coachBindAccount } from "../../api/api";
import { goBack } from '../../utils';
export default {
  data() {
    return {
      name: "",
      account: ""
    };
  },

  methods: {
    bindaccount() {
      coachBindAccount({
        openid: wx.getStorageSync("openid"),
        zfb_name: this.name,
        zfb_account: this.account
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          if (res.data.data == true) {
            wx.showToast({
              title: "绑定成功",
              icon: "none",
              mask: true
            });
            setTimeout(()=>{
              goBack();
            },1500)
          }
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

<style scoped lang="less">
.bindaccount {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -2;
  height: 100%;
  background: #ededed;
  .container {
    padding-top: 19rpx;
    .panel {
      display: flex;
      align-items: center;
      padding: 29rpx;
      font-size: 34rpx;
      background: #fff;
      border-bottom: 1rpx solid #d9d9d9;
      &:last-child {
        border: 0;
      }
      input {
        flex: 1;
        margin-left: 53rpx;
      }
    }
    .loginbtn {
      position: relative;
      width: 600rpx;
      color: #fff;
      height: 100rpx;
      text-align: center;
      line-height: 100rpx;
      font-size: 36rpx;
      background: linear-gradient(90deg, #ea4e27, #fc9148);
      border-radius: 50rpx;
      margin: 53rpx auto 0 auto;
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
    .tips {
      font-size: 30rpx;
      color: #ed4a27;
      margin-top: 49rpx;
      text-align: center;
    }
  }
}
</style>
