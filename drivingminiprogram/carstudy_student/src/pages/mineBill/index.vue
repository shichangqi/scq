<template>
  <div class="minebill">
    <div class="container">
      <div class="top">
        <p class="p1">¥10.00</p>
        <p class="p2">待付账单总金额</p>
      </div>
      <div class="detail">
         <div class="item">
        <div class="left">
          <div class="info">
            <p class="name">
              <span>2010-10-10  10:00</span>
              <span>¥ 10.00</span>
            </p>
            <p class="p2">
              <span>设备编号：123456<span class="times">时长：15分钟</span></span>
              <span class="status">未支付</span>
            </p>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <div class="info">
            <p class="name">
              <span>2010-10-10  10:00</span>
              <span>¥ 10.00</span>
            </p>
            <p class="p2">
              <span>设备编号：123456<span class="times">时长：15分钟</span></span>
              <span class="status"></span>
            </p>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="left">
          <div class="info">
            <p class="name">
              <span>2010-10-10  10:00</span>
              <span>¥ 10.00</span>
            </p>
            <p class="p2">
              <span>设备编号：123456<span class="times">时长：15分钟</span></span>
              <span class="status"></span>
            </p>
          </div>
        </div>
      </div>
      
      </div>
    </div>
    <div class="loginbtn">支付</div>
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
.minebill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background: #ededed;
  .container {
    font-size: 30rpx;
    margin-bottom: 200rpx;
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
      .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24rpx 30rpx;
      background: #fff;
      border-bottom: 1rpx solid #d9d9d9;
      &:last-child {
        border: 0;
      }
      .left {
        display: flex;
        align-items: center;
        width: 100%;
        .info {
          width: 60%;
          flex: 1;
          .name {
            display: flex;
            justify-content: space-between;
            font-size: 34rpx;
          }
          .p2 {
            display: flex;
            justify-content: space-between;
            color: #7e7e7e;
            font-size: 30rpx;
            .times{
                margin-left: 40rpx;
            }
            .status {
              font-size: 30rpx;
              color: #ed4a27;
            }
          }
        }
      }
    }
    }
  }
  .loginbtn {
    position: fixed;
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
