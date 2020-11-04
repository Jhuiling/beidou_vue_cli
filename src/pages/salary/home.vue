<template>
  <view>
    <view class="top-txt">
      <view class="left">{{ date }}</view>
      <view class="right">
        {{ title }} ·
        <text class="link-txt" @click="jumpRule" style="margin-right: 30rpx"
          >考勤规则</text
        >
      </view>
    </view>
    <view class="time-list">
      <block v-timeLog="timeLog" v-for="item in timeLog">
        <view class="list">
          <view class="time-txt" :class="item.s_status ? 'c2' : 'c1'"
            >上班时间：{{ item.s_time }}</view
          >
          <block v-if="wqList[item.id]">
            <view class="time-row">
              <view class="txt">外勤打卡 {{ wqList[item.id].time }}</view>
            </view>
            <view class="time-txt">{{ wqList[item.id].address }}</view>
          </block>
          <block v-else>
            <view class="time-row" v-if="item.s_status">
              <view class="txt">打卡时间 {{ item.s_d_time }}</view>
              <view class="tag tag-wq" v-if="item.s_status == 1">正常</view>
              <view class="tag tag-cd" v-if="item.s_status == 2">迟到</view>
              <view class="tag tag-cd" v-if="item.s_status == 3">漏卡</view>
              <view class="tag tag-cd" v-if="item.s_status == 4">旷工</view>
            </view>
            <view class="time-txt">{{ item.s_address }}</view>
          </block>
        </view>
        <view class="list">
          <view class="time-txt" :class="item.e_status ? 'c2' : 'c1'"
            >下班时间：{{ item.e_time }}</view
          >
          <block v-if="!wqList[item.id]">
            <view class="time-row" v-if="item.e_status">
              <view class="txt">打卡时间 {{ item.e_d_time }}</view>
              <view class="tag tag-wq" v-if="item.e_status == 1">正常</view>
              <view class="tag tag-cd" v-if="item.e_status == 2">早退</view>
              <view class="tag tag-cd" v-if="item.e_status == 3">漏卡</view>
              <view class="tag tag-cd" v-if="item.e_status == 4">旷工</view>
            </view>
            <view class="time-txt">{{ item.e_address }}</view>
          </block>
        </view>
      </block>
      <view class="list" v-if="fjbInfo">
        <view class="time-txt" :class="fjbInfo.status == 2 ? 'c2' : 'c1'"
          >加班时间：{{ fjbInfo.s_time }}</view
        >
        <view class="time-row">
          <view class="txt">开始时间 {{ fjbInfo.d_time }}</view>
          <view class="txt" v-if="fjbInfo.status == 2"
            >~结束时间 {{ fjbInfo.f_time }}</view
          >
        </view>
        <view class="time-txt">{{ fjbInfo.address }}</view>
      </view>

      <!-- <view class="list">
				<view class="time-txt c1">{{type.class==1?'上班时间':'下班时间'}}：{{type.time}}</view>
			</view> -->
    </view>
    <view class="clock-wrap" v-if="type">
      <view @click="doSalary" class="clock-btn" style="position: relative">
        <image
          :src="bgurls[0].img"
          style="position: absolute; width: 100%; height: 100%; z-index: 5"
          v-if="type.class == 1 || type.class == 2"
        ></image>
        <image
          :src="bgurls[2].img"
          style="position: absolute; width: 100%; height: 100%; z-index: 5"
          v-else
        ></image>
        <view class="txt" style="position: relative; z-index: 10">{{
          type.name
        }}</view>
        <view class="time" style="position: relative; z-index: 10">{{
          timeStr
        }}</view>
      </view>

      <view class="btm-text">
        <view class="p1" style="color: #ffa75e" v-if="isInSalary == false">
          未进入考勤范围
        </view>
        <view class="p1" v-else> 已进入考勤范围 </view>
        <view class="p1">
          {{ address }}
        </view>
        <view class="re-ads" @click="chongxdw">重新定位</view>
      </view>
    </view>
    <block v-if="type">
      <button
        class="out-btn"
        v-if="type.class == 1 || type.class == 2"
        @click="wqdkOpen"
      >
        外勤打卡
      </button>
    </block>
    <block v-if="overtime == 1 && overTime">
      <view class="tj-txt">加班时间：{{ overTime.s_time }}</view>
      <view class="tj-txt">结束加班时间：{{ overTime.end_time }}</view>
    </block>

    <uni-popup ref="popup" type="bottom" :animation="true">
      <view class="create-wrap">
        <view class="tit"
          >上班时间: <view style="width: 500rpx">{{ s_time }}</view>
        </view>
        <!-- @click="salaryInfo" -->
        <view class="tit"
          >打卡地点:
          <view style="width: 500rpx"
            >{{ address
            }}<view @click="chongxdw" class="re-ads">重新定位</view></view
          >
        </view>
        <view class="tit"
          >添加图片:
          <view class="item-box">
            <view class="item" v-for="(img, key) in choseImages">
              <image mode="aspectFill" :src="img"></image>
              <text class="del" @click="delImg(key)">X</text>
            </view>
            <image
              @click="choseimg"
              mode="aspectFill"
              src="/static/image/morephoto@3x.png"
            ></image>
          </view>
        </view>
        <view class="tit">备注说明: <textarea v-model="note" /></view>
        <button type="primary" @click="egress">确认</button>
      </view>
    </uni-popup>
    <view style="height: 20px"></view>
    <view class="out_btn" @click="goOut()">退出考勤组</view>
  </view>
</template>

<script>
let bgImg = [
  {
    img: "/static/image/kaoqin-btn_03.jpg",
    shadowColor: "255,255,255,.25",
  },
  {
    img: "/static/image/kaoqin-btn_05.jpg",
    shadowColor: "255,168,0,.25",
  },
  {
    img: "/static/image/kaoqin-btn_07.jpg",
    shadowColor: "14,132,255,.25",
  },
];
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import common from "common.js";
import AMapWXfile from "@/plugins/amap-wx.js";
var myAmapFun = new AMapWXfile.AMapWX({
  key: "9751ba7066e405d0f351b49dcc8b9704",
});
var _this;
var timeInterval;
export default {
  components: {
    uniPopup,
    uniNavBar,
  },
  data() {
    return {
      clockImg: {
        0: require("static/image/kaoqin-btn_03.jpg"),
        1: require("static/image/kaoqin-btn_07.jpg"),
        2: require("static/image/kaoqin-btn_05.jpg"),
      },
      date: "",
      title: "",
      address: "",
      note: "",
      isInSalary: false,
      time: "",
      timeLog: [],
      s_time: "",
      timeStr: "",
      type: [],
      overtime: 0,
      overTime: [],
      nowTime: 0,
      choseImages: [],
      flList: [],
      fjbInfo: [],
      wqList: [],
      bgurls: bgImg,
      id: "",
    };
  },
  onLoad(e) {
    this.id = e.id;
  },
  onShow() {
    this.salaryInfo();
  },
  onUnload() {},
  mounted() {
    _this = this;
  },
  methods: {
    goOut() {
      common.request(
        "salary/quitSalary",
        {
          id: this.id,
        },
        function (res) {
          uni.showToast({
            title: "成功",
            duration: 1000,
          });
          setTimeout(function () {
            uni.navigateBack();
          }, 2000);
        }
      );
    },
    chongxdw() {
      uni.getLocation({
        type: "wgs84",
        geocode: true,
        success: function (res) {
          console.log(res);
          uni.showToast({
            title: "成功",
            duration: 1000,
          });
          _this.address =
            res.address.district + res.address.street + res.address.poiName;
        },
        fail: function (res) {
          uni.showToast({
            icon: "none",
            position: "center",
            title: "请开启软件定位权限",
          });
        },
      });
      // uni.getLocation({
      // 	type: 'wgs84',
      // 	success: function(res) {
      // 		console.log(res)
      // 		console.log('当前位置的经度：' + res.longitude);
      // 		console.log('当前位置的纬度：' + res.latitude);
      // 	},
      // 	fail: function(res) {
      // 		uni.showToast({
      // 			icon: 'none',
      // 			position: 'center',
      // 			title: '请开启软件定位权限'
      // 		});
      // 	}
      // });
    },
    salaryInfo() {
      common.request("Salary_Fans/salaryInfo", {}, function (res) {
        if (res.data.status == 0) {
          uni.showToast({
            icon: "none",
            position: "center",
            title: res.data.info,
          });
          setTimeout(function () {
            uni.navigateBack();
          }, 2000);
        }
        _this.timeLog = res.data.info.timeLog;
        _this.date = res.data.info.date;
        _this.title = res.data.info.title;
        _this.time = res.data.info.dateTime;
        _this.type = res.data.info.type;
        _this.nowTime = res.data.info.nowTime;
        _this.fjbInfo = res.data.info.fjbInfo;
        _this.wqList = res.data.info.wqList;
        _this.s_time = res.data.info.s_time;
        _this.overtime = res.data.info.overtime;
        if (res.data.info.overtime) {
          _this.overTime = res.data.info.overTimeArr;
        }
        clearInterval(timeInterval);
        timeInterval = setInterval(function () {
          _this.time += 1;
          if (_this.time >= _this.nowTime) {
            _this.salaryInfo();
          }
          _this.timeStr = common.formatDate(_this.time, "hh:mm:ss");
        }, 1000);
        _this.GetDistance(
          res.data.info.lat,
          res.data.info.lng,
          res.data.info.scope
        );
      });
    },
    doSalary() {
      if (this.isInSalary) {
        if (this.type.class == 1 || this.type.class == 2) {
          var url = "Salary_Fans/doSalary";
        } else {
          var url = "Salary_Fans/doJbSalary";
        }
        common.request(
          url,
          {
            address: this.address,
            class: this.type.class,
            time_id: this.type.time_id,
          },
          function (res) {
            if (res.data.status == 1) {
              uni.showToast({
                icon: "none",
                position: "center",
                title: res.data.info,
              });
              setTimeout(function () {
                uni.navigateBack();
              }, 2000);
            } else {
              uni.showToast({
                icon: "none",
                position: "center",
                title: res.data.info,
              });
            }
          }
        );
      } else {
        uni.showToast({
          icon: "none",
          position: "center",
          title: "未到达打卡范围",
        });
      }
    },
    GetDistance(lat1, lng1, scope) {
      // var res = {};
      // res.longitude = '118.20127';
      // res.latitude = '39.62429';
      // res.address = '河北省唐山市路南区仁泰里712号';

      // _this.address = res.address;
      // var radLat1 = _this.Rad(lat1);
      // var radLat2 = _this.Rad(res.latitude);
      // var a = radLat1 - radLat2;
      // var b = _this.Rad(lng1) - _this.Rad(res.longitude);
      // var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
      // 	Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
      // s = s * 6378.137; // EARTH_RADIUS;
      // s = Math.round(s * 10000) / 10; //输出为公里
      // console.log(scope)
      // if (s < scope) {
      // 	_this.isInSalary = true;
      // }
      // return;
      uni.getLocation({
        type: "wgs84",
        success: function (res) {
          console.log(res);
          console.log("当前位置的经度：" + res.longitude);
          console.log("当前位置的纬度：" + res.latitude);
          myAmapFun.getRegeo({
            success: function (data) {
              _this.address = data[0].name;
            },
            fail: function (info) {
              //失败回调
              console.log(info);
            },
          });
          var radLat1 = _this.Rad(lat1);
          var radLat2 = _this.Rad(res.latitude);
          var a = radLat1 - radLat2;
          var b = _this.Rad(lng1) - _this.Rad(res.longitude);
          var s =
            2 *
            Math.asin(
              Math.sqrt(
                Math.pow(Math.sin(a / 2), 2) +
                  Math.cos(radLat1) *
                    Math.cos(radLat2) *
                    Math.pow(Math.sin(b / 2), 2)
              )
            );
          s = s * 6378.137; // EARTH_RADIUS;
          s = Math.round(s * 10000) / 10; //输出为公里
          console.log(s);
          //s=s.toFixed(4);
          // return s;
          if (s < scope) {
            _this.isInSalary = true;
            _this.address = res.address;
          }
        },
        fail: function (res) {
          uni.showToast({
            icon: "none",
            position: "center",
            title: "请开启软件定位权限",
          });
        },
      });
    },
    Rad(d) {
      return (d * Math.PI) / 180.0; //经纬度转换成三角函数中度分表形式。
    },
    wqdkOpen() {
      this.$refs.popup.open();
    },
    choseimg() {
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ["original"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["camera"], //从相册选择
        success: (chooseImageRes) => {
          const tempFilePaths = chooseImageRes.tempFilePaths[0];
          uni.uploadFile({
            url: common.url("Uploads/upload"), //仅为示例，非真实的接口地址
            filePath: tempFilePaths,
            name: "imgFile",
            formData: {
              token: uni.getStorageSync("token"),
            },
            success: (uploadFileRes) => {
              var res = JSON.parse(uploadFileRes.data);
              if (res.error == 0) {
                _this.choseImages.push(res.url);
              } else {
                uni.showToast({
                  icon: "none",
                  position: "center",
                  title: res.message,
                });
              }
            },
          });
        },
      });
    },
    delImg(key) {
      this.choseImages.splice(key, 1);
    },
    jumpRule() {
      uni.navigateTo({
        url: "/pages/salary/rule",
      });
    },
    egress() {
      common.request(
        "Salary_Fans/egress",
        {
          address: this.address,
          note: this.note,
          choseImages: this.choseImages,
          time_id: this.type.time_id,
        },
        function (res) {
          if (res.data.status == 1) {
            uni.showToast({
              icon: "none",
              position: "center",
              title: res.data.info,
            });
            setTimeout(function () {
              uni.navigateBack();
            }, 2000);
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
    onNavigationBarButtonTap() {
      uni.navigateTo({
        url: "salaryRecord",
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./css/home.less");
.out_btn {
  height: 50px;
  width: 100%;
  background: #2694df;
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}
</style>
