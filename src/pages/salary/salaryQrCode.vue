<template>
	<view>
		<image :src="src" mode="scaleToFill"></image>
		<view>扫描二维码加入群组</view>
	</view>
</template>

<script>
	var _this;
	import common from 'common.js'
	export default {
		components: {},
		data() {
			return {
				src: ''
			}
		},
		onLoad(e) {
			this.src = common.url('Qr_Code/salary/id/' + e.id);
		},
		onShow() {},
		onHide() {

		},
		onUnload() {},
		mounted() {
			_this = this;
		},
		methods: {

		},
	}
</script>

<style lang="less" scoped>
	image {
		width: 500rpx;
		height: 500rpx;
		margin: 200rpx auto 0;
		display: block;
	}
	view{
		text-align: center;
	}
</style>
