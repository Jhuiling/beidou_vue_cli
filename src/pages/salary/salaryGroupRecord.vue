<template>
	<view>
		<view id="calendar">
			<uni-calendar :insert="true" :lunar="false" @change="change"></uni-calendar>
			<view class="toggle-type">
				<view class="type ac">日</view>
				<navigator open-type="redirect" :url="'salaryGroupMonthRecord?id='+salId">
					<view class="type">月</view>
				</navigator>
			</view>
		</view>

		<view class="statistics-row">
			<view class="inner">
				<view class="item" @click="chose(1)" :class="type==1?'ac':''">
					<view class="num">{{num.cd_num}}</view>
					<view class="txt">迟到</view>
				</view>
				<view class="item" @click="chose(2)" :class="type==2?'ac':''">
					<view class="num">{{num.zt_num}}</view>
					<view class="txt">早退</view>
				</view>
				<view class="item" @click="chose(3)" :class="type==3?'ac':''">
					<view class="num">{{num.wq_num}}</view>
					<view class="txt">外勤</view>
				</view>
				<view class="item" @click="chose(4)" :class="type==4?'ac':''">
					<view class="num">{{num.kg_num}}</view>
					<view class="txt">旷工</view>
				</view>
				<view class="item" @click="chose(5)" :class="type==5?'ac':''">
					<view class="num">{{num.lk_num}}</view>
					<view class="txt">漏卡</view>
				</view>
				<view class="item" @click="chose(6)" :class="type==6?'ac':''">
					<view class="num">{{num.jb_num}}</view>
					<view class="txt">加班</view>
				</view>
			</view>

		</view>

		<view class="salary-list">
			<view class="list" v-for="item in list">
				<view class="user">
					<navigator :url="'salaryGroupFansRecord?uid='+item.fans_id">
						<image :src="item.app_host+item.fans.head_path" class="head-img"></image>
					</navigator>
					<view class="info">
						<view class="name">{{item.fans.nick_name}}</view>
						<view class="phone">{{item.fans.mobile}}</view>
					</view>
				</view>
				<view class="time-list">
					<view class="item">
						<view class="div">上{{item.s_time?item.s_time:'--'}}</view>
						<view class="div">下{{item.e_time?item.e_time:'--'}}</view>
					</view>
					<!-- <view class="item">
						<text>上09:00</text>
						<text>下09:00</text>
					</view>
					<view class="item">
						<text>上09:00</text>
						<text>下09:00</text>
					</view> -->
				</view>
				<view class="type">
					<view class="p1">
						{{type==1?'迟到':''}}
						{{type==2?'早退':''}}
						{{type==3?'外勤':''}}
						{{type==4?'旷工':''}}
						{{type==5?'漏卡':''}}
						{{type==6?'加班':''}}
					</view>
					<view v-if="item.long_time" class="p2">{{item.long_time}}分钟</view>
				</view>
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
				num: {
					cd_num: 0,
					zt_num: 0,
					wq_num: 0,
					kg_num: 0,
					lk_num: 0,
					jb_num: 0,
				},
				salId: 0,
				type: 1,
				day: 0,
				list: [],
			}
		},
		onLoad(e) {
			this.salId = e.id;
			this.getDay();
			this.getList();
		},
		mounted() {
			_this = this;
		},
		methods: {
			change(e) {
				this.day = e.fulldate;
				this.getDay();
				this.getList();
			},
			getDay() {
				common.request('Salary_Group/groupDayNum', {
					day: this.day,
					salId: this.salId
				}, function(res) {
					if (res.data.status == 1) {
						_this.num = res.data.info
					} else {
						_this.num = [];
					}
				});
			},
			getList() {
				common.request('Salary_Group/groupDayList', {
					day: this.day,
					salId: this.salId,
					type: this.type,
				}, function(res) {
					if (res.data.status == 1) {
						_this.list = res.data.info
					} else {
						_this.list = [];
					}
				});
			},
			chose(type) {
				this.type = type;
				this.getList();
			}
		},

	}
</script>

<style lang="less" scoped>
	@import url("./css/salaryGroupRecord.less");
</style>
