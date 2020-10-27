<template>
	<view>
		<!-- <view class="head">
			<div class="head-inner" style="border-bottom: 1px solid #f2f2f2">
				<van-row>
					<van-col span="4" class="head-left">
						<van-icon name="arrow-left" class="back-btn" />
					</van-col>
					<van-col span="16" class="head-title">停留统计</van-col>
					<van-col span="4" class="head-right"> </van-col>
				</van-row>
			</div>
		</view> -->
		<view class="date-row">
			<input type="text" :value="start_time" placeholder="请选择开始时间" data-param="start" class="date-input" @click="openDatetimePicker" />
			<view>至</view>
			<input type="text" :value="end_time" placeholder="请选择结束时间" data-param="end" class="date-input" @click="openDatetimePicker" />

		</view>

		<t-table>
			<t-tr>
				<t-th>地点</t-th>
				<t-th>时长</t-th>
				<t-th style="color:#333;">次数↓</t-th>
			</t-tr>
			<t-tr>
				<t-td class="ads">
					<uni-icons name="location" size="30" color="#fff" />
					<view>
						河北省石家庄市正定县
						<view>点击显示详细</view>
					</view>
				</t-td>
				<t-td class="time">3天5小时6分钟</t-td>
				<t-td class="num">3</t-td>
			</t-tr>
			<t-tr>
				<t-td class="ads">
					<uni-icons name="location" size="30" color="#fff" />
					<view>
						河北省石家庄市正定县
						<view>点击显示详细</view>
					</view>

				</t-td>
				<t-td class="time">3天5小时6分钟</t-td>
				<t-td class="num">3</t-td>
			</t-tr>
		</t-table>

		<t-table>
			<t-tr>
				<t-th>地点</t-th>
				<t-th>时长</t-th>
				<t-th style="color:#333;">次数↓</t-th>
			</t-tr>
			<t-tr>
				<t-td class="ads">
					<uni-icons name="location" size="30" color="#fff" />
					<view>
						河北省石家庄市正定县
						<view>点击显示详细</view>
					</view>
				</t-td>
				<t-td class="time">3天5小时6分钟</t-td>
				<t-td class="num">3</t-td>
			</t-tr>
			<t-tr>
				<t-td class="ads">
					<uni-icons name="location" size="30" color="#fff" />
					<div>
						河北省石家庄市正定县
						<p>点击显示详细</p>
					</div>

				</t-td>
				<t-td class="time">3天5小时6分钟</t-td>
				<t-td class="num">3</t-td>
			</t-tr>
		</t-table>


		<!--日期选择器 -->
		<simple-datetime-picker ref="startPicker" @submit="startTimeSubmit" :start-year="2000" :end-year="2030" color="rgb(51, 119, 255)"></simple-datetime-picker>
		<simple-datetime-picker ref="endPicker" @submit="endTimeSubmit" :start-year="2000" :end-year="2030" color="rgb(51, 119, 255)"></simple-datetime-picker>
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import simpleDatetimePicker from "@/components/buuug7/simple-datetime-picker.vue";
	export default {
		components: {
			tTable,
			tTh,
			tTr,
			tTd,
			uniIcons,
			simpleDatetimePicker
		},
		data() {
			return {
				start_time: '',
				end_time: ''
			}
		},
		onLoad() {

		},
		methods: {
			openDatetimePicker(e) {
				var myPicker = e.currentTarget.dataset.param;
				if (myPicker == 'start') {
					this.$refs.startPicker.show();
				} else {
					this.$refs.endPicker.show();
				}
			},

			// 关闭picker
			closeDatetimePicker() {
				this.$refs.myPicker.hide();
			},
			startTimeSubmit(e) {
				this.start_time = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}`;
			},
			endTimeSubmit(e) {
				this.end_time = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}`;
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("./css/station.less");
</style>
