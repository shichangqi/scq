<template>
  <div class="activationDevice">
    <div class="container">
      <div class="header">
        <div class="panel panel1">
          <span>头像</span>
          <span class="right">
            <img src="http://via.placeholder.com/100x100/#ccc" alt class="head" />
            <img class="arrow" src="/static/images/arrow_right.png" alt />
          </span>
        </div>
      </div>
      <div class="content2">
        <div class="panel">
          <span>手机号</span>
          <span class="right phone">13112345678</span>
        </div>
        <div class="panel">
         <span>姓名</span>
          <span class="right">真实姓名，与身份证一致</span>
        </div>
      </div>
      <div class="content2">
        <div class="panel">
          <span>所在驾校</span>
          <span class="right"><span>选择您的驾校</span> <img class="arrow" src="/static/images/arrow_right.png" alt /></span>
        </div>
        <div class="panel">
         <span>所在考场</span>
          <span class="right"><span>平时训练、考试的考场</span> <img class="arrow" src="/static/images/arrow_right.png" alt /></span>
        </div>
      </div>
      <div class="content2">
        <div class="panel panel1" @click="goauth">
          <span>认证信息</span>
          <span class="right"><span>未认证</span> <img class="arrow" src="/static/images/arrow_right.png" alt /></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { navigate } from '../../utils';
export default {
  data(){
    return{

    }
  },
  methods:{
    goauth(){
      navigate('/pages/uncertified/main')
    }
  }
};
</script>
<style lang="less" scoped>
.activationDevice {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ededed;
  .container {
    padding-top: 20rpx;
    .panel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      background: #fff;
      font-size: 34rpx;
      border-bottom: 1rpx solid #d9d9d9;
      .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 483rpx;
        text-align: left;
        font-size: 30rpx;
        color: #7E7E7E;
        .arrow {
          width: 14rpx;
          height: 26rpx;
        }
        .head {
          width: 70rpx;
          height: 70rpx;
          border-radius: 50%;
        }
        .phone{
          color: #000;
        }
      }
      &:last-child {
        border: 0;
      }
    }
    .panel1{
      padding: 25rpx 30rpx;
    }
    .content2 {
      margin-top: 20rpx;
    }
  }
  
}
</style>