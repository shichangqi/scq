<template>
  <div class="uncertified">
    <!-- 未认证 -->
    <!-- <div class="container" v-if="!certified">
      <div class="content1">
        <div class="panel panel1">
          <span>身份证正面</span>
          <span class="right">
            <span>上传身份证正面</span>
            <img class="arrow" src="/static/images/arrow_right.png" alt />
          </span>
        </div>
        <div class="panel panel1">
          <span>身份证反面</span>
          <span class="right">
            <span>上传身份证反面</span>
            <img class="arrow" src="/static/images/arrow_right.png" alt />
          </span>
        </div>
      </div>
      <div class="content2">
        <div class="panel panel1">
          <span>驾驶证</span>
          <span class="right">
            <span>上传驾驶证</span>
            <img class="arrow" src="/static/images/arrow_right.png" alt />
          </span>
        </div>
        <div class="panel panel1">
          <span>行驶证</span>
          <span class="right">
            <span>上传行驶证</span>
            <img class="arrow" src="/static/images/arrow_right.png" alt />
          </span>
        </div>
      </div>
    </div>-->
    <!-- 审核中 -->
    <div class="container2">
      <div class="result">认证结果：审核中，请耐心等待</div>
      <div class="content1">
        <div class="panel panel1" @click="chooseimg(0)">
          <span>身份证正面</span>
          <span class="right">
            <span v-if="imglist[0] == ''">上传身份证正面</span>
            <img v-else :src="'https://lky-dev.oss-cn-shanghai.aliyuncs.com'+imglist[0]" alt class="imgs" mode="aspectFill" />
            <img class="arrow" src="/static/images/arrow_right.png" alt />
          </span>
        </div>
        <div class="panel panel1" @click="chooseimg(1)">
          <span>身份证反面</span>
          <span class="right">
            <span v-if="imglist[1] == ''">上传身份证反面</span>
            <img v-else :src="'https://lky-dev.oss-cn-shanghai.aliyuncs.com'+imglist[1]" alt class="imgs" mode="aspectFill" />
            <img class="arrow" src="/static/images/arrow_right.png" alt />
          </span>
        </div>
      </div>
      <div class="content2">
        <div class="panel panel1" @click="chooseimg(2)">
          <span>驾驶证</span>
          <span class="right">
            <span v-if="imglist[2] == ''">上传驾驶证</span>
            <img v-else :src="'https://lky-dev.oss-cn-shanghai.aliyuncs.com'+imglist[2]" alt class="imgs" mode="aspectFill" />
            <img class="arrow" src="/static/images/arrow_right.png" alt />
          </span>
        </div>
        <div class="panel panel1" @click="chooseimg(3)">
          <span>行驶证</span>
          <span class="right">
            <span v-if="imglist[3] == ''">上传行驶证</span>
            <img v-else :src="'https://lky-dev.oss-cn-shanghai.aliyuncs.com'+imglist[3]" alt class="imgs" mode="aspectFill" />
            <img class="arrow" src="/static/images/arrow_right.png" alt />
          </span>
        </div>
      </div>
    </div>
    <div class="submit">
      <div class="loginbtn" @click="submit">提交</div>
    </div>
    <canvas :style="'width:'+w+'px; height:'+h+'px'" canvas-id="myCanvas" class="cans"></canvas>
  </div>
</template>
<script>
import { uploadimg, coachAuth } from "../../api/api";
import { goBack } from "../../utils";
export default {
  data() {
    return {
      w: 0,
      h: 0,
      flag: true,
      imglist: ["", "", "", ""]
    };
  },
  methods: {
    submit() {
      if (this.imglist[0] == "") {
        wx.showToast({
          title: "请上传身份证正面",
          icon: "none",
          mask: true
        });
        return;
      } else if (this.imglist[1] == "") {
        wx.showToast({
          title: "请上传身份证反面",
          icon: "none",
          mask: true
        });
        return;
      } else if (this.imglist[2] == "") {
        wx.showToast({
          title: "请上传驾驶证",
          icon: "none",
          mask: true
        });
        return;
      } else if (this.imglist[3] == "") {
        wx.showToast({
          title: "请上传行驶证",
          icon: "none",
          mask: true
        });
        return;
      }
      coachAuth({
        openid: wx.getStorageSync("openid"),
        id_facade: this.imglist[0],
        id_obverse: this.imglist[1],
        driving_license: this.imglist[2],
        driver_license: this.imglist[3]
      }).then(res => {
        console.log(res.data);
        if (res.data.code == 0) {
          if (res.data.data == true) {
            goBack();
          }
        } else {
          wx.showToast({
            title: `${res.data.msg}`,
            icon: "none",
            mask: true
          });
        }
      });
    },
    //上传到图片服务器得到网络链接
    wxupload(path, index) {
      let that = this;
      wx.getImageInfo({
        src: path,
        success: function(ras) {
          const ctx = wx.createCanvasContext("myCanvas"); //创建画布
          var _w = ras.width, //创建宽高等于获取到的宽高
            _h = ras.height;
          var rat = ras.width / ras.height;
          that.w = _w;
          that.h = _h;
          //传输到视图层
          ctx.drawImage(path, 0, 0, _w, _h); //画布中展示图片大小
          wx.showLoading({ title: "压缩上传中...", mask: true }); //运行压缩输出文字（显示loading）
          ctx.draw(false, () => {
            setTimeout(() => {
              wx.canvasToTempFilePath({
                //把当前画布指定区域的内容导出生成指定大小图片，并返回文件路径
                canvasId: "myCanvas", //画布id
                quality: 0.7, //图片质量，取值范围在（0，1】
                fileType: "jpg",
                success: function(rps) {
                  console.log(444, rps); //给后台传输这个地址
                  wx.uploadFile({
                    url: uploadimg, //真实的接口地址
                    filePath: rps.tempFilePath,
                    name: "file",
                    success: function(res) {
                      let data = JSON.parse(res.data);
                      console.log(789, data);
                      if (data.code == 0) {
                        that.imglist[index] =
                          "https://lky-dev.oss-cn-shanghai.aliyuncs.com" +
                          data.data.key;
                        wx.hideLoading(); //隐藏loading
                        console.log(that.imglist);
                        that.$forceUpdate();
                        wx.showToast({
                          title: "上传成功！",
                          icon: "success",
                          mask: true
                        });
                      } else {
                        wx.hideLoading(); //隐藏loading
                        wx.showToast({
                          title: "上传失败！",
                          icon: "none",
                          mask: true
                        });
                      }
                    }
                  });
                },
                fail: function(a) {
                  console.log(a);
                },
                complete: function(b) {}
              });
            }, 200);
          });
        }
      });
    },
    //选择是拍照还是从相册选择
    chooseimg(index) {
      let _this = this;
      wx.showActionSheet({
        itemList: ["从相册中选择", "拍照"], //下面显示的数组是拍照还是别的
        itemColor: "#1B365D", //显示文字的颜色
        success: function(res) {
          if (!res.cancel) {
            //选中判断
            if (res.tapIndex == 0) {
              _this.chooseWxImage("album", index);
            } else if (res.tapIndex == 1) {
              _this.chooseWxImage("camera", index);
            }
          }
        }
      });
    },
    //选择图片并绘制canvas之后导出
    chooseWxImage(type, index) {
      var that = this;
      wx.chooseImage({
        //上传图片事件
        count: 1, //数量
        sizeType: ["compressed"], //original 原图，compressed 压缩图，默认二者都有
        sourceType: [type], //album 从相册选图，camera 使用相机，默认二者都有
        success: function(res) {
          // that.wxupload(res.tempFilePaths[0], index);
          wx.showLoading({ title: "上传中...", mask: true });
          wx.uploadFile({
            url: uploadimg, //真实的接口地址
            filePath: res.tempFilePaths[0],
            name: "file",
            success: function(res) {
              let data = JSON.parse(res.data);
              if (data.code == 0) {
                that.imglist[index] = data.data.key;
                wx.hideLoading(); //隐藏loading
                that.$forceUpdate();
                wx.showToast({
                  title: "上传成功！",
                  icon: "success",
                  mask: true
                });
              } else {
                wx.hideLoading(); //隐藏loading
                wx.showToast({
                  title: "上传失败！",
                  icon: "none",
                  mask: true
                });
              }
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.uncertified {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ededed;
  z-index: -2;
  .container {
    padding-top: 19rpx;
    .panel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      background: #fff;
      font-size: 34rpx;
      border-bottom: 1rpx solid #d9d9d9;
      .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 423rpx;
        text-align: left;
        font-size: 30rpx;
        color: #7e7e7e;
        .arrow {
          width: 14rpx;
          height: 26rpx;
        }
      }
      &:last-child {
        border: 0;
      }
    }
    .content2 {
      margin-top: 20rpx;
    }
  }
  .container2 {
    .result {
      padding: 25rpx 30rpx 26rpx 30rpx;
      background: #fbeeed;
      font-size: 28rpx;
    }
    .panel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30rpx;
      height: 180rpx;
      background: #fff;
      font-size: 34rpx;
      border-bottom: 1rpx solid #d9d9d9;
      .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 423rpx;
        text-align: left;
        font-size: 34rpx;
        color: #7e7e7e;
        .imgs {
          width: 140rpx;
          height: 140rpx;
          border-radius: 4rpx;
        }
        .arrow {
          width: 14rpx;
          height: 26rpx;
        }
      }
      &:last-child {
        border: 0;
      }
    }
    .content2 {
      margin-top: 20rpx;
    }
  }
  .loginbtn {
    position: relative;
    width: 600rpx;
    color: #fff;
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    margin: 65rpx auto 0 auto;
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
  .cans {
    position: absolute;
    left: -1010000px;
    top: -200000px;
  }
}
</style>