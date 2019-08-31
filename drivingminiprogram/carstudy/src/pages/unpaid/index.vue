<template>
  <div class="unpaid">
    <div class="content">
      <div class="item" v-for="(item,index) in list" :key="index" @click="godetail(item)" >
        <div class="left">
          <img :src="item.avatar" alt class="head" />
          <div class="info">
            <p class="name">{{item.name}}</p>
            <!-- <p class="p2">设备编号：12345</p> -->
          </div>
        </div>
        <div class="right">
          待付：
          <span>¥ {{item.coach_income}}</span>
          <img class="arrow" src="/static/images/arrow_right.png" alt />
        </div>
      </div>
      <p class="none" v-if="list.length <= 0">暂无数据</p>
    </div>
  </div>
</template>

<script>
import { coachUnpay } from '../../api/api';
import { navigate } from '../../utils';
export default {
  data() {
    return {
      list:[],
      page:1,
      last:false
    };
  },
  onLoad(){
    Object.assign(this.$data, this.$options.data());
    this.getUnpaylist();
  },
  onReachBottom(){
    if(!this.last){
      this.getUnpaylist();
    }
  },
  methods:{
    godetail(item){
      navigate(`/pages/billDetail/main?item=${JSON.stringify(item)}`)
    },
    getUnpaylist(){
      wx.showLoading({ title: "加载中", mask: true });
      coachUnpay({
        openid: wx.getStorageSync("openid"),
        page:this.page,
        size : 10
      }).then(res=>{
        console.log(res);
        if(res.data.code == 0){
          if(res.data.data.lists.length > 0){
            this.list = res.data.data.lists
            this.page++;
          }else{
            this.last = true;
          }
           wx.hideLoading();
        }else{
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
.unpaid {
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
        img {
          width: 70rpx;
          height: 70rpx;
          border-radius: 50%;
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 19rpx;
          .name {
            font-size: 34rpx;
          }
          .p2 {
            color: #7e7e7e;
            font-size: 30rpx;
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        font-size: 30rpx;
        color: #7e7e7e;
        span {
          font-size: 34rpx;
          color: #ed4a27;
          margin-right: 22rpx;
        }
        img {
          width: 14rpx;
          height: 26rpx;
        }
      }
    }
    .none{
      text-align: center;
      font-size: 36rpx;
      color: #ccc;
    }
  }
}
</style>
