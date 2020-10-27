<template>
	<view>
		<!-- <div class="head">
			<div class="head-inner">
				<van-row>
					<van-col span="4" class="head-left">
						<van-icon name="arrow-left" class="back-btn" />
					</van-col>
					<van-col span="16" class="head-title">设备详情</van-col>
					<van-col span="4" class="head-right"> </van-col>
				</van-row>
			</div>
		</div> -->
		<view class="detail-top">
			<image src="/static/image/head_none@2x.png" class="head-img"></image>
			<view class="name">设备名称——设备型号</view>
			<view class="num">IMEI:01713900107</view>
			<view class="num">ICCID:89860402101970243288</view>
		</view>
		<view class="detail-list">
			<cmd-cell-item title="设置时间汇报间隔" slotRight :arrow="false">
				<view class="cmd-view">
					<text class="text-color1">秒</text>
					<input type="text" v-model="setTime" class="short-input" placeholder="请输入">
				</view>
			</cmd-cell-item>
			<cmd-cell-item title="设置超速阈值" slotRight :arrow="false">
				<view class="cmd-view">
					<text class="text-color1">Km/h</text>
					<input type="text" v-model="setSpeed" class="short-input" placeholder="请输入">
				</view>
			</cmd-cell-item>
			<cmd-cell-item title="设置疲驾阈值" slotRight :arrow="false">
				<view class="cmd-view">
					<text class="text-color1">Km/h</text>
					<input type="text" v-model="setFatigue" class="short-input" placeholder="请输入">
				</view>
			</cmd-cell-item>
			<view style="height: 15rpx;background: #f2f2f2;border:none;"></view>
			<cmd-cell-item title="报警紧急联系人1" slotRight :arrow="false">
				<view class="cmd-view">
					<input type="text" v-model="setFatigue" class="long-input" placeholder="请输入手机号码">
				</view>
			</cmd-cell-item>
			<cmd-cell-item title="报警紧急联系人2" slotRight :arrow="false">
				<view class="cmd-view">
					<input type="text" v-model="setFatigue" class="long-input" placeholder="请输入手机号码">
				</view>
			</cmd-cell-item>
			<view style="height: 15rpx;background: #f2f2f2;border:none;"></view>
			<cmd-cell-item title="报警提醒方式" slotRight :arrow="false">
				<view class="cmd-view">
					<view class="text-color1" style="margin-right: 20rpx;">紧急电话</view>
					<view class="text-color1">系统通知</view>
				</view>
			</cmd-cell-item>
			<view class="type-row" v-for="(item, index) in items" :key="item">
				<view class="tit">{{item.name}}</view>
				<radio-group class="radio-wrap" @change="radioChange">
					<radio :value="item.value" :checked="item.checked" />
					<radio :value="item.value" :checked="item.checked" />
				</radio-group>
			</view>
		</view>

	</view>
</template>

<script>
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	export default {
		components: {
			cmdCellItem
		},
		data() {
			return {
				items: [{
						name: 'SOS报警',
						value: '1',
						checked: 'true'
					},
					{
						name: '防盗报警',
						value: '2',
						checked: 'true'
					},
					{
						name: '断电报警',
						value: '3',
						checked: 'false'
					},
					{
						name: '超速报警',
						value: '4'
					},
					{
						name: '超速报警',
						value: '5'
					},
					{
						name: '超速报警',
						value: '6',
						checked: 'true'
					},
					{
						name: '超速报警',
						value: '7'
					},
					{
						name: '超速报警',
						value: '8'
					},
					{
						name: '超速报警',
						value: '9'
					},
					{
						name: '超速报警',
						value: '1'
					},
					{
						name: '超速报警',
						value: '1'
					},
				],
				current: 0
			}
		},
		onLoad() {

		},
		methods: {
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("./css/set.less");
</style>
