<template>
  <div class="billdetail">
    <div class="top">
      <img :src="info.avatar" alt class="head" />
      <p class="p1">{{info.name}}，{{info.telephone}}</p>
      <p class="p2">
        待付金额：
        <span>¥ {{info.coach_income}}</span>
      </p>
    </div>
    <div class="content" id="list">
      <scroll-view scroll-y :style="'height:'+height+'px'">
        <div class="list">
          <div class="item" v-for="(item,index) in list" :key="index">
            <p class="p1">
              <span>{{item.create_time}}</span>
              <span>¥ {{item.coach_income}}</span>
            </p>
            <p class="p2">
              <span>设备编号：{{item.equipment_id}}</span>
              <span class="time">时长：{{item.duration}}分钟</span>
            </p>
          </div>
        </div>
      </scroll-view>
    </div>
    <div class="loginbtn" @click="callphone">联系学员</div>
  </div>
</template>

<script>
import { unpayList } from "../../api/api";
import { formatTime } from "../../utils";
export default {
  data() {
    return {
      height: 0,
      info: {},
      page: 1,
      last: false,
      list: []
    };
  },
  onLoad(query) {
    this.info = JSON.parse(query.item);
    this.getdetail();
  },
  onShow() {
    let that = this;
    wx.getSystemInfo({
      success(res) {
        let query = wx.createSelectorQuery();
        query.select("#list").boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(function(res1) {
          that.height = res.windowHeight - res1[0].top;
        });
      }
    });
  },
  methods: {
    callphone() { 
      let that = this;
      wx.makePhoneCall({
        phoneNumber: that.info.telephone
      });
    },
    getdetail() {
      unpayList({
        openid: wx.getStorageSync("openid"),
        student_id: this.info.id,
        page: this.page,
        size: 10
      }).then(res => {
        if (res.data.code == 0) {
          if (res.data.data.lists.length > 0) {
            this.list = res.data.data.lists;
            this.list.forEach(e => {
              e.create_time = formatTime(new Date(e.create_time));
            });
            this.page++;
          } else {
            this.last = true;
          }
          wx.hideLoading();
        } else {
          wx.hideLoading();
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

<style scoped lang="less">
.billdetail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background: #ededed;
  .top {
    padding: 44rpx 0;
    background: #fff;
    text-align: center;
    font-size: 34rpx;
    .head {
      width: 70rpx;
      height: 70rpx;
      border-radius: 50%;
    }
    .p1 {
      font-weight: lighter;
      margin-top: 20rpx;
    }
    .p2 {
      margin-top: 18rpx;
      span {
        color: #ed4a27;
      }
    }
  }
  .content {
    .list {
      margin-top: 19rpx;
      padding-bottom: 190rpx;
    }
    .item {
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 33rpx 30rpx 30rpx;
      border-bottom: 1rpx solid #d9d9d9;
      &:last-child {
        border: 0;
      }
      .p1 {
        display: flex;
        justify-content: space-between;
        font-size: 34rpx;
      }
      .p2 {
        font-size: 30rpx;
        color: #7e7e7e;
        margin-top: 10rpx;
        .time {
          margin-left: 40rpx;
        }
      }
    }
  }
  .loginbtn {
    position: absolute;
    bottom: 72rpx;
    left: 0;
    right: 0;
    margin: auto;
    width: 600rpx;
    color: #fff;
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    font-size: 36rpx;
    background: linear-gradient(90deg, #ea4e27, #fc9148);
    border-radius: 50rpx;
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
