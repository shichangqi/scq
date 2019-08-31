<template>
  <div class="studentbill">
    <div class="container">
        <div class="top">
            <img src="http://via.placeholder.com/100x100/#ccc" alt />
            <p>学员姓名</p>
        </div>
        <div class="info">
            <p><span class="name">累计学时</span><span>10分钟</span></p>
            <p class="p2"><span class="name">待付金额</span><span>¥ 10.00</span></p>
        </div>
        <div class="loginbtn">支付</div>
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
.studentbill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background: #ededed;
  .container {
    font-size: 34rpx;
    .top{
        height: 260rpx;
        text-align: center;
        background: #fff;
        img{
            width: 70rpx;
            height: 70rpx;
            border-radius: 50%;
            margin: 71rpx 0 16rpx 0;
        }
        
    }
    .info{
        padding: 31rpx 29rpx 33rpx 29rpx;
        margin-top: 20rpx;
        background: #fff;
        p{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .name{
                color: #7E7E7E;
                font-weight: lighter;
            }
        }
        .p2{
            margin-top: 12rpx;
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
