<template>
	<view class="page">
		<map  :style="' top: 0;height:'+topHeight+'px;width:'+windowWidth+'px'"  :longitude="lng" :latitude="lat" :circles="circles"  ></map>  
		<!-- <map key='map2'
		 :longitude="lng" :latitude="lat"
		style="width: 100%; height: 100%;position: fixed;top: 0;"
		> -->
		<!-- </map>  -->
		<!-- :circles="circles" -->
		<!-- <view style="position: fixed;bottom: 0rpx;z-index: 100;width: 700rpx;"> -->
			
		<!-- </view> -->
		<view class="create-wrap" :style="'position: relative;z-index: 100;height:'+bottomHeigh+'px'"> 
			<view class="tit">半径范围</view>
			<view class="range-row">
				<view class="range-min">100米</view>
				<slider @changing="changeing" :value="range" @change="finshChange" :step="1" :block-size="18" :min="100" :max="1000"
				 backgroundColor="#e5e5e5" />
				<view class="range-max">1000米</view>
			</view>
			<view class="show-txt"><text :style="{left:showLeft}">{{range}}米</text></view>
			<view class="tit">定位位置</view>
			<view class="address" @click="choseAddress">
				<view>
					<uni-icons type="location" size="24"></uni-icons>{{address.length==0?'点击选择地点':address}}
				</view>
			</view>
			<button type="primary" @click="back">确认</button>
		</view>
	</view> 
	
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	// import common from 'common.js'
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				lng: '116.39742',
				lat: '39.909',
				circles: [{
					latitude: 39.909,
					longitude: 116.39742,
					radius: 100,
					strokeWidth: 1,
					color: "#428BCA88",
					fillColor: "#B6E1F248",
				}],
				showLeft: '-7%',
				range: 100,
				address: '' ,
				topHeight:'',
				bottomHeigh:'',
				windowWidth:'',
			}
		},
		onLoad() {
			var _this = this ;
			var location = uni.getStorageSync('location');
			if (location) {
				_this.circles[0].latitude = location.latitude;
				_this.circles[0].longitude = location.longitude;
				_this.lng = location.longitude;
				_this.lat = location.latitude;
				_this.address = location.address;
				
			}else{
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						_this.circles[0].latitude = res.latitude;
						_this.circles[0].longitude = res.longitude;
						_this.lng =res.longitude ;
						_this.lat  =  res.latitude;
						// _this.address = location.address;
						console.log(res);
						
					}
				});
			}
			
			
			
			
			var range = uni.getStorageSync('range');
			console.log(location)
			if (range) {
				this.circles[0].radius = range;
				this.range = range;
				this.showLeft = (range - 100) / 900 * 100 - 7 + '%';
			} else {
				uni.setStorageSync('range', 100);
			}
			
			uni.getSystemInfo({
			    success: function (res) {
					_this.windowWidth = res.windowWidth ; 
					_this.topHeight = res.windowHeight*0.6
					_this.bottomHeigh =res.windowHeight -  (res.windowHeight*0.6)
			        console.log(res.windowHeight);
					console.log(res.windowWidth);
			    }
			});
		},
		onShow() {
			var jump = uni.getStorageSync('jump');
			if (jump) {
				uni.removeStorageSync('jump');
				uni.redirectTo({
					url: 'address'
				});
			}
		},
		methods: {
			changeing(e) {
				var range = e.detail.value;
				this.range = range;
				this.showLeft = (range - 100) / 900 * 100 - 7 + '%';
				uni.setStorageSync('range', range);
				this.circles[0].radius = range;
			},
			finshChange(e) {
				console.log(e)
				var range = e.detail.value;
				this.range = range;
				this.showLeft = (range - 100) / 900 * 100 - 7 + '%';
				uni.setStorageSync('range', range);
				this.circles[0].radius = range;
			},
			choseAddress() {
				var _this = this;
				uni.chooseLocation({
					success: function(res) {
						uni.setStorageSync('location', res);
						var location = uni.getStorageSync('location'); 
						// if (location) {
							_this.circles[0].latitude = location.latitude;
							_this.circles[0].longitude = location.longitude;
							_this.lng = location.longitude;
							_this.lat = location.latitude;
							_this.address = location.address;
							
						// }
						uni.setStorageSync('jump', true);
					}
				});
			},
			back() {
				uni.navigateBack()
			}
		},
	}
</script>

<style lang="less" scoped>
	@import url("./css/address.less");
</style>
