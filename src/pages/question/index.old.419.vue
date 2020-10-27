<template>
	<div>
		<div>
			<div class="box">
				<image class="image" src="../../static/image/urcode@2x.png" mode="widthFix"></image>
			</div>
			<div class="box top-2">
				<image  class="image" src="../../static/image/google@2x.png" mode="widthFix"></image>
			</div>
			<div class="box top-3">
				<image  class="image" src="../../static/image/google@2x.png" mode="widthFix"></image>
			</div>
			<div class="bottom-box bottom-1">
				<image  class="image" src="../../static/image/alarms@2x.png" mode="widthFix"></image>
			</div>
			<div class="bottom-box bottom-2">
				<image  class="image" src="../../static/image/call@2x.png" mode="widthFix"></image>
			</div>
			<div class="bottom-box bottom-3">
				<image  class="image" src="../../static/image/record@2x.png" mode=""></image>
			</div>
		</div>
		<div class="w-ctrl" @tap="openSel">
			<div class="w-box">
				<image class="w-img" v-bind:src="change == 0 ? '../../static/image/big_cuff@2x.png' : '../../static/image/shebei4.png'" mode=""></image>
			</div>
			<div class="w-arrow">
				<image class="w-arrow-image" src="../../static/image/right.png" mode=""></image>
			</div>
		</div>
		<div class="sel-device" v-if="selOpen">
			<radio-group>
			<div v-if="index == change" v-for="(item,index) in  machineLists" :key="index" v-bind:class=" index == 0 ? 'dv-list active' : 'dv-list'" @tap="changes(index)">
				<div class="dv-body">
					<image class="dv-list-image" v-bind:src="item.type == 1 ? '../../static/image/big_cuff@2x.png' : '../../static/image/shebei4.png'"></image>
					<text class="dv-list-text">{{item.alias}}</text><text class="dv-tips">已选择当前设备</text>
				</div>
			</div>
			<div v-if="index != change" v-for="(item,index) in  machineLists" :key="index" v-bind:class=" index == 0 ? 'dv-list active' : 'dv-list'" @tap="changes(index)">
				<div class="dv-body">
					<image class="dv-list-image" v-bind:src="item.type == 1 ? '../../static/image/big_cuff@2x.png' : '../../static/image/shebei4.png'"></image>
					<text class="dv-list-text">{{item.alias}}</text>
					<radio class="dv-tips" />
				</div>
			</div>
			</radio-group>
			<div class="dv-close" @tap="closeSel"> 
				<image class="dv-close-image" src="../../static/image/up.png"></image>
			</div>
		</div>
		<div class="w-info" v-if="watchOpen">
			<div class="w-close" @tap="closeWatchInfo">
				<image class="w-close-image" src="../../static/image/close@2x.png" mode=""></image>
			</div>
			<div class="w-item">
				<text class="w-title">名称:</text>
				<text class="w-txt">{{machineInfo.alias}}</text>
				<image class="w-image" src="../../static/image/g_single@2x.png" mode="widthFix"></image>
				<text class="w-txt">在线</text>
				<text class="w-title">电量:</text>
				<text class="w-txt">{{machineInfo.batt}}%</text>
			</div>
			<div class="w-item">
				<text class="w-title">状态:</text>
				<text class="w-txt">{{machineInfo.status == 1 ? '静止' : '移动中'}}({{machineInfo.starup_time}})</text>
				<text class="w-title">当前速度:</text>
				<text class="w-txt">{{machineInfo.speed}}(Km/H)</text>
			</div>
			<div class="w-item">
				<text class="w-title">定位时间:</text>
				<text class="w-txt">{{machineInfo.create_time}}</text>
			</div>
			<div class="w-item">
				<text class="w-title">信号时间:</text>
				<text class="w-txt">{{machineInfo.create_time}}</text>
			</div>
			<div class="w-item">
				<text class="w-title">经度:</text>
				<text class="w-txt">{{machineInfo.longitude}}</text>
				<text class="w-title">维度:</text>
				<text class="w-txt">{{machineInfo.latitude}}</text>
			</div>
			<div class="w-ads">
				<text class="w-title">地址:</text>
				<text class="w-txt">{{machineInfo.address}}</text>
			</div>
		</div>
		<div ref="showshare" :class="close?'create-wrap-close':'create-wrap-open'" class="create-wrap">
			<div class="show-btn" @click="togglePopup()">
				<image class="show-btn-image" :src="close?'/static/image/up.png':'/static/image/down.png'" mode="scaleToFill"></image>
			</div>
			<div class="inner" ref="createInner">
				<div class="search-box">
					<image src="/static/image/home_icon_06.jpg" class="left-icon"></image>
					<input type="text" class="search-input" placeholder="查找地点、公交、地铁" />
					<text class="right-text">搜索</text>
				</div>
				<div class="list-box" :style="close?'overflow:hidden':'overflow:auto'">
					<div class="btn-list">
						<div class="item" v-for="(item,index) in menuList" :key="index" @tap="goUrl(item)">
							<image v-bind:src="item.icon" alt="" class="icon"></image>
							<text class="btn-list-text">{{item.name}}</text>
						</div>
					</div>
					<div class="tit"><text class="tit-text">常去地点</text></div>
					<div class="ads-wrap">
						<div class="row row-two">
							<div class="ads-wrap-item" v-if="home==null" @click="addAddress(1)">
								<image class="row-item-icon" src="/static/image/ahome@2x.png" alt=""></image>
								<text class="row-item-txt">我的家</text>
							</div>
							<div class="ads-wrap-item" v-else>
								<image class="row-item-icon" src="/static/image/ahome@2x.png" alt=""></image>
								<text class="row-item-txt">{{home.address}}</text>
								<image class="row-item-icon del-icon" src="/static/image/close@2x.png" @click="removeAddress(home.id)"></image>
							</div>
							<div class="ads-wrap-item" v-if="work==null" @click="addAddress(1)">
								<image class="row-item-icon" src="/static/image/workplace@2x.png" alt=""></image>
								<text class="row-item-txt">我的单位</text>
							</div>
							<div class="ads-wrap-item" v-else>
								<image class="row-item-icon" src="/static/image/workplace@2x.png" alt=""></image>
								<text class="row-item-txt">{{work.address}}</text>
								<image class="row-item-icon del-icon" src="/static/image/close@2x.png" @click="removeAddress(work.id)"></image>
							</div>
						</div>
						
					</div>
					<div class="row" v-for="(item,index) in addressList" :key="index">
							<div class="row-item">
								<text class="row-item-txt">{{item.address}}</text>
								<image class="row-item-icon del-icon" src="/static/image/close@2x.png" @click="removeAddress(item.id)"></image>
							</div>
						</div>
						<div class="row" @click="addAddress(0)">
							<div class="row-item">
								<image class="row-item-icon" src="/static/image/map_more@2x.png" alt=""></image>
								<text class="row-item-txt">添加地点</text>
							</div>
						</div>
				</div>
				<div style="background-color: #eee;border-radius: .1rem;height:2rem;display: flex;align-items: center;justify-content: center;margin: .2rem 0 .5rem;color:#999;">
					预留广告位
				</div>
			</div>
		</div>
		<div class="nav-bar">
			<div class="nav-bar-item" @click="navTo('/pages/index/index')">
				<image class="nav-bar-item-icon" src="../../static/image/home@3x.png"></image>
				<text class="nav-bar-item-text">首页</text>
			</div>
			<div class="nav-bar-item" @click="navTo('/pages/store/index')">
				<image class="nav-bar-item-icon" src="../../static/image/store@3x.png"></image>
				<text class="nav-bar-item-text">商城</text>
			</div>
			<div class="nav-bar-item" @click="navTo('/pages/me/index')">
				<image class="nav-bar-item-icon" src="../../static/image/me@3x.png"></image>
				<text class="nav-bar-item-text">我的</text>
			</div>
		</div>
		<map key='map1' :style="{width: '750rpx', height: mapHeight + 'rpx'}" :latitude="latitude" :longitude="longitude"
		 :polyline="polylines">
		</map>
	</div>
</template>

<script>
	import Binding from 'weex-bindingx';
	import common from '@/common.js'
	const domModule = weex.requireModule('dom')
	var _this = null
	export default {
		data() {
			return {
				map: null,
				mapHeight: 1334,
				// 屏幕高度
				screenHeight: 667,
				latitude: 39.909,
				longitude: 116.39742,
				polylines: [],

				testdiv: "testdiv",
				topSize: 769,
				// 向上滑动的距离
				topHeight: 0,
				isTop: false,
				// 初始化禁止滑动
				scrollable: false,
				refreshing: false,
				contentOffsetY: 10,
				machineLists:[],
				machineInfo:{},
				createShow: true,
				close: true,
				addressList: [],
				home: '',
				work: '',
				change: 0,
				selOpen: false,
				watchOpen: true,
				imgList:[
					
				],
				menuList:[{
					name:'位置',
					path: '',
					src:'/static/image/location@2x.png'
				},{
					name:'警报',
					path:'/pages/alarm/index',
					src:'/static/image/alarm@2x.png'
				},{
					name:'运动',
					path:'',
					src:'/static/image/sport@2x.png'
				},{
					name:'围栏',
					path:'/pages/enclosure/index',
					src:'/static/image/fence@2x.png'
				},{
					name:'轨迹',
					path:'/pages/trajectory/index',
					src:'/static/image/trajectory@2x.png'
				},{
					name:'健康',
					path:'/pages/health/index',
					src:'/static/image/hearts@2x.png'
				},{
					name:'设置',
					path:'/pages/setting/index',
					src:'/static/image/set@2x.png'
				},{
					name:'设备详情',
					path:'/pages/setting/details',
					src:'/static/image/equipment@2x.png'
				},{
					name:'遥控拍照',
					path:'/pages/camera/index',
					src:'/static/image/photo@2x.png'
				},],
				latitude: 39.909,
				longitude: 116.39742,
			}
		},
		beforeCreate() {
			_this = this;
		},
		onReady() {
			let that = this;

		},
		mounted() {
			_this.getMachineList();
			_this.getMachineInfo()
		},
		watch: {},
		methods: {
			navTo(url) {
				uni.switchTab({
					url: url
				});
			},
			// 获取常去地点
			getAddress(){
				common.request('machine/localhost', {}, function(res) {
					_this.addressList = res.data.info
				})
				
			},
			// 获取设备详情
			getMachineInfo(){
				common.request('machine/index', {}, function(res) {
					_this.machineInfo = res.data.info
				})
				
			},
			// 获取设备列表
			getMachineList() {
				common.request('machine/machine_list', {}, function(res) {
					_this.machineLists = res.data.info;
					if(!uni.getStorageSync('deviceid')) {
						uni.setStorageSync('deviceid',_this.machineLists[0].machineInfo.deviceid) 
					} 
					// _this.machineInfo = _this.machineLists[_this.change].machineInfo
					_this.$forceUpdate()
					_this.getRole()
				})
			},
			// 路由跳转
			goUrl(item) {
				console.log('url',item)
				uni.navigateTo({
					url: item.url
				});
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
			// 获取功能
			getRole () {
				common.request('/machine/auth_role',{
					deviceid: uni.getStorageSync('deviceid')
				}, function (res) {
					_this.menuList = res.data.info
				})
			},
			changes(index) {
				_this.change = index;
				_this.machineInfo = _this.machineLists[_this.change]
				uni.setStorageSync('deviceid',_this.machineInfo.deviceid)
				_this.selOpen = false
				_this.$forceUpdate()
			},
			togglePopup() {
				this.close = !this.close;
			},
			getAddress() {
				common.request('index/getAddress', {}, function(res) {
					_this.addressList = res.data.info.list;
					_this.home = res.data.info.home;
					_this.work = res.data.info.work;
				})
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
			addAddress(type) {
				uni.chooseLocation({
					success: function(res) {
						var data = {};
						data.lng = res.longitude;
						data.lat = res.latitude;
						data.address = res.address;
						data.type = type;
						common.request('index/createAddress', data, function(res) {
							uni.showToast({
								icon: 'none',
								position: 'center',
								title: res.data.info
							});
							_this.getAddress();
						})
					}
				});
			},
			removeAddress(addressId) {
				common.request('index/deleteAddress', {
					id: addressId
				}, function(res) {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: res.data.info
					});
					_this.getAddress();
				})
			}
		}
	}
</script>

<style>
	@import "./css/index.css";

	.testdiv {
		width: 750rpx;
		height: 1600rpx;
		position: fixed;
		/* background-color: #007AFF; */
	}
</style>
