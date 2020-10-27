<template>
	<view style="position: fixed;width: 100%;height: 100%;">
	        <view class="uni-padding-wrap" style="width: 100%;height: 100%;">
	            <view class="page-section swiper" style="width: 100%;height: 100%;">
	                <view class="page-section-spacing" style="width: 100%;height: 100%;">
	                    <swiper class="swiper" style="width: 100%;height: 100%;" :autoplay="autoplay" :interval="interval" >
	                        <swiper-item style="width: 100%;height: 100%;">
	                           <image style="width: 100%;height: 100%;" src="../../static/image/yd1.jpg"></image>
	                        </swiper-item>
	                        <swiper-item style="width: 100%;height: 100%;">
	                            <image style="width: 100%;height: 100%;" src="../../static/image/yd2.jpg"></image> 
	                        </swiper-item>
	                        <swiper-item style="width: 100%;height: 100%;">
	                            <image style="width: 100%;height: 100%;" src="../../static/image/yd3.jpg"></image>
	                        </swiper-item>
							<swiper-item style="width: 100%;height: 100%;" >
							    <image @tap="dianji()" style="width: 100%;height: 100%;" src="../../static/image/yd4.jpg"></image>
							</swiper-item>
	                    </swiper>
	                </view>
	            </view>
	        </view>
	        
	        
	    </view>
</template>

<script>
	
	var _this = null
	export default {
		data() {
			return {
				indicatorDots: false,
				autoplay: false,
				interval:false
			}
		},
		
		mounted() {
			var daoh = uni.getStorageSync('daoh');
			if(daoh==1){
				uni.navigateTo({
					url: '/pages/index/index',
				});  
			} 
		},
		methods: {
			dianji(){ 
				uni.setStorage({
				    key: 'daoh',
				    data: '1',
				    success: function () {
				        uni.navigateTo({
				        	url: '/pages/index/index',
				        }); 
				    }
				});
				 
			},
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
