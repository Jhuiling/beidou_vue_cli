<template>
	<view>
		<view id="calendar">
			<uni-calendar :selected="selected" :insert="true" :lunar="false" @monthSwitch="monthchange"></uni-calendar>
			<view class="toggle-type">
				<navigator open-type="redirect" url="salaryRecord">
					<view class="type">日</view>
				</navigator>
				<view class="type ac">月</view>
			</view>
		</view>

		<uni-collapse>
			<uni-collapse-item title="考勤天数" :note="total.total+'天'" color="#ffffff">
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse>
			<uni-collapse-item title="迟到" :note="total.cd_num+'次,共'+total.cd_time+'分钟'" :showAnimation="true" color="#ffffff">
				<uni-list v-for="item in total.cd_list">
					<uni-list-item :title="item.time" :note="'上班时间 '+item.s_time+',打卡时间 '+item.s_d_time+',迟到'+item.s_cha_time+'分钟'"
					 :showExtraIcon="false" :showArrow="false" color="#eef0f4"></uni-list-item>
				</uni-list>
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse>
			<uni-collapse-item title="早退" :note="total.zt_num+'次,共'+total.zt_time+'分钟'" :showAnimation="true" color="#ffffff">
				<uni-list v-for="item in total.zt_list">
					<uni-list-item :title="item.time" :note="'下班时间 '+item.e_time+',打卡时间 '+item.e_d_time+',早到'+item.e_cha_time+'分钟'"
					 :showExtraIcon="false" :showArrow="false" color="#eef0f4"></uni-list-item>
				</uni-list>
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse>
			<uni-collapse-item title="外勤" :note="total.wq_num+'次'" :showAnimation="true" color="#ffffff">
				<uni-list v-for="item in total.wq_list">
					<uni-list-item :title="item.time" :note="item.address" :showExtraIcon="false" :showArrow="false" color="#eef0f4"></uni-list-item>
				</uni-list>
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse>
			<uni-collapse-item title="旷工" :note="total.kg_num+'次'" :showAnimation="true" color="#ffffff">
				<uni-list v-for="item in total.kg_list">
					<uni-list-item :title="item.time" :slotRight="true" :showExtraIcon="false" :showArrow="false" color="#eef0f4">
						<template slot="slotRight">
							<view class="uni-list-item__content-note">
								<text style="color:#ff3232">{{item.s_time}}</text>
								~
								<text style="color:#ff3232">{{item.e_time}}</text>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse>
			<uni-collapse-item title="漏卡" :note="total.lk_num+'次'" :showAnimation="true" color="#ffffff">
				<uni-list v-for="item in total.lk_list">
					<uni-list-item :title="item.time" :slotRight="true" :showExtraIcon="false" :showArrow="false" color="#eef0f4">
						<template slot="slotRight">
							<view class="uni-list-item__content-note">
								<text :style="item.s_status==3?'color:#ff3232':''">{{item.s_time}}</text>
								~
								<text :style="item.e_status==3?'color:#ff3232':''">{{item.e_time}}</text>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse>
			<uni-collapse-item title="加班" :note="total.jb_num+'次'" :showAnimation="true" color="#ffffff">
				<uni-list v-for="item in total.jb_list">
					<uni-list-item :title="item.time" :note="item.d_time+'~'+item.f_time+',加班'+item.long_time+'分钟'" :showExtraIcon="false"
					 :showArrow="false" color="#eef0f4"></uni-list-item>
				</uni-list>
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
				selected: [],
				total: {
					total: 0,
					cd_num: 0,
					zt_num: 0,
					lk_num: 0,
					kg_num: 0,
					wq_num: 0,
					jb_num: 0,
					cd_time: 0,
					zt_time: 0
				},
				month: '',
			}
		},
		onLoad() {
			this.getMonth();
			this.getTotal();
		},
		mounted() {
			_this = this;
		},
		methods: {
			getMonth(month = 0) {
				this.selected = [];
				common.request('Salary_Log/monthList', {
					month: month
				}, function(res) {
					if (res.data.status == 1) {
						_this.selected = res.data.info
					}
				});
			},
			getTotal(month = 0) {
				common.request('Salary_Log/monthinfo', {
					month: month
				}, function(res) {
					if (res.data.status == 1) {
						_this.total = res.data.info
					}
				});
			},
			getStatus(status) {
				common.request('Salary_Log/getStatus', {
					status: status,
					month: _this.month
				}, function(res) {
					if (res.data.status == 1) {
						_this[res.data.url] = res.data.info
					} else {
						_this[res.data.url] = [];
					}
				});
			},
			monthchange(e) {
				this.month = e.year + '-' + e.month;
				this.getMonth(e.year + '-' + e.month);
				this.getTotal(e.year + '-' + e.month);
			}
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
</style>
