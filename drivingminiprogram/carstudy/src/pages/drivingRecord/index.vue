<template>
  <div class="drivingrecord">
    <div class="content">
      <div class="item" v-for="(item,index) in list" :key="index" @click="godetail(item.id)">
        <div class="left">
          <img :src="item.avatar" alt class="head" />
          <div class="info">
            <p class="name">
              <span>{{item.name}}</span>
              <span>¥ {{item.coach_income}}</span>
            </p>
            <p class="p2">
              <span>{{item.create_time}} {{item.duration}}分钟</span>
              <span class="status" v-if="item.pay_state == 1">未支付</span>
              <span class="status" v-if="item.pay_state == 2">已支付</span>
              <span class="status" v-if="item.pay_state == 0"></span>
            </p>
          </div>
        </div>
      </div>
      <p class="none" v-if="list.length <= 0">暂无数据</p>
    </div>
  </div>
</template>

<script>
import { coachorder } from '../../api/api';
import { formatTime, navigate } from '../../utils';
export default {
  data() {
    return {
      list:[],
      page:1,
      last:false
    };
  },
  onLoad(){
    this.getrecoed();
  },
  onReachBottom(){
    if(!this.last){
      this.getrecoed();
    }
  },
  methods:{
    godetail(id){
      navigate(`/pages/orderDetail/main?id=${id}`)
    },
    getrecoed(){
      wx.showLoading({ title: "加载中", mask: true });
      coachorder({
        openid: wx.getStorageSync("openid"),
        page:this.page,
        size : 10
      }).then(res=>{
        console.log(res);
        if(res.data.code == 0){
          if(res.data.data.lists.length > 0){
            this.list = res.data.data.lists;
            this.list.forEach(e => {
              e.create_time = formatTime(new Date(e.create_time));
            });
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
        img {
          width: 70rpx;
          height: 70rpx;
          border-radius: 50%;
        }
        .info {
        width: 60%;
          flex: 1;
          margin-left: 19rpx;
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
     .none{
      text-align: center;
      font-size: 36rpx;
      color: #ccc;
    }
  }
}
</style>
