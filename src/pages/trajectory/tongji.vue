<template>
<view>
    <!-- <uni-nav-bar left-icon="back" :fixed="true" :status-bar="true"  title="轨迹" @clickLeft="goBack" ></uni-nav-bar> -->
    <view class="page">
        <view class="event-list " @tap="goDetails">
            <image class="car-icon" src="../../static/image/car@2x.png"></image>
            <text class="car-name">里程统计</text>
        </view>
		
		<view class="event-list " @tap="tingliu">
		    <image class="car-icon" src="../../static/image/car@2x.png"></image>
		    <text class="car-name">停留统计</text>
		</view>
    </view>
    </view>
</template>
<script>
    var _this;
    import dateTime from '@/components/yu-datetime-picker/yu-datetime-picker.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import common from 'common.js'
	export default {
		
        data() {
            return {
               deviceid:''  
            }
        },
		onLoad(e){
			var _this = this ; 
			_this.deviceid = e.deviceid 
			console.log(e.deviceid)
		},
        mounted(e) {
        },   
        methods:{ 
            
            goDetails() {
				var _this = this ; 
				var token = uni.getStorageSync('token');
				var deviceid  = _this.deviceid ; 
				console.log(token) 
				// start_time:_this.start_time,
				// end_time:_this.end_time,
                uni.navigateTo({
                    url:'/pages/trajectory/licheng?deviceid='+deviceid
                })
            },
			tingliu(){ 
				var _this = this ;
				 var deviceid  = _this.deviceid ; 
				uni.navigateTo({
				    url:'/pages/trajectory/tingliu？deviceid='+deviceid
				})
				
			},
        }
    }
    </script>
    <style lang="less" scoped>
	.uni-transition {
		bottom: calc(var(--window-bottom) + 0);
	}

	@import url("./css/main.less");
</style>