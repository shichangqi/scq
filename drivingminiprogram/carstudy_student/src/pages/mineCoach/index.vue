<template>
  <div class="minecoach">
    <div class="container">
      <div class="content">
        <p>
          <span class="s1">我的教练</span>
          <span class="s2">教练姓名</span>
        </p>
        <p>
          <span class="s1">设备编号</span>
          <span class="s2">12345</span>
        </p>
        <p>
          <span class="s1">练车单价</span>
          <span class="s2">100元/小时</span>
        </p>
        <p>
          <span class="s1">收费模式</span>
          <span class="s2">先用后付</span>
        </p>
        <p>
          <span class="s1">待付账单</span>
          <span class="s2">¥100.00</span>
        </p>
      </div>
      <div class="loginbtn">退出设备</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped lang="less">
.minecoach {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background: #ededed;
  .container {
    padding-top: 20rpx;
    font-size: 30rpx;
    .content {
      padding: 32rpx 29rpx 29rpx 29rpx;
      background: #fff;
      p {
          margin-bottom: 11rpx;
          &:last-child{
              margin: 0;
          }
        .s1 {
          color: #7e7e7e;
        }
        .s2 {
          margin-left: 114rpx;
        }
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
      margin: 50rpx auto 0 auto;
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
