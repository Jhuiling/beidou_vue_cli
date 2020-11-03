<template>
  <view>
    <form @submit="submit">
      <view class="time-box">
        <view class="title">每周工作日:</view>
        <view class="week-box">
          <view
            class="week"
            @click="choseWeek(k)"
            :class="item.class"
            v-for="(item, k) in week"
            >{{ item.name }}</view
          >
        </view>
      </view>
      <view class="time-box">
        <view class="title">每周工作日:</view>
        <view class="date-num">
          <uni-segmented-control
            :current="current"
            :values="items"
            @clickItem="onClickItem"
            active-color="#37f"
          ></uni-segmented-control>
        </view>
        <view class="min-title">一天2次,只需要早晚各打一次卡</view>
        <view class="min-title">一天4次,中午可以打一次下班卡和上班卡</view>
        <view class="min-title">一天6次,一天可以有三次上下班</view>

        <view style="margin-top: 30rpx" v-for="count in timeItem" :key="count">
          <view class="time-chose-box">
            <view class="time">
              <picker
                :name="'s_start_' + count"
                mode="time"
                :value="timeChose[count].s_start"
                @change="bindTimeChange($event, count, 's_start')"
              >
                <image src="../../static/image/timming@3x.png"></image>
                <text>{{ timeChose1[count].s_start }}</text>
              </picker>
            </view>
            <view class="time">
              <picker
                :name="'s_time_' + count"
                mode="time"
                :value="timeChose[count].s_time"
                @change="bindTimeChange($event, count, 's_time')"
              >
                <image src="../../static/image/timming@3x.png"></image>
                <text>{{ timeChose1[count].s_time }}</text>
              </picker>
            </view>
            <view class="time">
              <picker
                :name="'s_end_' + count"
                mode="time"
                :value="timeChose[count].s_end"
                @change="bindTimeChange($event, count, 's_end')"
              >
                <image src="../../static/image/timming@3x.png"></image>
                <text>{{ timeChose1[count].s_end }}</text>
              </picker>
            </view>
          </view>
          <view class="time-chose-box">
            <view class="time-title">上班最早打卡时间</view>
            <view class="time-title">上班时间</view>
            <view class="time-title">上班最晚打卡时间</view>
          </view>
          <view class="time-chose-box">
            <view class="time">
              <picker
                :name="'e_start_' + count"
                mode="time"
                :value="timeChose[count].e_start"
                @change="bindTimeChange($event, count, 'e_start')"
              >
                <image src="../../static/image/timming@3x.png"></image>
                <text>{{ timeChose1[count].e_start }}</text>
              </picker>
            </view>
            <view class="time">
              <picker
                :name="'e_time_' + count"
                mode="time"
                :value="timeChose[count].e_time"
                @change="bindTimeChange($event, count, 'e_time')"
              >
                <image src="../../static/image/timming@3x.png"></image>
                <text>{{ timeChose1[count].e_time }}</text>
              </picker>
            </view>
            <view class="time">
              <picker
                :name="'e_end_' + count"
                mode="time"
                :value="timeChose[count].e_end"
                @change="bindTimeChange($event, count, 'e_end')"
              >
                <image src="../../static/image/timming@3x.png"></image>
                <text>{{ timeChose1[count].e_end }}</text>
              </picker>
            </view>
          </view>
          <view class="time-chose-box">
            <view class="time-title">下班最早打卡时间</view>
            <view class="time-title">下班时间</view>
            <view class="time-title">下班最晚打卡时间</view>
          </view>
        </view>
      </view>
      <view class="time-box">
        <view class="title"
          >是否开启加班:
          <switch
            name="overtime"
            :checked="overtimeCheck"
            @change="overtime"
            style="transform: scale(0.7); float: right"
          />
        </view>
        <view style="margin-top: 30rpx" v-if="overtimeCheck">
          <view class="time-chose-box">
            <view class="time">
              <picker
                name="o_s_start"
                mode="time"
                :value="overtimeArr.s_start"
                @change="bindTimeChange($event, 0, 's_start')"
              >
                <image src="../../static/image/timming@3x.png"></image>
                <text>{{ overtimeArr.s_start }}</text>
              </picker>
            </view>
            <view class="time">
              <picker
                name="o_s_time"
                mode="time"
                :value="overtimeArr.s_time"
                @change="bindTimeChange($event, 0, 's_time')"
              >
                <image src="../../static/image/timming@3x.png"></image>
                <text>{{ overtimeArr.s_time }}</text>
              </picker>
            </view>
            <view class="time">
              <picker
                name="o_s_end"
                mode="time"
                :value="overtimeArr.s_end"
                @change="bindTimeChange($event, 0, 's_end')"
              >
                <image src="../../static/image/timming@3x.png"></image>
                <text>{{ overtimeArr.s_end }}</text>
              </picker>
            </view>
          </view>
          <view class="time-chose-box">
            <view class="time-title">加班最早打卡时间</view>
            <view class="time-title">加班开始</view>
            <view class="time-title">加班最晚打卡时间</view>
          </view>
          <view class="time-chose-box">
            <view class="time">
              <picker
                name="o_end_time"
                mode="time"
                :value="overtimeArr.end_time"
                @change="bindTimeChange($event, 0, 'end_time')"
              >
                <image src="../../static/image/timming@3x.png"></image>
                <text>{{ overtimeArr.end_time }}</text>
              </picker>
            </view>
            <!-- <view class="time">
							<picker name="o_e_time" mode="time" :value="overtimeArr.e_time" @change="bindTimeChange($event,0,'e_time')">
								<image src="../../static/image/timming@3x.png"></image>
								<text>{{overtimeArr.e_time}}</text>
							</picker>
						</view>
						<view class="time">
							<picker name="o_e_end" mode="time" :value="overtimeArr.e_end" @change="bindTimeChange($event,0,'e_end')">
								<image src="../../static/image/timming@3x.png"></image>
								<text>{{overtimeArr.e_end}}</text>
							</picker>
						</view> -->
          </view>
          <view class="time-chose-box">
            <view class="time-title">加班最晚结束时间</view>
            <!-- <view class="time-title">加班结束</view> -->
            <!-- <view class="time-title">最晚打卡时间</view> -->
          </view>
        </view>
      </view>
      <view class="time-box">
        <view class="title"
          >是否开启法定节假日排休:
          <switch
            name="holiday"
            :checked="holidayChecked"
            @change="holiday"
            style="transform: scale(0.7); float: right"
          />
        </view>
      </view>
      <button type="primary" form-type="submit">确认</button>
    </form>
  </view>
</template>

<script>
import cmdCellItem from "@/components/cmd-cell-item/cmd-cell-item.vue";
import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue";
import common from "common.js";
var _this;
export default {
  components: {
    cmdCellItem,
    uniSegmentedControl,
  },
  data() {
    return {
      label: "",
      imgurl: "/static/image/head_none@2x.png",
      mobile: "",
      nickName: "",
      fansinfo: [],
      current: 0,
      week: {
        1: {
          name: "一",
          class: "",
        },
        2: {
          name: "二",
          class: "",
        },
        3: {
          name: "三",
          class: "",
        },
        4: {
          name: "四",
          class: "",
        },
        5: {
          name: "五",
          class: "",
        },
        6: {
          name: "六",
          class: "",
        },
        7: {
          name: "日",
          class: "",
        },
      },
      items: ["一天2次", "一天4次", "一天6次"],
      timeItem: 1,
      timeChose: {
        1: {
          s_start: "08:00",
          s_time: "08:00",
          s_end: "08:00",
          e_start: "08:00",
          e_time: "08:00",
          e_end: "08:00",
        },
        
      },
	  timeChose1: {
	    1: {
	      s_start: "08:00",
	      s_time: "08:00",
	      s_end: "08:00",
	      e_start: "08:00",
	      e_time: "08:00",
	      e_end: "08:00",
	    },
		// 2: {
		//   s_start: "08:00",
		//   s_time: "08:00",
		//   s_end: "08:00",
		//   e_start: "08:00",
		//   e_time: "08:00",
		//   e_end: "08:00",
		// },
	 //  3: {
	 //    s_start: "08:00",
	 //    s_time: "08:00",
	 //    s_end: "08:00",
	 //    e_start: "08:00",
	 //    e_time: "08:00",
	 //    e_end: "08:00",
	 //  },
	  },
	  
      overtimeCheck: false,
      overtimeArr: {
        s_start: "08:00",
        s_time: "08:00",
        s_end: "08:00",
        end_time: "08:00",
        // e_start: '08:00',
        // e_time: '08:00',
        // e_end: '08:00'
      },
      holidayChecked: false,
    };
  },
  onLoad() {
    var timeData = uni.getStorageSync("timeData");
    console.log("333", timeData);
    if (timeData) {
      this.week = timeData.week;
      this.timeItem = timeData.timeItem;
      this.current = timeData.timeItem-1;
      this.timeChose = timeData.timeChose;
	  this.timeChose1 = timeData.timeChose;
      this.overtimeCheck = timeData.overtimeCheck;
      if (timeData.overtimeArr) {
        this.overtimeArr = timeData.overtimeArr;
      }
      this.holidayChecked = timeData.holidayChecked;
    }
  },
  onShow() {},
  onNavigationBarButtonTap() {
    uni.navigateTo({
      url: "create",
    });
  },
  mounted() {
    _this = this;
  },
  methods: {
    choseWeek(k) {
      var weekOne = this.week[k];
      if (weekOne.class == "chose") {
        _this.week[k].class = "";
      } else {
        _this.week[k].class = "chose";
      }
    },
    onClickItem(e) {
      var current = e.currentIndex + 1;
      console.log("current", current);
      this.timeItem = e.currentIndex + 1;
      for (var i = 1; i <= current; i++) {
        console.log(i);
        this.timeChose[i] = {};
        this.timeChose[i].s_start = "08:00";
        this.timeChose[i].s_time = "08:00";
        this.timeChose[i].s_end = "08:00";
        this.timeChose[i].e_start = "08:00";
        this.timeChose[i].e_time = "08:00";
        this.timeChose[i].e_end = "08:00";
		this.timeChose1[i] = {};
		this.timeChose1[i].s_start = "08:00";
		this.timeChose1[i].s_time = "08:00";
		this.timeChose1[i].s_end = "08:00";
		this.timeChose1[i].e_start = "08:00";
		this.timeChose1[i].e_time = "08:00";
		this.timeChose1[i].e_end = "08:00";
      }
    },
    bindTimeChange(value, count, type) {
      console.log(value, count, type);
	  let time = value.detail.value;
	
	   // this.timeChose1[Number(count)][type] = "";
      this.timeChose1[Number(count)][type] =time ;
	  console.log( this.timeChose[Number(count)][type])
	  this.timeChose[count][type] = value.detail.value;
	  this.$forceUpdate()
      if (count == 0) {
        console.info(value);
        this.overtimeArr[type] = value.detail.value;
        console.info(this.overtimeArr);
        return false;
      }
    },
    overtime(e) {
      this.overtimeCheck = e.detail.value;
    },
    holiday(e) {
      this.holidayChecked = e.detail.value;
    },
    submit(e) {
      var timeData = {};
      timeData.week = this.week;
      timeData.timeItem = this.timeItem;
      timeData.timeChose = this.timeChose;
      timeData.overtimeCheck = this.overtimeCheck;
      timeData.overtimeArr = this.overtimeArr;
      timeData.holidayChecked = this.holidayChecked;
      console.info(timeData);
      uni.setStorageSync("timeData", timeData);
      uni.navigateBack();
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./css/time.less");
</style>
