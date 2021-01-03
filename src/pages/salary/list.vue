<template>
  <view>
    <view class="detail-list" v-for="item in salaryList">
      <cmd-cell-item :title="item.title" slotRight :arrow="true">
        <navigator
          :url="'edit?id=' + item.id"
          style="dispaly: flex; align-items: center"
        >
          <image
            style="width: 30rpx; height: 30rpx; margin-right: 10rpx"
            src="/static/image/sets@3x.png"
          ></image>
          <text style="font-size: 28rpx; line-height: 35px">设置</text>
        </navigator>
        <navigator :url="'fansGroup?id=' + item.id">
          <image
            style="
              width: 30rpx;
              height: 30rpx;
              margin-left: 30rpx;
              margin-right: 10rpx;
            "
            src="/static/image/me_group@3x.png"
          ></image>
          <text style="font-size: 28rpx; line-height: 35px">{{
            item.number
          }}</text>
        </navigator>
        <!-- :url="'fansGroup?id=' + item.id" -->
        <view @click="deleSalary(item.id)">
          <image
            style="
              width: 30rpx;
              height: 30rpx;
              margin-left: 30rpx;
              margin-right: 10rpx;
            "
            src="/static/image/del.png"
          ></image>
          <text style="font-size: 28rpx; line-height: 35px">删除</text>
        </view>
        <navigator :url="'/pages/salary/salaryQrCode?id=' + item.id">
          <image
            style="
              width: 30rpx;
              height: 30rpx;
              margin-left: 30rpx;
              margin-right: 10rpx;
            "
            src="/static/image/fen.png"
          ></image>
          <text style="font-size: 28rpx; line-height: 35px">邀请</text>
        </navigator>
      </cmd-cell-item>
    </view>
  </view>
</template>

<script>
var _this = this;
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import cmdCellItem from "@/components/cmd-cell-item/cmd-cell-item.vue";
import common from "common.js";
export default {
  components: {
    uniNavBar,
    cmdCellItem,
  },
  data() {
    return {
      salaryList: [],
    };
  },
  onShow() {
    this.get_salary_list();
  },
  onLoad() {},
  onNavigationBarButtonTap() {
    uni.navigateTo({
      url: "create",
    });
  },

  mounted() {
    _this = this;
  },
  methods: {
    deleSalary(id) {
      let _this = that;
      uni.showModal({
        title: "提示",
        content: "确定删除该考勤组",
        success: function (res) {
          if (res.confirm) {
            console.log("用户点击确定");
            common.request("salary/delSalary", { id: id }, function (res) {
              console.log(res);
              if (res.data.status == 1) {
                _this.get_salary_list();
                uni.showToast({
                  icon: "none",
                  position: "center",
                  title: res.data.info,
                });
              } else {
                uni.showToast({
                  icon: "none",
                  position: "center",
                  title: res.data.info,
                });
              }
            });
          } else if (res.cancel) {
            // console.log("用户点击取消");
          }
        },
      });
    },
    get_salary_list() {
      common.request("Salary/salarylist", {}, function (res) {
        console.log(res);
        if (res.data.status == 1) {
          _this.salaryList = res.data.info;
        } else {
          _this.salaryList = [];
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
