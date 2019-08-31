<template>
  <div class="withdrawal">
    <p class="p1" v-if="status == 0" @click="bindaccount">提现至支付宝账号：未绑定 ></p>
    <p class="p1" v-else>提现至支付宝账号：*德华 （131****1234）</p>
    <p class="p2">¥{{amount}}</p>
    <p class="p3">可提现余额</p>
    <div class="loginbtn" @click="widthdraw">{{status == 2?'提现中...':'提现'}}</div>
    <div class="tips" v-if="status == 2">
      <p>您当前有笔提现正在进行，暂时无法提现</p>
      <p>提现将在3个工作日内完成</p>
    </div>
    <div class="bottom">
      <p>1元起提，每日限提1次</p>
      <p>提现将在每个工作日的当日打款</p>
    </div>
  </div>
</template>

<script>
import { coachAccount, coachWithdraw } from "../../api/api";
import { navigate } from '../../utils';
export default {
  data() {
    return {
      status: 0,
      amount:0
    };
  },
  onLoad() {
    this.getaccount();
  },
  methods: {
    bindaccount(){
      navigate('/pages/bindAccount/main')
    },
    widthdraw(){
      if(this.status != 1){
        return;
      }
      coachWithdraw({
        openid: wx.getStorageSync("openid")
      }).then(res=>{
        console.log(res);
        if(res.data.code == 0){
          if(res.data.data == true){
            wx.showToast({
            title: '提现成功',
            icon: "none",
            mask: true
          });
          }
        }else{
          wx.showToast({
            title: `${res.data.msg}`,
            icon: "none",
            mask: true
          });
        }
      });
    },
    getaccount() {
      coachAccount({
        openid: wx.getStorageSync("openid")
      }).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.amount = res.data.data.amount;
          // this.status = res.data.data.status;
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
.withdrawal {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30rpx;
  color: #7e7e7e;
  padding-top: 100rpx;
  .p2 {
    color: #000;
    font-size: 70rpx;
    margin: 109rpx 0 24rpx 0;
  }
  .p3 {
    margin-bottom: 103rpx;
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
    margin-top: 50rpx;
    text-align: center;
  }
  .bottom {
    position: absolute;
    bottom: 30rpx;
    text-align: center;
  }
}
</style>
