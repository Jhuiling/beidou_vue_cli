<template>
	<view id="devicelist">
		<view class="type-wrap">
			<view class="item" :style="ys==0?'color:#ff4564':'color:#555555'" v-on:click="handleTap(0)">
				<view class="s-tit">所有设备</view>
				<!-- <uni-icons type="arrowdown" size="25" color="#999" /> -->
			</view>
			<view class="item" :style="ys==1?'color:#ff4564':'color:#555555'" v-on:click="handleTap(1)">
				<view class="s-tit">所有类型</view>
				<!-- <uni-icons type="arrowdown" size="25" color="#999" /> -->
			</view>
			<view class="item" :style="ys==2?'color:#ff4564':'color:#555555'" v-on:click="handleTap(2)">
				<view class="s-tit">在线状态</view>
				<!-- <uni-icons type="arrowdown" size="25" color="#999" /> -->
			</view>
		</view>

		<view class="list-wrap">
			<view class="list" v-for="(item,index) in list" :key="index">
				<view class="list-head">
					<view class="left">
						
						<image v-if="item.type == 1"   src="/static/image/big_weatch@2x.png"></image>
						<image v-if="item.type == 2"   src="/static/image/big_workcard@2x.png"></image>
						<view class="tit">{{item.alias}}</view>
					</view>
					<view class="right">
						<view class="p-tit p">电量:</view>
						<view class="p-txt p">{{item.machineInfo.batt}}%</view>
						<image class="p-tit-img"   src="/static/image/g_single@2x.png" >
						</image>
						<view class="p-txt p">{{item.is_online == 0 ? '在线' : '离线'}}</view>
					</view>
				</view>
				<view class="list-content">
					<view class="text-row">
						<text class="c-tit">时间:</text>
						<text class="c-txt">{{item.update_time}}</text>
					</view>
					<view class="text-row">
						<text class="c-tit">地址:</text>
						<text class="c-txt">{{item.machineInfo.address}}</text>
					</view>
				</view>

				<view class="list-foot">
					<view class="btn" @tap="goUrl('/pages/localtion/index',item.deviceid)">
						<image  src="/static/image/shebeiguanli_11.jpg" class="f-img"></image>
						<view class="f-txt">定位</view>
					</view>
					<view class="btn" @tap="goUrl('/pages/trajectory/index',item.deviceid)">
						<image  src="/static/image/shebeiguanli_13.jpg" class="f-img"></image>
						<view class="f-txt">轨迹</view>
					</view>
					<view class="btn"  @tap="goUrl('/pages/alarm/index', item.deviceid)">
						<image  src="/static/image/shebeiguanli_15.jpg" class="f-img"></image>
						<view class="f-txt">警报</view>
					</view>
					<view class="btn" @tap="goUrl('/pages/setting/details',item.deviceid)">
						<image  src="/static/image/shebeiguanli_17.jpg" class="f-img"></image>
						<view class="f-txt">详情</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import common from 'common.js'
	export default {
		components: {
			uniNavBar,
		},
		data() {
			return {
				list: [],
				value: '',
				label: '',
				ys:0,
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
			uni.showLoading({
				title: '加载中'
			});
		},
		mounted() {
			_this = this;
			_this.mechineList();
		},
		methods: {
			goUrl(url,deviceid) {
				uni.navigateTo({
					url:url+"?deviceid="+deviceid
				})
			},
			mechineList() {
				common.request('machine/machine_list', {}, function(res) {
					// console.log(res) 
					_this.list = res.data.info;
					console.log(_this.list)
					uni.hideLoading();
				})
			},
			handleTap(e) {
				console.log(e)
				var types = e ;
				_this.ys = e ;
				common.request('machine/machine_list', {types:types}, function(res) {
					_this.list = res.data.info;
					console.log(_this.list)
					uni.hideLoading();
				})
				// this.$refs.picker.show()
			},
			handleChange(item) {
			},
			handleConfirm(item) {
				this.label = item.item.label
			},
			handleCancle(item) {
			}
		},
		onPullDownRefresh() {
			if (this.current == 1) {
				uni.startPullDownRefresh();
				this.goodList = [];
				this.getlist();
			}
		},
	}
</script>

<style lang="less" scoped>
	@import url("./css/main.less");
</style>
