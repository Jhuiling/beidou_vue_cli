<template>
	<view class="page">
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
						<view class="item" v-for="item in [0,1,2,3,4,5,6,7,8]">
							<image src="/static/image/home_icon_13.jpg" alt="" class="icon"></image>
							<view class="text">位置</view>
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
						<view class="row" v-for="item in addressList">
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
				</view>
				<view style="background: #eee;border-radius: .1rem;height:2rem;display: flex;align-items: center;justify-content: center;margin: .2rem 0 .5rem;color:#999;">
					预留广告位
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var MAP,_this;
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
				key:'6377b012084115e1ce080a3d8b3cd752',
				createShow: true,
				close: true,
				work:'',
				home:'',
				addressList: [],
				path:[],
				polygon:{},
				polylineEditor:{}
			}
		},
		onLoad() {
		},
		onShow() {
			// this.nowLocation();
		},
		mounted() {
			_this = this;
			_this.initMap()
		},
		methods: {
			initPath() {
				_this.path = [
				new AMap.LngLat(116.335354,40.031118),
				new AMap.LngLat(116.33544,40.030996),
				new AMap.LngLat(116.335459,40.030894),
				new AMap.LngLat(116.335053,40.030854),
				new AMap.LngLat(116.335354,40.031118)]
			},
			initPolygon() {
				_this.initPath()
				_this.polygon = new AMap.Polygon({
					path: _this.path,  
					fillColor: '#d4dff5', // 多边形填充颜色
					borderWeight: 2, // 线条宽度，默认为 1
					strokeColor: '#fff', // 线条颜色
				});
				_this.drawPolygon()
			},
			initMap() {
				MAP = new AMap.Map('map',{
					 zoomEnable:false,
					dragEnable: false,
					center:[116.33545,40.030995],
					zoom:18
				});
				_this.initPolygon();
			},
			drawPolygon() {
				MAP.add(_this.polygon);
				MAP.setFitView([ _this.polygon ])
				MAP.plugin(["AMap.PolyEditor"],function(){
				_this.polylineEditor = new AMap.PolyEditor(MAP,_this.polygon); 
				_this.polylineEditor.open();
				}); 				
			},
			editorPolygon() {				 
			},
			getMarker(data) {
				
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
