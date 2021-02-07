<template>
  <view>
    <uni-nav-bar
      left-icon="back"
      :fixed="true"
      :status-bar="true"
      title="设备绑定"
      @clickLeft="goBack"
    ></uni-nav-bar>
    <view class="page">
      <view class="device">
        <view class="info">
          <view class="logo">
            <image
              :src="
                urlbtx
                  ? '../../static/image/weatch@2x.png'
                  : '../../static/image/shebei4.png'
              "
            ></image>
          </view>
          <view v-if="alias">{{ alias }}</view>
          <view v-else>设备名称</view>
          <view class="subtitle" v-if="deviceid">IMEI：{{ deviceid }}</view>
          <view class="subtitle" v-else>IMEI(设备型号)</view>
        </view>
        <view class="item">
          <text class="title">设备昵称</text>
          <view class="subtitle">
            <input
              class="uni-input"
              v-model="alias"
              type="text"
              placeholder="请输入昵称"
            />
          </view>
        </view>
        <view class="item">
          <text class="title">设备号</text>
          <view class="subtitle">
            <input
              class="uni-input"
              v-model="deviceid"
              type="number"
              placeholder="请输入设备号"
              maxlength="16"
            />
          </view>
        </view>
        <view class="item use-people">
          <view class="title">选择设备图标</view>
          <view class="use-list">
            <view class="renbox" v-for="(item, index) in imgList" :key="index">
              <image
                :src="
                  use_user == item.img
                    ? `../../static/image/b_${item.img}.png`
                    : `../../static/image/sb_${item.img}.png`
                "
                @click="aliassss(item.img)"
              ></image>
              <text class="rentext">{{ item.name }}</text>
            </view>
            <!-- <view class="renbox">
							<image :src="use_user==2?'../../static/image/people_b@3x.png':'../../static/image/people_sb@3x.png'" @click="aliassss(2)"></image>
							<text class="rentext">女人</text>
						</view>
						<view class="renbox">
							<image :src="use_user==3?'../../static/image/people_c@3x.png':'../../static/image/people_sc@3x.png'" @click="aliassss(3)"></image>
							<text class="rentext">女孩</text>
						</view>
						<view class="renbox">
							<image :src="use_user==4?'../../static/image/people_d@3x.png':'../../static/image/people_sd@3x.png'" @click="aliassss(4)"></image>
							<text class="rentext">男孩</text>
						</view>
						<view class="renbox">
							<image :src="use_user==5?'../../static/image/people_e@3x.png':'../../static/image/people_se@3x.png'" @click="aliassss(5)"></image>
							<text class="rentext">老人</text>
						</view> -->
          </view>
        </view>

        <!-- <view class="item">
					<text class="title">设备二维码</text>
					<view class="arrow">
						<image src="../../static/image/right.png"></image>
					</view>
				</view> -->
        <!-- <view class="item">
			    <input class="title inputbox" placeholder="输入设备号" v-model="deviceid" />
				<view class="arrow">
				</view>
			</view> -->
      </view>
      <button type="default" class="btn" @tap="addwatch">绑定设备</button>
    </view>
  </view>
</template>
<script>
var _this;
import uniSection from "@/components/uni-section/uni-section.vue";
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import common from "common.js";
export default {
  components: {
    uniSection,
    uniIcons,
  },
  data() {
    return {
      showPay: false,
      wechatPay: false,
      alias: "",
      deviceid: "",
      use_user: 0,
      urlbtx: false,
      imgList: [
        {
          img: "0",
          name: "车充",
        },
        {
          img: "1",
          name: "工卡",
        },
        {
          img: "2",
          name: "狗",
        },
        {
          img: "3",
          name: "猫咪",
        },
        {
          img: "4",
          name: "摩托车",
        },
        {
          img: "5",
          name: "奶奶",
        },
        {
          img: "6",
          name: "爷爷",
        },
        {
          img: "7",
          name: "男孩",
        },
        {
          img: "8",
          name: "女孩",
        },
        {
          img: "9",
          name: "汽车",
        },
        {
          img: "10",
          name: "全部",
        },
        {
          img: "11",
          name: "手表1",
        },
        {
          img: "12",
          name: "手表2",
        },
      ],
    };
  },
  onLoad(e) {
    _this = this;
    this.get_icon();
    // console.log(e);
    if (e.deviceid) {
      _this.deviceid = e.deviceid;
      common.request(
        "machine/bind_fetch",
        {
          deviceid: e.deviceid,
        },
        function (res) {
          console.log(res);
          // console.log(res)
          // this.html = res.data;
          if (res.data.info.type) {
            _this.urlbtx = true;
          } else {
            _this.urlbtx = false;
          }
          // console.log(res.data.info.type)
        }
      );
    }
  },
  mounted() {},
  methods: {
    get_icon() {
      // machine/get_icon
      common.request(
        "machine/get_icon",
        {
          cat_id: "1",
        },
        function (res) {
          console.log(res);
        }
      );
    },
    aliassss(e) {
      _this.use_user = e;
    },
    initData() {
      common.request(
        "machine/bind_fetch",
        {
          deviceid: uni.getStorageSync("deviceid"),
        },
        function (res) {
          console.log(res);
        }
      );
    },
    addwatch() {
      if (_this.deviceid == "") {
        uni.showToast({
          title: "请输入设备号",
          duration: 2000,
          icon: "none",
        });
        return false;
      }
      if (_this.alias == "") {
        uni.showToast({
          title: "请输入昵称",
          duration: 2000,
          icon: "none",
        });
        return false;
      }
      if (_this.use_user == "") {
        uni.showToast({
          title: "请选择人群",
          duration: 2000,
          icon: "none",
        });
        return false;
      }
      console.log("设别绑定", _this.alias, _this.deviceid, _this.use_user);

      common.request(
        "machine/bind_machine",
        {
          alias: _this.alias,
          deviceid: _this.deviceid,
          use_user: _this.use_user,
        },
        function (res) {
          console.log("绑定设备", res);
          if (res.data.status == 1) {
            // if (res.data.info.type) {
            // 	_this.urlbtx = true
            // } else {
            // 	_this.urlbtx = false
            // }
            // console.log(res.data.info.type)
            uni.navigateTo({
              url: "/pages/index/index",
            });
          } else {
            // console.log(res)
            uni.showToast({
              title: res.data.info,
              duration: 2000,
              icon: "none",
            });
          }
        }
      );
    },
    goAdmin() {
      uni.navigateTo({
        url: "/pages/admin/index",
      });
    },
    goBack() {
      // uni.navigateBack({
      // 	data: 1
      // })
      uni.navigateTo({
        url: "/pages/me/index",
      });
    },
    // 设置微信
    setWechat() {
      _this.wechatPay = !_this.wechatPay;
    },
    switchChange(e) {
      _this.showPay = e.target.value;
    },
  },
};
</script>
<style lang="less" scoped>
.uni-transition {
  bottom: calc(var(--window-bottom) + 0);
}

.inputbox {
  height: 80rpx;
}

.bord {
  background: #26a2ff;
}

@import url("./css/bind.less");
</style>
