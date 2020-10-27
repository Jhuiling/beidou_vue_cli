<template>
	<view>
		<!-- <view class="head">
			<view class="head-inner">
				<van-row>
					<van-col span="4" class="head-left">
						<van-icon name="arrow-left" class="back-btn" />
					</van-col>
					<van-col span="16" class="head-title">设备续费</van-col>
					<van-col span="4" class="head-right"></van-col>
				</van-row>
			</view>
		</view> -->
		<view class="detail-top">
			<image src="/static/image/head_none@2x.png" class="head-img"></image>
			<view class="name">设备名称——设备型号</view>
			<view class="num">IMEI:01713900107</view>
			<view class="num">ICCID:89860402101970243288</view>
		</view>
		<view class="detail-list">
			<cmd-cell-item title="到期日期" slotRight :arrow="false">
				<view class="text-color1">2019.09.14 18:00</view>
			</cmd-cell-item>
		</view>
		<view style="height: 1px;background: #eee;width: 92%;border:none;margin:0 auto 50rpx;"></view>

		<view class="money-list">
			<view class="list" @click="moneyActive(item)" :class="item.ac?'ac':''" v-for="(item, index) in moneyArr" :key="item">
				<view class="p1">{{item.date}}</view>
				<view class="p2">￥{{item.money}}</view>
			</view>

		</view>

		<radio-group @change="radioChange">
			<cmd-cell-item title="微信支付" :slotLeft="true" :slotRight="true" :arrow="false">
				<template slot="slotLeft">
					<image mode="widthFix" src="/static/image/weixin@1x.png" class="list-img"></image>
				</template>
				<template slot="slotRight">
					<radio name="1" value="wechatpay" checked="true" />
				</template>
			</cmd-cell-item>
			<cmd-cell-item title="支付宝支付" :slotLeft="true" :slotRight="true" :arrow="false">
				<template slot="slotLeft">
					<image mode="widthFix" src="/static/image/zhifubaio@1x.png" class="list-img"></image>
				</template>
				<template slot="slotRight">
					<radio name="2" value="alipay" />
				</template>
			</cmd-cell-item>
		</radio-group>
		<button class="enter-btn" @click="send">确定</button>
	</view>
</template>

<script>
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-name-item.vue'
	export default {
		components: {
			cmdCellItem
		},
		data() {
			return {
				radio: '1',
				moneyArr: [{
						date: '1年',
						ac: true,
						money: 10
					},
					{
						date: '2年',
						ac: false,
						money: 20
					},
					{
						date: '永久',
						ac: false,
						money: 30
					},
				]
			}
		},
		onLoad() {

		},
		methods: {
			moneyActive(acItem) {
				this.moneyArr.some((item) => {
					if (acItem.date == item.date) {
						item.ac = true;
					} else {
						item.ac = false;
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	@import url("./css/buy.less");
</style>
