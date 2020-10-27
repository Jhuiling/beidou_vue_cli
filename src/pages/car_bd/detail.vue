<template>
	<view>
		<view class="detail-top">
			<image src="/static/image/head_none@2x.png" class="head-img"></image>
			<view class="name">设备名称——设备型号</view>
			<view class="num">IMEI:01713900107</view>
			<view class="num">ICCID:89860402101970243288</view>
		</view>
		<view class="detail-list">
			<cmd-cell-item title="设备昵称" slotRight :arrow="false">
				<view>
					<input type="text" class="nike-input" placeholder="请输入16位字符昵称">
				</view>
			</cmd-cell-item>
			<cmd-cell-item title="设备昵称" slotRight :arrow="false">
				<view>
					<uni-tag text="主" size="small"></uni-tag>
					<view class="nike">账户昵称</view>
				</view>
			</cmd-cell-item>

			<view style="height: 15rxp;background: #f2f2f2;border:none;"></view>
			<cmd-cell-item title="设备二维码" slotRight :arrow="false">
				<view>
					<image src="/static/image/ercode@2x.png" style="height:60rpx;width: 60rpx;"></image>
				</view>
			</cmd-cell-item>
			<cmd-cell-item title="激活日期" addon="2019.09.14 18:00" :arrow="false"></cmd-cell-item>
			<cmd-cell-item title="到期日期" slotRight :arrow="false">
				<view>
					<view class="buy-btn">续费</view>
					<view class="text-color1">2019.12.14 18:00</view>
				</view>
			</cmd-cell-item>

			<view style="height: 0.15rem;background: #f2f2f2;border:none;"></view>

			<cmd-cell-item title="车牌号" addon="SZ1728SA" :arrow="false"></cmd-cell-item>
			<cmd-cell-item title="车型" addon="XXXX" :arrow="false"></cmd-cell-item>
			<cmd-cell-item title="车架号" addon="XXXX" :arrow="false"></cmd-cell-item>
			<cmd-cell-item title="保险到期" addon="2019.12.23" :arrow="false"></cmd-cell-item>
			<cmd-cell-item title="发动机号" addon="XXXX" :arrow="false"></cmd-cell-item>

			<!-- <van-button class="over-btn">解绑设备</van-button> -->


		</view>

	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import LbPicker from '@/components/lb-picker'
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import common from 'common.js'
	export default {
		components: {
			uniIcons,
			uniNavBar,
			LbPicker,
			cmdCellItem,
			uniTag
		},
		data() {
			return {
				list: [],
				value: '',
				label: '',
				packList: [{
						label: '选项一',
						value: 'A'
					},
					{
						label: '选项二',
						value: 'B'
					}
				]
			}
		},
		onLoad() {

		},
		mounted () {
			this.getDetials()
		},
		methods: {
		
		},
	}
</script>

<style lang="less" scoped>
	@import url("./css/detail.less");
</style>
