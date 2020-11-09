<template>
	<!-- <view class="container">
		<view class="header">
			<input type="text" v-model="keywords" class="input" @input="handlerInput" />
		</view>
		<view class="list" v-if="list.length">
			<view class="item" v-for="item in list" :key="item.id" @click="handlerSelect(item)">
				<view class="name">{{item.name}}</view>
				<view class="address">{{item.address.length?item.address:item.district}}</view>
			</view>
		</view>
	</view> -->
</template>

<script>
	import AMapWXfile from '@/plugins/amap-wx.js'
	export default {
		data() {
			return {
				keywords: '',
				list:[],
				deviceid:null,
				token:null
			}
		},
		onLoad(e) {
			this.deviceid  = e.deviceid
			setTimeout(()=>{
				uni.chooseLocation({
					success: function(res) {
						let {longitude,latitude}=res
						uni.redirectTo({
							url:"/pages/enclosure/create?deviceid="+this.deviceid+'&longitude='+longitude+'&latitude='+latitude
						})
					},
					fail:function(res){
						uni.redirectTo({
							url:"/pages/enclosure/create?deviceid="+this.deviceid
						})
					}
				});
			},1000)
		},
		methods: {
			handlerInput() {
				var self = this
				if(this.keywords.trim()){
					var myAmapFun = new AMapWXfile.AMapWX({key: '9751ba7066e405d0f351b49dcc8b9704'});
					myAmapFun.getInputtips({
					  keywords: self.keywords,
					  location: '',
					  success: function(data){
						if(data && data.tips){
							let newList = data.tips.filter((item)=>{
								return item.location.length
							})
							self.list = newList;
							console.log(self.list)
						}
					  }
					})
				}else{
					self.list=[]
					
				}
			},
			handlerSelect(item){
				let [longitude,latitude] = item.location.split(',')
				uni.redirectTo({
					url:"/pages/enclosure/create?deviceid="+this.deviceid+'&longitude='+longitude+'&latitude='+latitude
				})
			}
		}
	}
</script>

<style>
	.header {
		height: 100rpx;
		border-bottom: 1rpx #eeeeee solid;
		display: flex;
		align-items: center;
		padding: 0 40rpx;
	}

	.input {
		background: #EEEEEE;
		height: 80rpx;
		width: 100%;
		border-radius: 40rpx;
		padding-left: 40rpx;
	}
	.item{
		min-height: 100rpx;
		border-bottom: 1rpx #eeeeee solid;
		padding:0 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.address{
		color: #999999;
		font-size: 24rpx;
	}
</style>
