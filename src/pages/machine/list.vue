<template>
  <view id="devicelist">
    <view class="type-wrap">
      <view class="item" :style="ys == 0 ? 'color:#ff4564' : 'color:#555555'">
        <view class="s-tit" @click="handleTap(0)">所有设备</view>
        <uni-icons type="arrowdown" size="16" color="#999" @click="open(1)" />
      </view>
      <view class="item" :style="ys == 1 ? 'color:#ff4564' : 'color:#555555'">
        <view class="s-tit" @click="handleTap(1)">所有类型</view>
        <uni-icons type="arrowdown" size="16" color="#999" @click="open(2)" />
      </view>
      <view class="item" :style="ys == 2 ? 'color:#ff4564' : 'color:#555555'">
        <view class="s-tit" @click="handleTap(2)">在线状态</view>
        <uni-icons type="arrowdown" size="16" color="#999" @click="open(3)" />
      </view>
      <!-- 筛选框 -->
      <uni-popup ref="popup" type="top">
        <view class="uni_title">{{ unitName }}</view>
        <view class="uni-list">
          <view class="uni-list_box">
            <view
              class="uni-list_item"
              @click="select(-1)"
              :style="isShowSelect == -1 ? 'color:#ff4564' : 'color:#555555'"
              >全部</view
            >
            <view
              @click="select(index, { deviceid: item.deviceid }, 0)"
              :style="isShowSelect == index ? 'color:#ff4564' : 'color:#555555'"
              v-show="unitName == '所有设备'"
              v-for="(item, index) in filtrate.machine"
              :key="index+'-'"
              class="uni-list_item"
              >{{ item.alias }}</view
            >
            <view
              :style="isShowSelect == index ? 'color:#ff4564' : 'color:#555555'"
              @click="select(index, { type: index }, 1)"
              v-show="unitName == '所有类型'"
              v-for="(item, index) in filtrate.type"
              :key="index+'.'"
              class="uni-list_item"
              >{{ item }}</view
            >
            <view
              :style="isShowSelect == index ? 'color:#ff4564' : 'color:#555555'"
              @click="select(index, { online: index }, 2)"
              v-show="unitName == '在线状态'"
              v-for="(item, index) in filtrate.online"
              :key="index"
              class="uni-list_item"
              >{{ item }}</view
            >
            <!-- 
            -->
          </view>
        </view>
      </uni-popup>
    </view>
    <!-- <view class="selectBox_list" v-show="!isShowSelect">
				<view 
				class="selectBox_listLi" 
				v-for="(item, index) in dataList" 
				:key="index" 
				@click.stop="select(item, index)"
				>
				{{item.value}}
				</view>
		</view> -->

    <view class="list-wrap">
      <view class="list" v-for="(item, index) in list" :key="index">
        <view class="list-head">
          <view class="left">
            <image
              v-if="item.type == 1"
              src="/static/image/big_weatch@2x.png"
            ></image>
            <image
              v-if="item.type == 2"
              src="/static/image/big_workcard@2x.png"
            ></image>
            <view class="tit">{{ item.alias }}</view>
          </view>
          <view class="right">
            <view class="p-tit p">电量:</view>
            <view class="p-txt p">{{ item.machineInfo.batt }}%</view>
            <image class="p-tit-img" src="/static/image/g_single@2x.png">
            </image>
            <view class="p-txt p">{{
              item.is_online == 0 ? "离线" : "在线"
            }}</view>
          </view>
        </view>
        <view class="list-content">
          <view class="text-row">
            <text class="c-tit">时间:</text>
            <text class="c-txt">{{ item.update_time }}</text>
          </view>
          <view class="text-row">
            <text class="c-tit">地址:</text>
            <text class="c-txt">{{ item.machineInfo.address }}</text>
          </view>
        </view>

        <view class="list-foot">
          <view
            class="btn"
            @tap="goUrl('/pages/localtion/index', item.deviceid)"
          >
            <image
              src="/static/image/shebeiguanli_11.jpg"
              class="f-img"
            ></image>
            <view class="f-txt">定位</view>
          </view>
          <view
            class="btn"
            @tap="goUrl('/pages/trajectory/index', item.deviceid)"
          >
            <image
              src="/static/image/shebeiguanli_13.jpg"
              class="f-img"
            ></image>
            <view class="f-txt">轨迹</view>
          </view>
          <view class="btn" @tap="goUrl('/pages/alarm/index', item.deviceid)">
            <image
              src="/static/image/shebeiguanli_15.jpg"
              class="f-img"
            ></image>
            <view class="f-txt">警报</view>
          </view>
          <view
            class="btn"
            @tap="goUrl('/pages/setting/details', item.deviceid)"
          >
            <image
              src="/static/image/shebeiguanli_17.jpg"
              class="f-img"
            ></image>
            <view class="f-txt">详情</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
var _this;
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
// import uniPopupMessage from "@/components/uni-popup/uni-popup-message.vue";
// import uniPopupDialog from "@/components/uni-popup/uni-popup-dialog.vue";
import common from "common.js";
export default {
  components: {
    uniNavBar,
    uniPopup,
    // uniPopupMessage,
    // uniPopupDialog,
  },
  data() {
    return {
      list: [],
      value: "",
      label: "",
      ys: 0,
      packList: [
        {
          label: "选项一",
          value: "A",
        },
        {
          label: "选项二",
          value: "B",
        },
      ],
      isShowSelect: -1,
      unitName: "所有设备",
      filtrate: {
        machine: [],
        type: [],
        online: [],
      },
      items: [
        // {
        //   value: "USA",
        //   name: "美国",
        // },
        // {
        //   value: "CHN",
        //   name: "中国",
        //   checked: "true",
        // },
        // {
        //   value: "BRA",
        //   name: "巴西",
        // },
        // {
        //   value: "JPN",
        //   name: "日本",
        // },
        // {
        //   value: "ENG",
        //   name: "英国",
        // },
        // {
        //   value: "FRA",
        //   name: "法国",
        // },
      ],
    };
  },
  onLoad() {
    uni.showLoading({
      title: "加载中",
    });
  },
  mounted() {
    _this = this;
    _this.handleTap(0);
    _this.filtrateList();
  },
  methods: {
    // 弹出筛选框
    open(type) {
      if (type == 1) {
        this.unitName = "所有设备";
      } else if (type == 2) {
        this.unitName = "所有类型";
      } else if (type == 3) {
        this.unitName = "在线状态";
      }
      this.$refs.popup.open();
    },
    // 筛选列表
    filtrateList() {
      let _this = this;
      common.request("machine/machine_screen", {}, function (res) {
        console.log("machine_screen", res);
        _this.filtrate = res.data.info;
        uni.hideLoading();
      });
    },

    select(index, value, type) {
      console.log(index);
      this.isShowSelect = index;
      this.handleTap(type, value);
      //   this.isShowSelect = false;
      //   this.unitName = item.value;
    },
    goUrl(url, deviceid) {
      uni.navigateTo({
        url: url + "?deviceid=" + deviceid,
      });
    },
    mechineList() {
      common.request("machine/machine_list", {}, function (res) {
        // console.log(res)
        _this.list = res.data.info;
        // console.log("====>列表", JSON.stringify(_this.list));
        uni.hideLoading();
      });
    },
    handleTap(e, value) {
      if (value == undefined) {
        value = {};
      }
      console.log("eeeeeeeeeeeeeee", e);
      _this.ys = e;
      _this.filtrateList();
          // types: e,
      // 
      common.request(
        "machine/machine_list",
        {
          ...value,
        },
        function (res) {
          _this.list = res.data.info;
          //   console.log("列表数据", JSON.stringify(res));
          uni.hideLoading();
        }
      );
      // this.$refs.picker.show()
    },
    handleChange(item) {},
    handleConfirm(item) {
      this.label = item.item.label;
    },
    handleCancle(item) {},
  },
  onPullDownRefresh() {
    if (this.current == 1) {
      uni.startPullDownRefresh();
      this.goodList = [];
      this.getlist();
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./css/main.less");
// .selectBox_list{
// 	width: 100%;
// 	height: 50px;
// 	background: red;
// }
.item {
  display: flex;
  justify-content: center !important;
  .s-tit {
    margin-right: 5px;
  }
}
.uni_title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: #fff;
  color: #ff4564;
  border-top: 1px solid #c4c4c4;
}
.uni-list {
  width: 100%;
  height: auto;
  background: #fff;
  padding: 0 30px;
  .uni-list_box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .uni-list_item {
    display: flex;
    width: 33%;
    margin: 10px 0;
    color: #555555;
  }
}
</style>
