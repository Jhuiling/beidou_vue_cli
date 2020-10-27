<template>
  
</template>

<script>
import Binding from 'weex-bindingx';
import common from '@/common.js'	
export default {
    data(){
        return {
            deviceid:'' 
        }
    },
	onLoad(e){
		// console.log(1111111111111111111111)
		console.log(e.deviceid)
		var token = uni.getStorageSync('token');
		common.request('machine/shake', {token:token,deviceid:e.deviceid}, function(res) {
			console.log(res.data.info);
			uni.showModal({
			    title: '',
			    content: res.data.info,
			    showCancel: false,
			    success: function (res) {
			        if (res.confirm) {
			           uni.navigateBack({
			               delta: 1
			           });
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
			
		})
	},
    mounted() {
		// var token = uni.getStorageSync('token');
		// var deviceid = uni.getStorageSync('deviceid')
		// console.log(deviceid); 
		// common.request('machine/shake', {token:token,deviceid:deviceid}, function(res) {
		// 	console.log(res.data.info);
		// 	uni.showModal({
		// 	    title: '',
		// 	    content: res.data.info,
		// 	    showCancel: false,
		// 	    success: function (res) {
		// 	        if (res.confirm) {
		// 	           uni.navigateBack({
		// 	               delta: 1
		// 	           });
		// 	        } else if (res.cancel) {
		// 	            console.log('用户点击取消');
		// 	        }
		// 	    }
		// 	});
			
		// })
		// uni.getStorageSync('deviceid')
		// machine/shake  参数 deviceid  设备号  token
       
    }
}
</script>

<style>

</style>