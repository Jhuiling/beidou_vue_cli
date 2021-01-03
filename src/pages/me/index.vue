<template>
  <view
    id="me"
    :style="
      'height:' +
      wihe +
      'px!important;overflow-y: scroll;background-color:#f3f3f3;'
    "
  >
    <view
      class="jaibox"
      style="
        width: 100%;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        align-content: flex-start;
        flex-direction: row;
      "
    >
      <view
        class="topbar"
        style="
          height: 40rpx;
          position: relative;
          width: 100%;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          align-content: flex-end;
          top: 30rpx;
        "
      >
        <view style="font-size: 30rpx; text-align: center; width: 100%"
          >我的</view
        >
        <image
          style="width: 40rpx; height: 40rpx; position: absolute; right: 3%"
          src="../../static/image/saoma.png"
          @click="scanDevice"
        ></image>
      </view>
    </view>
    <view class="acjia"></view>
    <view class="top-view">
      <image src="/static/image/tuoyia.png" class="neiimg"></image>
      <view style="">
        <view
          class="me-head"
          style="position: relative; margin: 0rpx auto; bottom: 30rpx"
        >
          <image
            mode="scaleToFill"
            style="border-radius: 50%"
            :src="imgurl"
            class="me-head-img"
            @click="chooseHead()"
          ></image>
        </view>
        <view
          style="
            position: relative;
            z-index: 10;
            text-align: center;
            color: #ffffff;
          "
          >{{ nickName.length == 0 ? mobile : nickName }}</view
        >
        <view
          style="
            border-radius: 100rpx;
            width: 30%;
            margin: 0rpx auto;
            position: relative;
            z-index: 10;
            text-align: center;
            color: #ffffff;
            font-size: 28rpx;
            background: rgba(255, 255, 255, 0.2);
            padding: 0rpx 10rpx;
          "
          >我的设备 {{ shebei }}</view
        >
      </view>
    </view>

    <view
      class="list-view"
      style="background-color: #f3f3f3; width: 95%; margin: 10rpx auto 0rpx"
    >
      <navigator
        @click="mechineList"
        style="
          background-color: #ffffff;
          border-top-right-radius: 10rpx;
          border-top-left-radius: 10rpx;
        "
      >
        <view class="navbox">
          <view class="waibox">
            <text class="textlbv">设备管理</text>
          </view>
          <view
            style="
              display: flex;
              display: -webkit-flex;
              flex-wrap: nowrap;
              align-items: center;
            "
          >
            <text style="font-size: 25rpx; color: #666666; padding-right: 10rpx"
              >查看全部设备</text
            >
            <image
              class="rightbosl"
              src="../../static/image/right@2x.png"
            ></image>
          </view>
        </view>
      </navigator>

      <view
        style="
          margin-bottom: 20rpx;
          background-color: #ffffff;
          padding-top: 20rpx;
          padding-bottom: 20rpx;
          border-bottom-left-radius: 10rpx;
          border-bottom-right-radius: 10rpx;
        "
      >
        <view class="machine-box">
          <view class="nobolexS">
            <view class="machine-item" v-if="arry1.length != 0">
              <picker
                @change="bindPickerChange1"
                :value="index"
                :range="arry1"
                :title="title"
              >
                <image
                  class="img"
                  style="width: 60rpx; height: 60rpx; top: 0"
                  mode="aspectFit"
                  src="/static/image/bz1.png"
                ></image>
              </picker>
            </view>
            <view class="machine-item" v-else>
              <image
                class="img"
                mode="aspectFit"
                src="/static/image/bz1.png"
              ></image>
            </view>
            <view class="num">{{ watch_count }}</view>
          </view>

          <view class="nobolexS">
            <view class="machine-item" v-if="arry2.length != 0">
              <picker
                @change="bindPickerChange2"
                :value="index"
                :range="arry2"
                :title="title"
              >
                <image
                  class="img"
                  mode="aspectFit"
                  style="width: 60rpx; height: 60rpx; top: 0"
                  src="/static/image/bz2.png"
                ></image>
              </picker>
            </view>
            <view class="machine-item" v-else>
              <image
                class="img"
                mode="aspectFit"
                src="/static/image/bz2.png"
              ></image>
            </view>
            <view class="num">{{ job_count }}</view>
          </view>
          <view class="nobolexS">
            <!-- <navigator  url="/pages/car_bd/car_bd" style="background: #FFFFFF;border-top-left-radius: 5rpx ;border-top-right-radius: 5rpx;" > -->
            <view class="machine-item" v-if="arry3.length != 0">
              <picker
                @change="bindPickerChange3"
                :value="index"
                :range="arry3"
                :title="title"
              >
                <image
                  class="img"
                  mode="aspectFit"
                  style="width: 60rpx; height: 60rpx; top: 0"
                  src="/static/image/bz3.png"
                ></image>
              </picker>
            </view>
            <view class="machine-item" v-else>
              <image
                class="img"
                mode="aspectFit"
                src="/static/image/bz3.png"
              ></image>
            </view>
            <view class="num">{{ arry3.length }}</view>
          </view>
          <!-- </navigator> -->
          <view class="nobolexS">
            <view class="machine-item" v-if="arry4.length != 0">
              <picker
                @change="bindPickerChange4"
                :value="index"
                :range="arry4"
                :title="title"
              >
                <image
                  class="img"
                  mode="aspectFit"
                  src="/static/image/bz4.png"
                ></image>
              </picker>
            </view>
            <view class="machine-item" v-else>
              <image
                class="img"
                mode="aspectFit"
                src="/static/image/bz4.png"
              ></image>
            </view>
            <view class="num">0</view>
          </view>

          <view class="nobolexS">
            <view class="machine-item" v-if="arry5.length != 0">
              <picker
                @change="bindPickerChange5"
                :value="index"
                :range="arry5"
                :title="title"
              >
                <image
                  class="img"
                  mode="aspectFit"
                  src="/static/image/bz5.png"
                ></image>
              </picker>
            </view>
            <view class="machine-item" v-else>
              <image
                class="img"
                mode="aspectFit"
                src="/static/image/bz5.png"
              ></image>
            </view>
            <view class="num">0</view>
          </view>
        </view>
      </view>

      <view
        class="kaoqingda"
        style="
          width: 100%;
          margin: 10rpx auto;
          position: relative;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          align-content: center;
          flex-direction: row;
        "
      >
        <image
          src="/static/image/dabj.png"
          style="width: 100%; height: 160rpx"
        ></image>
        <view style="position: absolute; width: 100%; top: 0; left: 30rpx">
          <view
            style="font-size: 32rpx; padding: 10rpx 0rpx"
            v-show="isSalary"
            @click="doSalary"
            >考勤打卡
          </view>

          <view
            style="font-size: 32rpx; padding: 10rpx 0rpx"
            v-show="!isSalary"
            @click="joinSalary"
            >加入考勤组
          </view>

          <view style="font-size: 25rpx; color: #555555"
            >当前为上下班打卡模式</view
          >
          <view
            style="
              font-size: 25rpx;
              color: #555555;
              display: flex;
              display: -webkit-flex;
              flex-wrap: nowrap;
              align-items: center;
              align-content: center;
            "
            ><image
              src="../../static/image/dwya.png"
              style="width: 40rpx; height: 40rpx"
            ></image
            >{{ address }}</view
          >
        </view>
      </view>

      <navigator
        url="/pages/personnel/index"
        style="
          background: #ffffff;
          border-top-left-radius: 5rpx;
          border-top-right-radius: 5rpx;
        "
      >
        <view class="navbox">
          <view class="waibox">
            <image
              class="renimg"
              style="width: 30rpx; height: 30rpx"
              src="/static/image/renyuanguanli.png"
            ></image>
            <text class="textlbv" style="font-size: 28rpx; color: #555555"
              >子账户管理</text
            >
          </view>
          <image
            class="rightbosl"
            src="../../static/image/right@2x.png"
          ></image>
        </view>
      </navigator>

      <navigator
        url="/pages/question_list/index"
        style="border-top: 1rpx solid #f3f3f3; background: #ffffff"
      >
        <view class="navbox">
          <view class="waibox">
            <image
              class="renimg"
              style="width: 30rpx; height: 30rpx"
              src="../../static/image/guanyuwomen.png"
            ></image>
            <text class="textlbv" style="font-size: 28rpx; color: #555555"
              >关于我们</text
            >
          </view>
          <image
            class="rightbosl"
            src="../../static/image/right@2x.png"
          ></image>
        </view>
      </navigator>

      <navigator
        url="setup"
        style="border-top: 1rpx solid #f3f3f3; background: #ffffff"
      >
        <view class="navbox">
          <view class="waibox">
            <image
              class="renimg"
              style="width: 30rpx; height: 30rpx"
              src="/static/image/shezhi.png"
            ></image>
            <text class="textlbv" style="font-size: 28rpx; color: #555555"
              >账户设置</text
            >
          </view>
          <image
            class="rightbosl"
            src="../../static/image/right@2x.png"
          ></image>
        </view>
      </navigator>
      <navigator
        url="/pages/salary/list"
        style="border-top: 1rpx solid #f3f3f3; background: #ffffff"
      >
        <view class="navbox">
          <view class="waibox">
            <image
              class="renimg"
              style="width: 30rpx; height: 30rpx"
              src="../../static/image/kaoqinguanli.png"
            ></image>
            <text class="textlbv" style="font-size: 28rpx; color: #555555"
              >考勤管理</text
            >
          </view>
          <image
            class="rightbosl"
            src="../../static/image/right@2x.png"
          ></image>
        </view>
      </navigator>

      <navigator
        url="/pages/question/index"
        style="border-top: 1rpx solid #f3f3f3; background: #ffffff"
      >
        <view class="navbox">
          <view class="waibox">
            <image
              class="renimg"
              style="width: 30rpx; height: 30rpx"
              src="/static/image/changjianwenti.png"
            ></image>
            <text class="textlbv" style="font-size: 28rpx; color: #555555"
              >常见问题</text
            >
          </view>
          <image
            class="rightbosl"
            src="../../static/image/right@2x.png"
          ></image>
        </view>
      </navigator>

      <navigator
        @click="fuichu"
        style="
          border-top: 1rpx solid #f3f3f3;
          background: #ffffff;
          border-bottom-left-radius: 5rpx;
          border-bottom-right-radius: 5rpx;
        "
      >
        <view class="navbox">
          <view class="waibox" style="width: 100%">
            <text
              class="textlbv"
              style="text-align: center; width: 700rpx; color: #ff4564"
              >退出登录</text
            >
          </view>
        </view>
      </navigator>
      <view
        style="width: 700rpx; background-color: rgba(0, 0, 0, 0); height: 40rpx"
      ></view>
    </view>

    <div
      class="nav-bar-two"
      style="z-index: 1000; position: fixed; bottom: 0; height: 120rpx"
    >
      <div class="nav-bar-item" @click="navTo('/pages/index/index')">
        <image
          class="nav-bar-item-icon"
          src="../../static/image/home@3x.png"
        ></image>
        <text class="nav-bar-item-text" style="font-size: 23rpx">首页</text>
      </div>
      <div class="nav-bar-item" @click="navTo('/pages/store/index')">
        <image
          class="nav-bar-item-icon"
          src="../../static/image/store@3x.png"
        ></image>
        <text class="nav-bar-item-text" style="font-size: 23rpx">商城</text>
      </div>
      <div class="nav-bar-item" @click="navTo('/pages/me/index')">
        <image
          class="nav-bar-item-icon"
          src="../../static/image/s_me@3x.png"
        ></image>
        <text class="nav-bar-item-text" style="font-size: 23rpx">我的</text>
      </div>
    </div>
  </view>
</template>

<script>
import uniList from "@/components/uni-list/uni-list.vue";
import uniListItem from "@/components/uni-list-item/uni-list-item.vue";
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import common from "common.js";
import AMapWXfile from "@/plugins/amap-wx.js";
var myAmapFun = new AMapWXfile.AMapWX({
  key: "9751ba7066e405d0f351b49dcc8b9704",
});
var _this;
export default {
  components: {
    uniList,
    uniListItem,
    uniIcons,
    uniNavBar,
  },
  data() {
    return {
      shebei: 0,
      scrollTop: "",
      label: "",
      imgurl: require("../../static/image/saoma.png"),
      mobile: "",
      nickName: "",
      fansinfo: [],
      isSalary: false,
      salaryId: 0,
      watch_count: 0,
      job_count: 0,
      wihe: "",
      array: ["中国", "美国", "巴西", "日本"],
      index: 0,
      shujubox: {},
      arry1: [],
      arry2: [],
      arry3: [],
      arry4: [],
      arry5: [],
      title: "请选择设备",
      address: "",
    };
  },
  updated() {
    this.getMemberInfo();
  },
  onLoad() {
    var _this = this;
    this.getMemberInfo();
    common.request("Member/fansinfo", {}, function (res) {
      _this.fansinfo = res.data.info;
      _this.mobile = res.data.info.mobile;
      _this.nickName =
        res.data.info.nick_name == null ? "" : res.data.info.nick_name;
      _this.imgurl =
        res.data.info.head_path == null
          ? "/static/image/head_none@2x.png"
          : res.data.info.head_path;
    });
    common.request(
      "car/bind_fetch",
      {
        token: uni.getStorageSync("token"),
      },
      function (res) {
        console.log(res);
      }
    );
    // car/bind_fetch
    common.request(
      "machine/get_mahcine_list",
      {
        token: uni.getStorageSync("token"),
      },
      function (res) {
        // car_bd
        console.log(res);
        var xhbox = res.data.info;
        _this.shujubox = xhbox;
        for (var i in xhbox) {
          console.log(xhbox[i].length);
          var kong = [];
          if (xhbox[i].length != 0) {
            console.log(i);
            for (var x = 0; x < xhbox[i].length; x++) {
              console.log(xhbox[i][x].alias);
              kong.push(xhbox[i][x].alias);
            }
            if (i == 1) {
              _this.arry1 = kong;
            } else if (i == 2) {
              _this.arry2 = kong;
            } else if (i == 3) {
              _this.arry3 = kong;
            } else if (i == 4) {
              _this.arry4 = kong;
            } else if (i == 5) {
              _this.arry5 = kong;
            }
          } else {
            if (i == 1) {
              _this.arry1 = kong;
            } else if (i == 2) {
              _this.arry2 = kong;
            } else if (i == 3) {
              _this.arry3 = kong;
            } else if (i == 4) {
              _this.arry4 = kong;
            } else if (i == 5) {
              _this.arry5 = kong;
            }
          }
        }
      }
    );
  },
  onShow() {
    this.getMemberInfo();
    this.getMachineCount();
    var _this = this;
    uni.getSystemInfo({
      success: function (res) {
        _this.wihe = res.windowHeight - 100;
        console.log(res.windowHeight);
      },
    });
  },
  mounted() {
    _this = this;
    myAmapFun.getRegeo({
      success: function (data) {
        _this.address = data[0].name;
      },
      fail: function (info) {
        //失败回调
        console.log(info);
      },
    });
  },
  methods: {
    daohang() {
      uni.navigateTo({
        url: "/pages/car_bd/car_bd",
      });
    },
    bindPickerChange1(e) {
      var index = e.target.value;
      var arrx = _this.arry1;
      var xz = _this.shujubox;
      for (var i in xz) {
        if (i == 1) {
          console.log(xz[i][index].deviceid);
          uni.navigateTo({
            url: "/pages/localtion/index?deviceid=" + xz[i][index].deviceid,
          });
        }
      }
    },
    bindPickerChange2(e) {
      var index = e.target.value;
      var index = e.target.value;
      var arrx = _this.arry1;
      var xz = _this.shujubox;
      for (var i in xz) {
        if (i == 2) {
          console.log(xz[i][index].deviceid);
          uni.navigateTo({
            url: "/pages/localtion/index?deviceid=" + xz[i][index].deviceid,
          });
        }
      }
    },
    bindPickerChange3(e) {
      var index = e.target.value;
      var index = e.target.value;
      var arrx = _this.arry1;
      var xz = _this.shujubox;
      for (var i in xz) {
        if (i == 3) {
          console.log(xz[i][index].deviceid);
          uni.navigateTo({
            url: "/pages/localtion_car/index?deviceid=" + xz[i][index].deviceid,
          });
        }
      }
    },
    bindPickerChange4(e) {
      var index = e.target.value;
      var index = e.target.value;
      var arrx = _this.arry1;
      var xz = _this.shujubox;
      for (var i in xz) {
        if (i == 4) {
          console.log(xz[i][index].deviceid);
          uni.navigateTo({
            url: "/pages/localtion/index?deviceid=" + xz[i][index].deviceid,
          });
        }
      }
    },
    bindPickerChange5(e) {
      var index = e.target.value;
      var index = e.target.value;
      var arrx = _this.arry1;
      var xz = _this.shujubox;
      for (var i in xz) {
        if (i == 5) {
          console.log(xz[i][index].deviceid);
          uni.navigateTo({
            url: "/pages/localtion/index?deviceid=" + xz[i][index].deviceid,
          });
        }
      }
    },
    mechineList() {
      uni.navigateTo({
        url: "/pages/machine/list",
      });
    },
    chooseHead() {
      var _this = this;
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ["compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], //从相册选择
        success: function (res) {
          console.info(res.tempFiles[0].path);
          // "tempFiles": [{
          // 	"path": "_doc/uniapp_temp_1591584826430/compressed/1591584838352.jpg",
          // 	"size": 254221
          // }]
          // console.log(JSON.stringify(res.tempFilePaths));
          let path = res.tempFilePaths[0];
          // 压缩图片
          plus.zip.compressImage(
            {
              src: path,
              dst: path,
              overwrite: true,
              quality: 20,
              width: "780px",
              height: "1040px",
              format: "jpg",
            },
            function (res) {
              console.log("图片压缩完成");
              let imgPathUrl = res.target;
              let imgPathSize = res.size;
              console.log("图片链接：" + imgPathUrl);
              console.log("图片尺寸：" + imgPathSize);
              // 文件系统中的读取文件对象，用于获取文件的内容
              uni.showLoading({
                title: "图片转换中。。。",
              });
              let reader = new plus.io.FileReader();
              // 文件读取操作完成时的回调函数
              reader.onloadend = (fileData) => {
                uni.hideLoading();
                console.log("文件读取完成！");
                let speech = fileData.target.result; //base64图片
                // console.log(speech)
                _this.myUpload(speech);
                // 去除base64文件头
                // let imgData = speech.replace(/^data:image\/\w+;base64,/, "");
              };
              reader.readAsDataURL(res.target);
            },
            function (error) {
              console.log("Compress error!", error);
              return;
            }
          );
        },
      });
    },
    //上传返回图片
    myUpload(rsp) {
      const self = this;
      // console.log(rsp)
      // self.imgurl = rsp.path; //更新头像方式一
      common.request(
        "Member/uploadimg",
        {
          head_path: rsp,
        },
        function (res) {
          console.log(res);
          if (res.data.status == 1) {
            self.imgurl = res.data.info;
          } else {
            uni.showToast({
              icon: "none",
              position: "center",
              title: res.data.info,
            });
          }
        }
      );
    },
    // question
    fuichu() {
      var token = uni.getStorageSync("token");
      var deviceid = uni.getStorageSync("deviceid");
      uni.setStorage({
        key: "token",
        data: "",
        success: function () {
          console.log("success");
        },
      });
      uni.setStorage({
        key: "deviceid",
        data: "",
        success: function () {
          console.log("success");
        },
      });
      // uni.switchTab
      uni.reLaunch({
        url: "/pages/login/login",
      });
    },
    // 扫描设备
    scanDevice() {
      uni.showActionSheet({
        itemList: ["绑定已有设备", "绑定新设备", "绑定汽车"],
        success: function (res) {
          console.log("扫一扫时间", res);
          if (res.tapIndex == 0) {
            // uni.navigateTo({
            //   url: "/pages/machine/bind?deviceid=" + "353520180332244",
            // });
            uni.scanCode({
              success: function (res) {
                console.log("扫码====", res);
                uni.navigateTo({
                  url: "/pages/machine/bind?deviceid=" + res.result,
                });
              },
            });
          } else if (res.tapIndex == 1) {
            uni.scanCode({
              success: function (res) {
                console.log("扫码====", res);
                uni.navigateTo({
                  url: "/pages/machine/bind?deviceid=" + res.result,
                });
              },
            });
            // uni.navigateTo({
            // 	url:"/pages/machine/bind"
            // })
          } else {
            uni.scanCode({
              success: function (res) {
                console.log("扫码====", res);
                uni.navigateTo({
                  url: "/pages/car_bd/car_bd?deviceid=" + res.result,
                });
              },
            });
            // uni.navigateTo({
            // 	url:"/pages/car_bd/car_bd"
            // })
          }
        },
        fail: function (res) {
          console.log(res.errMsg);
        },
      });
    },
    // goWatch(e) {
    // 	var x = 'arry'+e
    // 	console.log(_this.x)
    // },
    navTo(url) {
      uni.reLaunch({
        url: url,
      });
    },

    getMemberInfo() {
      var _this = this;
      common.request("Member/fansinfo", {}, function (res) {
        _this.fansinfo = res.data.info;
        _this.mobile = res.data.info.mobile;
        _this.nickName =
          res.data.info.nick_name == null ? "" : res.data.info.nick_name;
        _this.imgurl =
          res.data.info.head_path == null
            ? "/static/image/head_none@2x.png"
            : res.data.info.head_path;
        if (res.data.info.salary) {
          _this.isSalary = true;
          _this.salaryId = res.data.info.salary.sal_id;
        } else {
          _this.isSalary = false;
        }
      });
    },

    getMachineCount() {
      var _this = this;
      common.request("Member/machinecount", {}, function (res) {
        _this.shebei =
          Number(res.data.info.watch_count) + Number(res.data.info.job_count);
        _this.watch_count = res.data.info.watch_count;
        _this.job_count = res.data.info.job_count;
      });
    },

    getScroll(event) {
      this.scrollTop = event.target.scrollTop;
    },
    joinSalary() {
      // uni.scanCode({
      // 	success:function(res){
      // 		console.log("扫码====kaoqin",res)
      // 		uni.navigateTo({
      // 			url: '/pages/salary/joinSalary?id=' + res.result
      // 		});
      // 	}
      // });
      uni.navigateTo({
        url: "/pages/salary/joinSalary?id=" + 181,
      });
    },
    doSalary() {
      uni.navigateTo({
        url: "/pages/salary/home?id=" + _this.salaryId,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.neiimg {
  position: absolute;
  width: 100%;
  height: 110%;
  z-index: 0;
  top: 0;
}
.textlbv {
  font-weight: 400;
  font-size: 20rpx;
}
.navbox {
  display: flex;
  display: -webkit-flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  border-bottom: 1px solid #f3f3f3;
  padding: 20rpx 0rpx;
  width: 95%;
  margin: 0rpx auto;
}
.waibox {
  margin-left: 20rpx;
  display: flex;
  display: -webkit-flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  align-content: center;
}
.rightbosl {
  width: 20rpx;
  height: 25rpx;
  margin-right: 20rpx;
}
.renimg {
  width: 40rpx;
  height: 40rpx;
  margin-right: 20rpx;
}
.textlbv {
  font-size: 30rpx;
}
.nav-bar-two {
  height: 100rpx;
  padding: 0 15rpx;
  padding-top: 10rpx;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  z-index: 9999;
  background-color: #fff;
  border-top-width: 1rpx;
  border-color: #eee;
  width: 750rpx;
  display: flex;
  display: -webkit-flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}
.rights {
  position: fixed;
  width: 120rpx;
  background-color: #ffffff;
}

@import "./css/index.css";
@import url("./css/main.less");
</style>
