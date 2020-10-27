<template>
	<view>
		<view id="calendar">
			<uni-calendar :insert="true" :lunar="false" @monthSwitch="monthchange"></uni-calendar>
			<view class="toggle-type">
				<navigator open-type="redirect" :url="'salaryGroupRecord?id='+salId">
					<view class="type">日</view>
				</navigator>
				<view class="type ac">月</view>
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

		<uni-collapse>
			<uni-collapse-item v-for="item in list" :thumb="item.app_host+item.head_path" :title="item.nick_name" :note="item.note"
			 :showAnimation="true" color="#ffffff">
				<view class="salary-list" style="padding: 0;background-color: #eef0f4;min-height: auto;padding: 0 20rpx;">
					<view class="list" v-for="logItem in item.log" style="min-height:100rpx">
						<view class="user">
							<view class="info">
								<view class="name" style="color: #aaaaaa;">{{logItem.date}}</view>
								<view class="phone">{{logItem.note}}</view>
							</view>
						</view>
						<view class="time-list">
							<view class="item">
								<view class="div">上{{logItem.s_time?logItem.s_time:'--'}}</view>
								<view class="div">下{{logItem.e_time?logItem.e_time:'--'}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- <uni-list v-for="logItem in item.log">
					<uni-list-item :title="logItem.date" :note="'fff'"
					 :showExtraIcon="false" :showArrow="false" color="#eef0f4"></uni-list-item>
				</uni-list> -->
			</uni-collapse-item>
		</uni-collapse>

	</view>
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import common from 'common.js';
	var _this;
	export default {
		components: {
			uniCalendar,
			uniSection,
			uniCollapse,
			uniCollapseItem,
			uniList,
			uniListItem
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
				month: 0,
				list: []
			}
		},
		onLoad(e) {
			this.salId = e.id;
			this.getMonthNum();
			this.getMonthList();
		},
		mounted() {
			_this = this;
		},
		methods: {
			monthchange(e) {
				this.month = e.year + '-' + e.month;
				this.getMonthNum();
				this.getMonthList();
			},
			chose(type) {
				this.type = type;
				this.getMonthList();
			},
			getMonthNum() {
				common.request('Salary_Group/groupMonthNum', {
					month: this.month,
					salId: this.salId
				}, function(res) {
					if (res.data.status == 1) {
						_this.num = res.data.info
					} else {
						_this.num = [];
					}
				});
			},
			getMonthList() {
				common.request('Salary_Group/groupMonthList', {
					month: this.month,
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
			monthchange(e) {
				this.month = e.year + '-' + e.month;
				this.getMonthNum();
				this.getMonthList();
			},
		},

	}
</script>

<style lang="less" scoped>
	@import url("./css/salaryGroupRecord.less");

	.uni-list-item__content-note {
		margin-top: 6rpx;
		color: #999;
		font-size: 20rpx;
		overflow: hidden;
		float: left;
	}
	.uni-collapse-cell__title-img{
		border-radius: 50%;
	}
</style>
