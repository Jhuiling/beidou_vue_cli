<template>
	<view class="page">
		<map id='map' class="maps" :show-location="true" :scale="scale" :style="{width: '750rpx', height:'100vh'}" :latitude="latitude" :longitude="longitude"
		></map>
		<view class="box">
			<image src="../../static/image/urcode@2x.png" mode=""></image>
		</view>
		<view class="box top-2">
			<image src="../../static/image/google@2x.png" mode=""></image>
		</view>
		<view class="box top-3">
			<image src="../../static/image/google@2x.png" mode=""></image>
		</view>
		<view class="bottom-box bottom-1">
			<image src="../../static/image/alarms@2x.png" mode=""></image>
		</view>
		<view class="bottom-box bottom-2">
			<image src="../../static/image/call@2x.png" mode=""></image>
		</view>
		<view class="bottom-box bottom-3">
			<image src="../../static/image/record@2x.png" mode=""></image>
		</view>
		<view class="w-ctrl" @tap="openSel">
			<view class="w-box">
				<image class="w-img" v-bind:src="change == 0 ? '../../static/image/big_cuff@2x.png' : '../../static/image/shebei4.png'" mode=""></image>
			</view>
			<view class="w-arrow">
				<image src="../../static/image/right.png" mode=""></image>
			</view>
		</view>
		<view class="sel-device" v-if="selOpen">
			<radio-group>
			<view v-for="(item,index) in  machineLists" :key="index" class="dv-list" :class=" index == 0 ? 'dv-list active' : 'dv-list'" @tap="changes(index)">
				<image v-bind:src="item.type == 1 ? '../../static/image/big_cuff@2x.png' : '../../static/image/shebei4.png'"></image>
				<text>{{item.alias}}</text>
				<text class="dv-tips" v-if="index == change">
					已选择当前设备
				</text>
				<radio v-else class="dv-tips" />
			</view>
			</radio-group>
			<view class="close" @tap="closeSel"> 
				<image src="../../static/image/up.png"></image>
			</view>
		</view>
		<view class="w-info" v-if="watchOpen">
			<view class="w-close" @tap="closeWatchInfo">
				<image src="../../static/image/close@2x.png" mode=""></image>
			</view>
			<view class="w-item">
				<text class="w-title">
					名称:
				</text>
				<text>
					{{machineInfo.alias}}
				</text>
				<image src="../../static/image/g_single@2x.png" mode=""></image>
				在线
				<text class="w-title">
					电量:
				</text>
				<text>
					{{machineInfo.batt}}%
				</text>
			</view>
			<view class="w-item">
				<text class="w-title">
					状态:
				</text>
				<text>
					{{machineInfo.status == 1 ? '静止' : '移动中'}}({{machineInfo.starup_time}})
				</text>
				<text class="w-title">
					当前速度:
				</text>
				<text>
					{{machineInfo.speed}}(Km/H)
				</text>
			</view>
			<view class="w-item">
				<text class="w-title">
					定位时间:
				</text>
				<text>
					{{machineInfo.create_time}}
				</text>
			</view>
			<view class="w-item">
				<text class="w-title">
					信号时间:
				</text>
				<text>
					{{machineInfo.create_time}}
				</text>
			</view>
			<view class="w-item">
				<text class="w-title">
					经度:
				</text>
				<text>
					{{machineInfo.longitude}}
				</text>
				<text class="w-title">
					维度:
				</text>
				<text>
					{{machineInfo.latitude}}
				</text>
			</view>
			<view class="w-ads">
				<text class="w-title">
					地址:
				</text>
				<text>
					{{machineInfo.address}}
				</text>
			</view>
		</view>
		<view ref="showshare" :class="close?'create-wrap-close':'create-wrap-open'" class="create-wrap">
			<view class="show-btn" @click="togglePopup()">
				<image :src="close?'/static/image/up.png':'/static/image/down.png'" mode="scaleToFill"></image>
			</view>
			<view class="inner" ref="createInner">
				<view class="search-box">
					<image src="/static/image/home_icon_06.jpg" class="left-icon"></image>
					<input type="text" class="search-input" placeholder="查找地点、公交、地铁" />
					<text class="right-text">搜索</text>
				</view>
				<view class="list-box" :style="close?'overflow:hidden':'overflow:auto'">
					<view class="btn-list">
						<view class="item" v-for="(item,index) in menuList" :key="index" @tap="goUrl(item)">
							<image v-bind:src="item.icon" alt="" class="icon"></image>
							<view class="text">{{item.name}}</view>
						</view>
					</view>
					<h2 class="tit">常去地点</h2>
					<view class="ads-wrap">
						<view class="row row-two">
							<view class="item" v-if="home==null" @click="addAddress(1)">
								<image class="icon" src="/static/image/ahome@2x.png" alt=""></image>
								<text class="txt">我的家</text>
							</view>
							<view class="item" v-else>
								<image class="icon" src="/static/image/ahome@2x.png" alt=""></image>
								<text class="txt">{{home.address}}</text>
								<image class="icon del-icon" src="/static/image/close@2x.png" @click="removeAddress(home.id)"></image>
							</view>
							<view class="item" v-if="work==null" @click="addAddress(1)">
								<image class="icon" src="/static/image/workplace@2x.png" alt=""></image>
								<text class="txt">我的单位</text>
							</view>
							<view class="item" v-else>
								<image class="icon" src="/static/image/workplace@2x.png" alt=""></image>
								<text class="txt">{{work.address}}</text>
								<image class="icon del-icon" src="/static/image/close@2x.png" @click="removeAddress(work.id)"></image>
							</view>
						</view>
						
					</view>
					<view class="row" v-for="(item,index) in addressList" :key="index">
							<view class="item">
								<text class="txt">{{item.address}}</text>
								<image class="icon del-icon" src="/static/image/close@2x.png" @click="removeAddress(item.id)"></image>
							</view>
						</view>
						<view class="row" @click="addAddress(0)">
							<view class="item">
								<image class="icon" src="/static/image/map_more@2x.png" alt=""></image>
								<text class="txt">添加地点</text>
							</view>
						</view>
				</view>
				<view style="background: #eee;border-radius: .1rem;height:2rem;display: flex;align-items: center;justify-content: center;margin: .2rem 0 .5rem;color:#999;">
					预留广告位
				</view>
			</view>
		</view>
		<tabBar :currentPage="currentPage"></tabBar>
	</view>
</template>

<script>
	var _this;
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import tabBar from '@/components/tabBar.vue';
	import common from 'common.js'
	export default {
		components: {
			uniSection,
			uniIcons,
			tabBar
		},
		data() {
			return {
				currentPage: 'tabBar',
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
				polylines:[{
					points:[{
						latitude: 39.9091,
						longitude:116.3975
					},{
						latitude: 39.9091,
						longitude:116.3977
					},{
						latitude: 39.9091,
						longitude:116.398
					},{
						latitude: 39.9098,
						longitude:116.3985
					},{
						latitude: 39.9098,
						longitude:116.3989
					},{
						latitude: 39.9098,
						longitude:116.3995
					}],
					width: 2,
					color: "FEAA34"
				}],
				scale:18,
				map:null
			}
		},
		onLoad() {
			
			this.getAddress();
		},
		onShow() {
			// setTimeout(function () {
			// 	_this.showMap = true;
			// },500)
			setInterval(function() {
				_this.getLocation();
			}, 100000);
			this.nowLocation();
		},
		mounted() {
			_this = this;
			
			_this.getMachineList()
			_this.getMachineInfo()
			_this.getAddress()
			// _this.map = plus.maps.create('map', {
			// 	width: '750rpx',
			// 	height: '1280rpx',
			// 	position: 'static'
			// });
		},
		methods: {
			
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
					_this.machineInfo = _this.machineLists[_this.change].machineInfo
					_this.$forceUpdate()
					_this.getRole()
				})
			},
			// 路由跳转
			goUrl(item) {
				console.log(item)
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
		},

	}
</script>

<style lang="less" scoped>
	.uni-transition {
		bottom: calc(var(--window-bottom) + 0);
	}

	@import url("./css/main.less");
</style>
