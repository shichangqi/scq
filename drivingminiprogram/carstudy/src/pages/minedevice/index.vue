<template>
  <div class="minedevice">
    <div class="top">以下是您登录过的设备</div>
    <div class="devicelist">
      <div class="item" v-for="(item,index) in list" :key="index">
        <div class="left">
          <p class="p1">设备编号：{{item.equipment_id}}</p>
          <p class="p2">付费学时总额：{{item.minutes}}</p>
          <!-- <p class="p2">最近登录时间：2010-10-10 10:00</p> -->
        </div>
        <span>{{item.status == 0?'登出':'登录中'}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { coachEquipments } from "../../api/api";
import { timeminutes } from '../../utils';
export default {
  data() {
    return {
      list: []
    };
  },
  onLoad() {
    this.getdevice();
  },
  methods: {
    //获取教练设备列表
    getdevice() {
      coachEquipments({
        openid: wx.getStorageSync("openid")
      }).then(res => {
        if (res.data.code == 0) {
          this.list = res.data.data;
          this.list.forEach(e => {
            e.minutes = timeminutes(e.duration)
          });
        } else {
          wx.showToast({
            title: `${res.data.msg}`,
            icon: "none",
            mask: true
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.minedevice {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ededed;
  .top {
    padding: 30rpx 0 10rpx 30rpx;
    font-size: 30rpx;
    color: #7e7e7e;
  }
  .devicelist {
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 32rpx 30rpx 30rpx 30rpx;
      background: #fff;
      border-bottom: 1rpx solid #d9d9d9;
      &:last-child {
        border: 0;
      }
      .left {
        .p1 {
          font-size: 34rpx;
          color: #000;
        }
        .p2 {
          margin-top: 20rpx;
          font-size: 30rpx;
          color: #7e7e7e;
        }
      }
      span {
        font-size: 28rpx;
        color: #ed4a27;
      }
    }
  }
}
</style>