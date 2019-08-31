<template>
  <div class="index">
    <div class="container">
      <div class="top">
        <div class="left">
          <img src="http://via.placeholder.com/100x100/#ccc" alt />
          <div class="info">
            <p class="p1">我的教练：张三</p>
            <p class="p2">设备编号：12345</p>
          </div>
        </div>
        <span>详情 ></span>
      </div>
      <div class="content">
        <div class="ct1">
          <div class="left">
            <img src="http://via.placeholder.com/100x100/#ccc" alt />
            <div class="info">
              <p class="p1">学员昵称</p>
              <p class="p2">个人中心 ></p>
            </div>
          </div>
          <div class="right">
            <p class="p1">¥0.00</p>
            <p class="p2">未支付账单 ></p>
          </div>
        </div>
        <div class="ct2">
          <div class="titles">练车统计</div>
          <div class="info">
            <div class="item">
              <p class="title">6次</p>
              <p class="name">累计练车</p>
            </div>
            <div class="item">
              <p class="title">10分钟</p>
              <p class="name">累计学时</p>
            </div>
          </div>
        </div>
        <div class="ct3">
          <div class="titles">
            <span>练车记录</span>
            <span class="whole">全部 ></span>
          </div>
          <div class="list">
            <div class="item">
              <div class="right">
                <p class="p1">
                  <span>2010-10-10 10:00</span>
                  <span>¥ 10.00</span>
                </p>
                <p class="p2">
                  <span>时长：15分钟</span>
                  <span class="status">未支付</span>
                </p>
              </div>
            </div>
            <div class="item">
              <div class="right">
                <p class="p1">
                  <span>2010-10-10 10:00</span>
                  <span>¥ 10.00</span>
                </p>
                <p class="p2">
                  <span>时长：15分钟</span>
                  <span class="status">未支付</span>
                </p>
              </div>
            </div>
            <div class="item">
              <div class="right">
                <p class="p1">
                  <span>2010-10-10 10:00</span>
                  <span>¥ 10.00</span>
                </p>
                <p class="p2">
                  <span>时长：15分钟</span>
                  <span class="status"></span>
                </p>
              </div>
            </div>
          </div>
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      height: 240rpx;
      padding: 0 30rpx;
      font-size: 34rpx;
      color: #fff;
      background: linear-gradient(
        0deg,
        rgba(234, 78, 39, 1),
        rgba(252, 145, 72, 1)
      );
      .left {
        display: flex;
        align-items: center;
        img {
          width: 70rpx;
          height: 70rpx;
          border-radius: 50%;
        }
        .info {
          margin-left: 22rpx;
          .p2 {
            font-size: 30rpx;
            color: #7e7e7e;
            margin-top: 10rpx;
          }
        }
      }
      span {
        font-size: 30rpx;
      }
    }
    .content {
      padding: 20rpx 20rpx 100rpx;
      .ct1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        font-size: 34rpx;
        border: 1rpx solid rgba(217, 217, 217, 1);
        border-radius: 10rpx;
        height: 200rpx;
        padding-left: 20rpx;
        padding-right: 49rpx;
        .left {
          display: flex;
          align-items: center;
          img {
            width: 70rpx;
            height: 70rpx;
            border-radius: 50%;
          }
          .info {
            margin-left: 23rpx;
          }
        }
        .right {
          text-align: center;
        }
        .p2 {
          font-size: 30rpx;
          color: #7e7e7e;
          margin-top: 8rpx;
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
        .list {
          .item {
            display: flex;
            padding: 29rpx 20rpx 29rpx 0;
            border-bottom: 1rpx solid #d9d9d9;
            &:last-child {
              border: 0;
            }
            .right {
              width: 100%;
              p {
                display: flex;
                justify-content: space-between;
              }
              .p2 {
                font-size: 30rpx;
                margin-top: 12rpx;
                color: #7e7e7e;
                font-weight: lighter;
                .status {
                  color: #ed4a27;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
