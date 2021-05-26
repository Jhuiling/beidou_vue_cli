<template>
  <view>
    <view class="clock-btn">
      <view class="txt">{{ title }}</view>
      <view class="time">
        <image src="/static/image/crowd@3x.png" mode="scaleToFill"></image
        >{{ peopleNum }}
      </view>
    </view>
    <view class="detail-top">
      <image class="head-img" :src="src" mode="scaleToFill"></image>
      <view class="name">{{ nickName }}</view>
    </view>
    <button type="primary" @click="joinDo">确认加入</button>
  </view>
</template>

<script>
var _this;
import common from "common.js";
export default {
  components: {},
  data() {
    return {
      id: 0,
      src: "",
      nickName: "",
      title: "",
      peopleNum: 0,
    };
  },
  onLoad(e) {
    // 取得考勤组信息
    common.request(
      "Salary/joinSalary",
      {
        id: e.id,
      },
      function (res) {
        console.log(res, "=============");
        _this.id = res.data.info.id;
        _this.src = res.data.info.fans.head_path;
        _this.nickName = res.data.info.fans.nick_name;
        _this.title = res.data.info.title;
        _this.peopleNum = res.data.info.number;
      }
    );
  },
  onShow() {},
  onHide() {},
  onUnload() {},
  mounted() {
    _this = this;
  },
  methods: {
    joinDo() {
    //   uni.showModal({
    //     title: "提示",
    //     content: "这是一个模态弹窗",
    //     success: function (res) {
    //       if (res.confirm) {
    //         console.log("用户点击确定");
    //       } else if (res.cancel) {
    //         console.log("用户点击取消");
    //       }
    //     },
    //   });
      common.request(
        "Salary/joinDo",
        {
          id: _this.id,
        },
        function (res) {
          uni.showToast({
            icon: "none",
            position: "center",
            title: res.data.info,
          });
          if (res.data.status == 1) {
            uni.navigateBack();
          }
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.detail-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80rpx;

  .head-img {
    border-radius: 50%;
    width: 118rpx;
    height: 118rpx;
    margin: 32rpx 0 12rpx;
  }

  .name {
    line-height: 42rpx;
    color: #333;
    font-size: 24rpx;
  }
}

.clock-btn {
  // background: url('/static/image/kaoqin-btn_07.jpg') 0% 0% / contain no-repeat;
  background: #0f91ff;
  width: 240rpx;
  height: 240rpx;
  border-radius: 50%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  margin: 100rpx auto 80rpx;
}

.clock-btn image {
  width: 32rpx;
  height: 32rpx;
  margin-right: 10rpx;
}

.clock-btn .txt {
  font-size: 34rpx;
  line-height: 34rpx;
  color: #fff;
}

.clock-btn .time {
  font-size: 28rpx;
  line-height: 28rpx;
  color: #fff7f7;
  margin-top: 20rpx;
}

button {
  width: 600rpx;
  margin-top: 30rpx;
  border-radius: 50rpx;
}
</style>
