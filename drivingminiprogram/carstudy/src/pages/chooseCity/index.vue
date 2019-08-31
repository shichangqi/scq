<template>
  <div class="choosecity">
    <div class="container">
      <div class="search">
        <input
          type="text"
          placeholder="请输入城市名称（如北京、Beijing）"
          placeholder-style="color:rgba(0,0,0,.5);font-size:15px"
          v-model="city"
        />
        <span @click="search">搜索</span>
      </div>
      <div class="location">
        <span>定位城市：请选择</span>
        <!-- <span class="locabtn">重新定位</span> -->
      </div>
      <div class="citylist" id="list">
        <scroll-view scroll-y :style="'height:'+height+'px'">
          <div class="item" v-for="(item,key) in list" :key="key">
            <div class="letter" v-if="key != '#'">{{key}}</div>
            <div class="city" v-for="(i,index) in item" :key="index">{{i.name}}</div>
          </div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
import { cityList } from "../../api/api";
import { data_letter_sort } from "../../utils";
export default {
  data() {
    return {
      height: 0,
      list: null,
      citylist: null,
      city: ""
    };
  },
  onLoad() {
    this.getlist();
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
    search() {
      this.list = {};
      //验证是否是中文
      let iscn = false;
      let pattern = new RegExp("[\u4E00-\u9FA5]+");
      if (pattern.test(this.city)) {
        iscn = true;
      } else {
        //验证是否是英文
        let pattern2 = new RegExp("[A-Za-z]+");
        if (pattern2.test(this.city)) {
          iscn = false;
        }
      }
      if (iscn) {
        for (let key in this.citylist) {
          let contain = false;
          let arr = [];
          this.citylist[key].forEach(item => {
            if (item.name.indexOf(this.city) != -1) {
              contain = true;
              console.log(item.name);
              arr.push(item);
            }
          });
          if (contain) {
            this.list[key] = arr;
          }
        }
      }else{
        for (let key in this.citylist) {
          let contain = false;
          let arr = [];
          this.citylist[key].forEach(item => {
            if (item.pinyin.indexOf(this.city) != -1) {
              contain = true;
              arr.push(item);
            }
          });
          if (contain) {
            this.list[key] = arr;
          }
        }
      }
    },
    getlist() {
      cityList({}).then(res => {
        if (res.data.code == 0) {
          let list = res.data.data;
          this.list = data_letter_sort(list, "pinyin");
          this.citylist = this.list;
          console.log(this.citylist);
        }else{
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
.choosecity {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ededed;
  .container {
    padding-top: 18rpx;
    .search {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      padding: 16rpx 29rpx 16rpx 20rpx;
      input {
        width: 81%;
        height: 58rpx;
        background: #d6d5d5;
        border-radius: 29rpx;
        padding-left: 20rpx;
        font-size: 30rpx;
      }
      span {
        font-size: 30rpx;
      }
    }
    .location {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 90rpx;
      font-size: 34rpx;
      padding: 0 29rpx;
      background: #fff;
      margin-top: 20rpx;
      .locabtn {
        font-size: 30rpx;
        color: #7e7e7e;
      }
    }
    .citylist {
      .item {
        font-size: 30rpx;
        .letter {
          padding: 38rpx 0 10rpx 30rpx;
        }
        .city {
          padding: 30rpx;
          background: #fff;
          border-bottom: 1rpx solid #d9d9d9;
          &:last-child {
            border: 0;
          }
        }
      }
    }
  }
}
</style>
