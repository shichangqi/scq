<template>
  <div class="index">
    <div class="container">
      <div class="top">
        <img src="/static/images/scanqr.png" alt />
        <p>学员扫码登录设备</p>
      </div>
      <div class="content">
        <div class="ct1">
          <img src="http://via.placeholder.com/100x100/#ccc" alt />
          <span>请先登录</span>
        </div>
        <div class="ct2">
          <div class="titles">练车统计</div>
          <div class="info">
            <div class="item">
              <p class="title">0次</p>
              <p class="name">累计练车</p>
            </div>
            <div class="item">
              <p class="title">0分钟</p>
              <p class="name">累计学时</p>
            </div>
          </div>
        </div>
        <div class="ct3">
          <div class="titles">
            <span>练车记录</span>
            <span class="whole">全部 ></span>
          </div>
          <p class="none">暂无记录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang="less" scoped>
.index {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ededed;
  .container {
    background: #ededed;
    .top {
      position: relative;
      height: 240rpx;
      text-align: center;
      font-size: 30rpx;
      color: #fff;
      background: linear-gradient(
        0deg,
        rgba(234, 78, 39, 1),
        rgba(252, 145, 72, 1)
      );
      img {
        margin: 36rpx 0 18rpx 0;
        width: 121rpx;
        height: 121rpx;
      }
    }
    .content {
      padding: 20rpx 20rpx 100rpx;
      .ct1 {
        display: flex;
        align-items: center;
        background: #fff;
        font-size: 34rpx;
        border: 1rpx solid rgba(217, 217, 217, 1);
        border-radius: 10rpx;
        height: 200rpx;
        padding-left: 20rpx;
        img {
          width: 70rpx;
          height: 70rpx;
          border-radius: 50%;
        }
        span {
          margin-left: 22rpx;
        }
      }
      .ct2 {
        border: 1rpx solid rgba(217, 217, 217, 1);
        border-radius: 10rpx;
        text-align: center;
        background: #fff;
        font-size: 34rpx;
        padding-top: 29rpx;
        margin-top: 20rpx;
        .titles {
          padding-left: 20rpx;
          text-align: left;
        }
        .info {
          display: flex;
          justify-content: space-between;
          padding: 70rpx 50rpx;
          .name {
            color: #7e7e7e;
            font-size: 30rpx;
            margin-top: 13rpx;
          }
        }
      }
      .ct3 {
        border: 1rpx solid rgba(217, 217, 217, 1);
        border-radius: 10rpx;
        background: #fff;
        font-size: 34rpx;
        padding-top: 29rpx;
        padding-left: 20rpx;
        margin-top: 20rpx;
        height: 500rpx;
        .titles {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 20rpx;
          .whole {
            font-size: 30rpx;
            color: #7e7e7e;
          }
        }
        .none{
          text-align: center;
          margin-top: 175rpx;
          color: #7E7E7E;
          font-size: 30rpx;
        }
      }
    }
  }
}
</style>
