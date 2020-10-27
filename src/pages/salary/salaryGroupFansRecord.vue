<template>
	<view>
		<!-- <div class="head">
			<div class="head-inner" style="border-bottom: 1px solid #f2f2f2">
				<van-row>
					<van-col span="4" class="head-left">
						<van-icon name="arrow-left" class="back-btn" />
					</van-col>
					<van-col span="16" class="head-title">xxx考勤组记录</van-col>
					<van-col span="4" class="head-right">
					</van-col>
				</van-row>
			</div>
		</div> -->

		<view id="calendar">
			<uni-calendar :selected="selected" :insert="true" :lunar="false" @change="change" @monthSwitch="monthchange"></uni-calendar>
			<view class="toggle-type">
				<view class="type ac">日</view>
				<navigator open-type="redirect" :url="'salaryGroupFansMonthRecord?uid='+uid">
					<view class="type">月</view>
				</navigator>
			</view>
			<!-- <div class="go-today" @click="$refs.Calendar.ChoseMonth(new Date())">回到今天</div> -->

			<view class="mark-row">
				<view class="item zc-item">正常</view>
				<view class="item wq-item">外勤</view>
				<view class="item cd-item">迟到早退漏卡</view>
				<view class="item kg-item">旷工</view>
			</view>
		</view>

		<view class="time-list">
			<block v-timeLog="timeLog" v-for="item in logList">
				<view class="list">
					<view class="time-txt" :class="item.s_status?'c2':'c1'">上班时间：{{item.s_time}}</view>
					<block v-if="wqList[item.time_id]">
						<view class="time-row">
							<view class="txt">外勤打卡 {{wqList[item.time_id].time}}</view>
						</view>
						<view class="time-txt">{{wqList[item.time_id].address}}</view>
					</block>
					<block v-else>
						<view class="time-row" v-if="item.s_status">
							<view class="txt">打卡时间 {{item.s_d_time}}</view>
							<view class="tag tag-wq" v-if="item.s_status==1">正常</view>
							<view class="tag tag-cd" v-if="item.s_status==2">迟到</view>
							<view class="tag tag-cd" v-if="item.s_status==3">漏卡</view>
							<view class="tag tag-cd" v-if="item.s_status==4">旷工</view>
						</view>
						<view class="time-txt">{{item.s_address}}</view>
					</block>
				</view>
				<view class="list">
					<view class="time-txt" :class="item.e_status?'c2':'c1'">下班时间：{{item.e_time}}</view>
					<block v-if="!wqList[item.time_id]">
						<view class="time-row" v-if="item.e_status">
							<view class="txt">打卡时间 {{item.e_d_time}}</view>
							<view class="tag tag-wq" v-if="item.e_status==1">正常</view>
							<view class="tag tag-cd" v-if="item.e_status==2">早退</view>
							<view class="tag tag-cd" v-if="item.e_status==3">漏卡</view>
							<view class="tag tag-cd" v-if="item.e_status==4">旷工</view>
						</view>
						<view class="time-txt">{{item.e_address}}</view>
					</block>
				</view>
			</block>
			<view class="list" v-if="fjbInfo">
				<view class="time-txt" :class="fjbInfo.status==2?'c2':'c1'">加班时间：{{fjbInfo.s_time}}</view>
				<view class="time-row">
					<view class="txt">开始时间 {{fjbInfo.d_time}}</view>
					<view class="txt" v-if="fjbInfo.status == 2">~结束时间 {{fjbInfo.f_time}}</view>
				</view>
				<view class="time-txt">{{fjbInfo.address}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-newbar.vue'
	import common from 'common.js';
	var _this;
	export default {
		components: {
			uniCalendar,
			uniNavBar
		},
		data() {
			return {
				selected: [],
				logList: [],
				fjbInfo: [],
				wqList: [],
				uid: 0
			}
		},
		onLoad(e) {
			this.uid = e.uid;
			this.getMonth();
			this.getDay();
		},
		onShow() {

		},
		mounted() {
			_this = this;
		},
		methods: {
			getMonth(month = 0) {
				common.request('Salary_Group_Fans_Log/monthList', {
					month: month,
					uid: this.uid,
				}, function(res) {
					if (res.data.status == 1) {
						_this.selected = res.data.info
					} else {
						_this.selected = [];
					}
				});
			},
			getDay(day = 0) {
				common.request('Salary_Group_Fans_Log/dayList', {
					day: day,
					uid: this.uid
				}, function(res) {
					if (res.data.status == 1) {
						_this.logList = res.data.info.list
						_this.fjbInfo = res.data.info.fjbInfo
						_this.wqList = res.data.info.wqList
					} else {
						_this.logList = [];
						_this.fjbInfo = [];
						_this.wqList = [];
					}
				});
			},
			change(e) {
				this.getDay(e.fulldate);
			},
			monthchange(e) {
				this.getMonth(e.year + '-' + e.month);
			}
		},

	}
</script>

<style lang="less" scoped>
	@import url("./css/salaryRecord.less");
</style>
