<template>
  <div class="authlogin">
    <div class="content">
      <p class="title">一键授权登录</p>
      <p>使用你在微信授权的公开信息</p>
      <div class="loginbtn">绑定手机号</div>
    </div>
  </div>
</template>
<script>
export default {};
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
      background: linear-gradient(
        90deg,
        #EA4E27,
        #FC9148
      );
      border-radius: 50rpx;
      &::after {
        content: "";
        position: absolute;
        z-index: -1;
        bottom: -10px;
        left: 0;
        right:0;
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