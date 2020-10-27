<template>
	<view>
		<view class="swipe-wrap">
			<swiper indicator-dots="true"  interval="2000" :duration="500">
				<swiper-item class="swipe-items">
					<view class="card">
						<view class="tit">行业名称</view>
						<image mode="widthFix" class="img" src="/static/image/test_03.jpg"></image>
					</view>
				</swiper-item>
				<swiper-item class="swipe-items">
					<view class="card">
						<view class="tit">行业名称2</view>
						<image mode="widthFix" class="img" src="/static/image/test_03.jpg"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view>
			<view class="preview-wrap">
				<view class="title">行业名称</view>
				<view class="msg" style="color:#999;font-size: 30rpx">场景描述，此处省略若干字</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "storeApp",
		methods: {
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("./css/main.less");
</style>
