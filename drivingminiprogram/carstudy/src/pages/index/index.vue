<template>
  <div class="index">
    <div class="container">
      <div class="top">
        <img src="/static/images/scanqr.png" alt />
        <p>教练扫码登录设备</p>
        <div class="perbtn" @click="gopersonal">个人中心</div>
      </div>
      <div class="content">
        <div class="ct1">
          <div class="item">
            <p class="title">{{coachinfo.equipments_amount}}台</p>
            <p class="name">我的设备 ></p>
          </div>
          <div class="item">
            <p class="title">¥{{coachinfo.unpay_income}}</p>
            <p class="name">未支付账单 ></p>
          </div>
        </div>
        <div class="ct2">
          <div class="titles">我的收入</div>
          <div class="info">
            <div class="item">
              <p class="title">¥{{coachinfo.daily_income}}</p>
              <p class="name">昨日收入</p>
            </div>
            <div class="item">
              <p class="title">¥{{coachinfo.monthly_income}}</p>
              <p class="name">本月收入</p>
            </div>
            <div class="item">
              <p class="title">¥{{coachinfo.total_income}}</p>
              <p class="name">累计收入</p>
            </div>
          </div>
        </div>
        <div class="ct3" v-if="loged">
          <div class="titles">
            <span>练车记录</span>
            <span class="whole">全部 ></span>
          </div>
          <div class="list">
            <div class="item" v-for="(item,index) in coachinfo.lists" :key="index">
              <img :src="item.avatar" alt />
              <div class="right">
                <p class="p1">
                  <span>{{item.name}}</span>
                  <span>¥ {{item.coach_income}}</span>
                </p>
                <p class="p2">
                  <span>2010-10-10 10:00 {{item.duration}}分钟</span>
                  <span class="status" v-if="item.pay_state == 1">未支付</span>
                  <span class="status" v-if="item.pay_state == 2">已支付</span>
                  <span class="status" v-if="item.pay_state == 0"></span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="ct4" v-else>
          <div class="titles">
            <span>练车记录</span>
            <span class="whole">全部 ></span>
          </div>
          <p class="none">暂无记录</p>
        </div>
      </div>
    </div>
    <div class="mask" catchtouchmove="true" v-if="logedshow">
      <div class="showmodal">
        <div class="text">
          <p class="p1">登录</p>
          <p class="p2">请先登录后进行操作</p>
        </div>
        <div class="operation">
          <button class="cancel" @click="cancel1">取消</button>
          <button class="confirm" open-type="getUserInfo" @getuserinfo="getUserInfo">立即登录</button>
        </div>
      </div>
    </div>
    <div class="mask" catchtouchmove="true" v-if="phoneshow">
      <div class="showmodal">
        <div class="text">
          <p class="p1">绑定手机号</p>
          <p class="p2">请先绑定手机号后进行操作</p>
        </div>
        <div class="operation">
          <button class="cancel" @click="cancel2">取消</button>
          <button class="confirm" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">立即绑定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { promisic, formatTime, redirectTo } from "../../utils";
import { coachindex, coachdetail, getopenid,getphone } from "../../api/api";
export default {
  data() {
    return {
      coachinfo: {
        equipments_amount: 0,
        unpay_income: "0.00",
        daily_income: "0.00",
        monthly_income: "0.00",
        total_income: "0.00",
        lists: []
      },
      loged: false,
      auth: false,
      getPhone: false,
      logedshow: false,
      phoneshow: false
    };
  },
  onLoad() {
    this.updateApp();
    this.userAuthorized();
  },
  methods: {
    //获取手机号
     getPhoneNumber(e) {
      if (e.mp.detail.errMsg == "getPhoneNumber:fail user deny") {
        wx.showToast({ title: "您取消了授权", icon: "none", mask: true });
        return;
      }
      let _this = this;
      let iv = e.mp.detail.iv;
      let encrypted = e.mp.detail.encryptedData;
      getphone({
        iv: iv,
        openid: wx.getStorageSync("openid"),
        encryptedData: encrypted
      }).then(res => {
        if (res.data.code == 0) {
          wx.setStorageSync("phone", res.data.data.phone);
          redirectTo('/pages/personalInfomation/main')
        } else {
          wx.showToast({
            title: `${res.data.msg}`,
            icon: "none",
            mask: true
          });
        }
      });
    },
    //授权
    getUserInfo(e) {
      let that = this;
      let userInfo = e.target ? e.target.userInfo : null;
      console.log(userInfo);
      if (!userInfo) {
        return wx.showToast({
          title: "为了更好的体验，请允许授权 ",
          icon: "none"
        });
      }
      wx.setStorageSync("avatar", userInfo.avatarUrl);
      // 点击了授权
      wx.showToast({ title: "授权成功", icon: "sucess" });
      wx.login({
        success(res) {
          wx.setStorageSync("code", res.code);
          getopenid({
            code: res.code
          }).then(res1 => {
            if (res1.data.code == 0) {
              wx.setStorageSync("openid", res1.data.data.openid);
              coachdetail({
                openid: res1.data.data.openid
              }).then(res2 => {
                if (res2.data.data.name) {
                   that.getindex();
                } else {
                  that.phoneshow = true;
                }
              });
            } else {
              wx.showToast({
                title: `${res1.data.msg}`,
                icon: "none",
                mask: true
              });
            }
          });
        }
      });
    },
    cancel1() {
      this.logedshow = false;
    },
    cancel2() {
      this.phoneshow = false;
    },
    gopersonal() {
      if (!this.auth) {
        this.logedshow = true;
        return;
      }
      if (!this.getPhone) {
        this.phoneshow = true;
        return;
      }
    },
    //更新小程序
    updateApp() {
      if (wx.canIUse("getUpdateManager")) {
        // 当前使用的微信版本支持该属性
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(res => {
          if (res.hasUpdate) {
            // 有新版本更新
            updateManager.onUpdateReady(() => {
              // 监听小程序有版本更新事件，客户端主动触发下载
              updateManager.applyUpdate(); // 强制小程序重启应用新版本
            });
            updateManager.onUpdateFailed(() => {
              // 新版本下载失败
              wx.showModal({
                title: "新版本更新失败",
                content:
                  "请删除当前小程序，再次重新搜索打开以使用最新版本小程序"
              });
            });
          }
        });
      } else {
        // 当前使用的微信版本不支持该属性，提示用户更新微信客户端
        wx.showModal({
          title: "提示",
          content:
            "您当前使用的微信版本过低，无法使用该功能，请升级微信到最新版本后重试"
        });
      }
    },
    userAuthorized() {
      let that = this;
      promisic(wx.getSetting)()
        .then(res => {
          if (res.authSetting["scope.userInfo"]) {
            //已授权
            return promisic(wx.getUserInfo)();
          } else {
            this.loged = false;
            this.auth = false;
            // 未授权
            // wx.reLaunch({
            //   url: "/pages/authLogin/main"
            // });
          }
          return false;
        })
        .then(info => {
          if (!info) return;
          this.auth = true;
          wx.setStorageSync("avatar", info.userInfo.avatarUrl);
          // 判断是否已注册
          coachdetail({
            openid: wx.getStorageSync("openid")
          }).then(res2 => {
            if (res2.data.data.name) {
              //已注册
              this.getPhone = true;
              this.loged = true;
              this.getindex();
            } else {
              //未注册
              // redirectTo("/pages/getPhone/main");
            }
          });
        });
    },
    getindex() {
      coachindex({
        openid: wx.getStorageSync("openid")
      }).then(res1 => {
        if (res1.data.code == 0) {
          this.coachinfo = res1.data.data;
          this.coachinfo.lists.forEach(e => {
            e.create_time = formatTime(new Date(e.create_time));
          });
        } else {
          wx.showToast({
            title: `${res1.data.msg}`,
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
      .perbtn {
        position: absolute;
        right: 0;
        bottom: 83rpx;
        width: 180rpx;
        height: 70rpx;
        line-height: 70rpx;
        background: linear-gradient(
          0deg,
          rgba(255, 119, 77, 1),
          rgba(251, 161, 99, 1)
        );
        box-shadow: 0rpx 0rpx 20rpx 1rpx rgba(237, 50, 0, 0.26);
        border-top-left-radius: 35rpx;
        border-bottom-left-radius: 35rpx;
      }
    }
    .content {
      padding: 20rpx 20rpx 100rpx;
      .ct1 {
        display: flex;
        justify-content: space-between;
        padding: 58rpx 100rpx 60rpx;
        text-align: center;
        background: #fff;
        font-size: 34rpx;
        border: 1rpx solid rgba(217, 217, 217, 1);
        border-radius: 10rpx;
        .name {
          color: #7e7e7e;
          font-size: 30rpx;
          margin-top: 13rpx;
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
      .ct4 {
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
        .none {
          text-align: center;
          margin-top: 175rpx;
          color: #7e7e7e;
          font-size: 30rpx;
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
            align-items: center;
            padding: 29rpx 20rpx 29rpx 0;
            border-bottom: 1rpx solid #d9d9d9;
            &:last-child {
              border: 0;
            }
            img {
              width: 70rpx;
              height: 70rpx;
              border-radius: 50%;
            }
            .right {
              margin-left: 17rpx;
              flex: 1;
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
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    .showmodal {
      text-align: center;
      background: #fff;
      margin: 50% 85rpx 0 85rpx;
      border-radius: 10rpx;
      font-size: 34rpx;
      box-shadow: 0rpx 4rpx 4rpx rgba(0, 0, 0, 0.24);
      .text {
        padding: 59rpx 0 70rpx 0;
        color: #7e7e7e;
        border-bottom: 1rpx solid #d9d9d9;
        .p1 {
          color: #000;
          margin-bottom: 66rpx;
        }
      }
      .operation {
        display: flex;
        height: 100rpx;
        line-height: 100rpx;
        button {
          background: #fff;
          font-size: 34rpx;
          line-height: 100rpx;
        }
        .cancel {
          width: 50%;
          border-right: 1rpx solid #d9d9d9;
        }
        .confirm {
          width: 50%;
          color: #2a4478;
        }
      }
    }
  }
}
</style>
