<template>
	<view>
		<uni-nav-bar left-icon="back" :fixed="true" :status-bar="true" title="设备二维码" @clickLeft="goBack"></uni-nav-bar>
		<view class="page" style="">
			<view class="qrcode">
				<image :src="url"></image>
			</view>
		</view>
	</view>
</template>
<script>
	var _this;
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
				url: '',
				deviceid:"",
			}
		},
		onLoad(e) {
			console.log(e);
			var deviceid = e.deviceid;
			this.deviceid = e.deviceid
		},
		mounted() {
			_this = this;
			_this.getDetials();
		},
		methods: {
			goBack() {
				uni.navigateBack({
					data: 1
				})
			},
			getDetials() {
				let data = {
					deviceid: this.deviceid,
				}
				console.log("解析id", data)
				common.request('machine/machine_qrcode', data, function(res) {
					console.log("res",res)
					_this.url = res.data.info.src
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.uni-transition {
		bottom: calc(var(--window-bottom) + 0);
	}

	page {}

	@import url("./css/main.less");
</style>
