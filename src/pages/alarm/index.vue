<template>
	<view>
		<uni-nav-bar left-icon="back" :fixed="true" :status-bar="true" title="警报" color="#000" @clickLeft="goBack"></uni-nav-bar>
		<view class="page">

			<view class="timearea">
				<!-- <input class="time" v-model="start_time" />
				<text>至</text>
				<view class="time">
					{{end_time}}
				</view> -->
				<view class="time" @tap="setTime(1)">
					{{start_time}}
				</view>
				<text>至</text>
				<view class="time" @tap="setTime(0)">
					{{end_time}}
				</view>
				<view class="search-btn" @tap="getAlarmList">搜索</view>
			</view>
			<view class="event-list " v-for="(item,index) in alarmList" :key="index" @tap="goDetails(item)">
				<image class="car-icon" src="../../static/image/car@2x.png"></image>
				<text class="car-name">{{item.type}}</text>
				<text class="title">{{item.name}}</text>
				<text class="time">{{item.CreateDate}}</text>
			</view>
			<view class="mask" v-if="loading">
				<text>加载中...</text>
			</view>
			<view class="mask" v-if="alarmList.length===0 && !loading">
				<text>无数据</text>
			</view>
			<date-time ref="dateTime" startYear="2019" :isAll="true" :current="false" @confirm="onConfirm"></date-time>
		</view>
	</view>
</template>
<script>
	var _this;
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import dateTime from '@/components/yu-datetime-picker/yu-datetime-picker.vue'
	import common from 'common.js'
	export default {
		components: {
			uniSection,
			uniIcons,
			dateTime
		},
		data() {
			return {
				alarmList: [],
				start_time: '',
				end_time: '',
				times: '2020-03-10 08:30:01',
				type: 1,
				deviceid: '',
				loading:false
			}
		},
		onLoad(e) {
			var _this = this;
			_this.deviceid = e.deviceid;
			var date = new Date();
			this.year = date.getFullYear();
			this.month = date.getMonth() + 1;
			this.date = date.getDate();
			this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
			this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
			this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			this.milliSeconds = date.getMilliseconds();
			var currentTime = this.year + '-' + this.month + '-' + this.date + ' ' + this.hour + ':' + this.minute + ':' + this.second
			_this.end_time = currentTime;
			_this.start_time = currentTime;
			console.log(currentTime)
		},
		mounted() {
			_this = this
			_this.getAlarmList();

		},
		methods: {
			goBack() {
				uni.navigateBack({
					data: 1
				})
			},
			setTime(type) {
				_this.type = type;
				if (type) {
					_this.times = _this.start_time
				} else {
					_this.times = _this.endTime_time
				}
				_this.$refs.dateTime.show();
			},
			onConfirm(e) {

				if (_this.type) {
					_this.start_time = e.selectRes
				} else {
					_this.end_time = e.selectRes
				}
				// _this.getAlarmList();
			},
			getAlarmList() {
				console.log(_this.deviceid)
				_this.loading=true
				common.request('machine/police_list', {
					deviceid: _this.deviceid,
					start_time: _this.start_time,
					end_time: _this.end_time
				}, function(res) {
					console.log(res)
					_this.alarmList = res.data.info.data
					_this.loading=false
				})

			},
			// 查看详情
			goDetails(item) {
				uni.navigateTo({
					url: '/pages/alarm/details?id=' + item.id + "&longitude=" + item.longitude + "&latitude=" + item.latitude +
						"&deviceid=" + _this.deviceid
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.uni-transition {
		bottom: calc(var(--window-bottom) + 0);
	}

	@import url("./css/main.less");
</style>
