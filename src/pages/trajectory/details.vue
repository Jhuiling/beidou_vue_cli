<template>
<view>
	<view class="topbox">
		<uni-nav-bar left-icon="back" :fixed="false" :status-bar="true"  title="运动轨迹" @clickLeft="goBack" ></uni-nav-bar>
	</view>
	<view class="page">
		<web-view :src="'/hybrid/html/trajectory.html?token='+token+'&start_time='+start_time+'&end_time='+end_time+'&deviceid='+deviceid+'&type='+deviceType" @message="isLoding"></web-view>
	</view>
</view>
</template>
 
<script>
	var _this,WV;
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import common from 'common.js'
	export default {
		components: {
			uniSection,
			uniIcons
		},
		data() {
			return {
				createShow: true,
				close: true,
				lng: '',
				lat:'',
				addressList: [],
				home: '',
				work: '',
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '/static/image/location.png',
					width: 10,
					height: 10
				}],
				change: -1,
				selOpen: false,
				watchOpen: true,
				token:'',
				deviceid:'',
				start_time:'',
				end_time:'',
				deviceType:1
			}
		},
		onLoad(e) {
			var _this = this 
			_this.start_time=e.start_time
			_this.end_time=e.end_time
			_this.token = e.token 
			_this.deviceid = e.deviceid
			this.deviceType = e.type
			console.log(e)
			console.log(_this.start_time,_this.end_time,_this.token,_this.deviceid)
		},
		onShow() {
		},
		mounted() {
		},
		methods: {
			isLoding(event) {
				console.log(event.detail.data)
			},
			goBack() {
				uni.navigateBack({
					data:1
				})
			},
			// 关闭手表信息
			closeWatchInfo() {
				_this.watchOpen = false
			},
			// 打开选择框
			openSel() {
				_this.selOpen = true
				_this.watchOpen = false
			},
			// 关闭选择框
			closeSel() {
				_this.selOpen =  false
			},
			changes(index) {
				_this.change = index
			},
			getLocation() {
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						var covers = [{
							latitude: res.latitude,
							longitude: res.longitude,
						}]
						_this.covers = covers;
					}
				});
			},
			nowLocation() {
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						_this.lng = res.longitude;
						_this.lat = res.latitude;
					}
				});
			},
		},

	}
</script>

<style lang="less" scoped>
	.uni-transition {
		bottom: calc(var(--window-bottom) + 0);
	}

	@import url("./css/details.less");
</style>
