<template>
  <div class="orderdetail">
    <div class="container">
      <div class="top">
        <p class="p1">未支付</p>
        <p class="p2">当前订单状态</p>
      </div>
      <div class="detail">
        <p>
          <span>订单金额</span>
          <span class="right">¥ 10.00</span>
        </p>
        <p>
          <span>开始时间</span>
          <span class="right">2010-10-10 10:00:00</span>
        </p>
        <p>
          <span>结束时间</span>
          <span class="right">2010-10-10 10:00:00</span>
        </p>
        <p>
          <span>时长</span>
          <span class="right">10分钟</span>
        </p>
        <p>
          <span>单价</span>
          <span class="right">66元/小时</span>
        </p>
        <p>
          <span>教练</span>
          <span class="right">刘德华</span>
        </p>
        <p>
          <span>订单号</span>
          <span class="right">123456</span>
        </p>
        <p>
          <span>设备编号</span>
          <span class="right">123456</span>
        </p>
        <p>
          <span>考试成绩</span>
          <span class="right">100分</span>
        </p>
      </div>
    </div>
    <div class="loginbtn">退出设备</div>
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
.orderdetail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background: #ededed;
  .container {
    font-size: 30rpx;
    .top {
      height: 260rpx;
      background: #fff;
      text-align: center;
      padding-top: 82rpx;
      .p1 {
        font-size: 50rpx;
        margin-bottom: 21rpx;
      }
      .p2 {
        font-weight: lighter;
        color: #7e7e7e;
      }
    }
    .detail {
      margin-top: 19rpx;
      padding: 30rpx 0 30rpx 33rpx;
      color: #7e7e7e;
      background: #fff;
      p {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30rpx;
        &:last-child {
          margin: 0;
        }
        .right {
          display: inline-block;
          width: 495rpx;
          color: #000;
        }
      }
    }
  }
  .loginbtn {
    position: absolute;
    bottom: 52rpx;
    left: 0;
    right: 0;
    width: 600rpx;
    color: #fff;
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    font-size: 36rpx;
    background: linear-gradient(90deg, #ea4e27, #fc9148);
    border-radius: 50rpx;
    margin: auto;
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
</style>
