<template>
	<view>
		<view class="create-wrap">
			<view class="tit">上班时间</view>
			<view class="address">
				工作日：周{{data.weekStr}}
			</view>
			<view class="address">
				考勤时间：<block v-for="item in data.timechose"><text v-if="item.type==1">{{item.s_time}}~{{item.e_time}};</text></block>
			</view>
			<view class="address">
				加班时间：<block v-for="item in data.timechose"><text v-if="item.type==0">{{item.s_time}}~{{item.e_time}};</text></block>
			</view>
		</view>
		<view class="create-wrap">
			<view class="tit">考勤范围</view>
			<view class="address">
				{{data.address}}
			</view>
		</view>
		<view class="create-wrap">
			<view class="tit">考勤公告</view>
			<view class="address">
				{{data.notice}}
			</view>
		</view>
	</view>
</template>

<script>
	import common from 'common.js'
	var _this;
	export default {
		components: {},
		data() {
			return {
				data: []
			}
		},
		onLoad(e) {},
		onShow() {
			this.salaryInfo();
		},
		onHide() {

		},
		onUnload() {},
		onNavigationBarButtonTap() {},
		mounted() {
			_this = this;
		},
		methods: {
			salaryInfo() {
				common.request('Salary_Fans/baseInfo', {}, function(res) {
					_this.data = res.data.info
				});
			},
		},
	}
</script>

<style lang="less" scoped>
	.create-wrap {
		z-index: 200;
		height: auto;
		overflow: hidden;
		width: 690rpx;
		background: #fff;
		margin: 0 30rpx;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #E2E4EA;
	}

	.create-wrap .tit {
		font-weight: 400;
		font-size: 36rpx;
		padding-bottom: 30rpx;
	}

	.address {
		padding: 0 0 0 30rpx;
		font-size: 28rpx;
		color: #858B9C;
	}
</style>
