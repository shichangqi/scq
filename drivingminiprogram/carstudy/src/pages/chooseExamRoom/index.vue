<template>
  <div class="choosecity">
    <div class="content">
      <div class="location">
        <div class="panel">
          <span>当前城市：上海</span>
          <span class="right">
            <span>切换城市</span>
            <img class="arrow" src="/static/images/arrow_right.png" alt />
          </span>
        </div>
      </div>
      <div class="driverschool">
          <div class="panel">
                <span>我是考场名称</span>
                <span class="radio"></span>
          </div>
          <div class="panel">
                <span>我是考场名称</span>
                <span class="radioed"></span>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.choosecity {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ededed;
  .content {
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
          font-size: 30rpx;
          color: #7E7E7E;
        .arrow {
          width: 14rpx;
          height: 26rpx;
          margin-left: 17rpx;
        }
      }
      &:last-child {
        border: 0;
      }
    }
    .driverschool{
        margin-top: 16rpx;
        .radio{
            width: 32rpx;
            height: 32rpx;
            box-sizing: border-box;
            border:6rpx solid rgba(242,155,118,1);
            border-radius: 50%;
        }
        .radioed{
            width: 32rpx;
            height: 32rpx;
            box-sizing: border-box;
            border:6rpx solid rgba(242,155,118,1);
            border-radius: 50%;
            background: #EA4E27;
        }
    }
  }
}
</style>