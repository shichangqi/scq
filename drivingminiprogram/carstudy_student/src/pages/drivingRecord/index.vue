<template>
  <div class="drivingrecord">
    <div class="content">
      <div class="item">
        <div class="left">
          <div class="info">
            <p class="name">
              <span>2010-10-10  10:00</span>
              <span>¥ 10.00</span>
            </p>
            <p class="p2">
              <span>时长：15分钟</span>
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
              <span>时长：15分钟</span>
              <span class="status"></span>
            </p>
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
  }
};
</script>

<style scoped lang="less">
.drivingrecord {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ededed;
  .content {
    padding-top: 20rpx;
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
</style>
