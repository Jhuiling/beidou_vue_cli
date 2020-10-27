<template>
    <view>
    <uni-nav-bar left-icon="back" :fixed="true" :status-bar="true"  title="汽车绑定" @clickLeft="goBack" ></uni-nav-bar>
    <view class="page">
        <view class="device">
            <view class="info">
                <view class="logo"><image :src="urlbtx?'../../static/image/weatch@2x.png':'../../static/image/shebei4.png'"></image></view>
                <view  v-if="alias">{{alias}}</view>
				<view v-else>设备名称</view>
                <view class="subtitle" v-if="deviceid" >IMEI：{{deviceid}}</view>
				<view class="subtitle" v-else>IMEI(设备型号)</view>
            </view>
            <view class="item">
                <text class="title">设备昵称</text>
                <view class="subtitle">
                    <input class="uni-input" v-model="alias" type="text" placeholder="请输入昵称" />
                </view>
            </view>
			<view class="item">
			    <text class="title">设备号</text>
			    <view class="subtitle">
			        <input class="uni-input" v-model="deviceid" type="number" placeholder="请输入16设备号" maxlength="16"/>
			    </view>
			</view>
            <view class="item use-people" >
                <view class="title">选择使用人</view>
                <view class="use-list">
                   <view class="renbox">
					    <image :src="use_user==1?'../../static/image/people_a@3x.png':'../../static/image/people_sa@3x.png'" @click="aliassss(1)"></image>
						<text class="rentext">轿车  </text>
				   </view>
				   <view class="renbox">
						<image  :src="use_user==2?'../../static/image/people_b@3x.png':'../../static/image/people_sb@3x.png'" @click="aliassss(2)"></image>
						<text class="rentext">警车</text>
				   </view>
				   <view class="renbox">
						<image   :src="use_user==3?'../../static/image/people_c@3x.png':'../../static/image/people_sc@3x.png'" @click="aliassss(3)"></image>
						<text class="rentext">货车</text>
				   </view>
				   <view class="renbox">
						<image   :src="use_user==4?'../../static/image/people_d@3x.png':'../../static/image/people_sd@3x.png'" @click="aliassss(4)"></image>
						<text class="rentext">环卫车</text>
				   </view>
				   <view class="renbox">
						<image  :src="use_user==5?'../../static/image/people_e@3x.png':'../../static/image/people_se@3x.png'" @click="aliassss(5)"></image>
						<text class="rentext">工程车 </text>
				   </view>
                </view>
            </view>
            
            <view class="item">
                <text class="title">设备二维码</text>
                <view class="arrow">
                    <image src="../../static/image/right.png"></image>
                </view>
            </view>
        </view>
        <button type="default" class="btn" @tap="addwatch">绑定设备</button>
    </view> 
    </view>
</template>
<script>
	var _this;
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
                showPay: false,
                wechatPay:false,
                alias:'',
				deviceid:'',
				use_user:1,
				urlbtx:false
            }
        }, 
		onLoad(e) {
			 _this = this;
			 console.log(e) ;
			 if(e.deviceid){
				_this.deviceid = e.deviceid
				common.request('machine/bind_fetch',{deviceid:e.deviceid}, function (res){
					console.log(res)
					if(res.data.info.type){
						_this.urlbtx = true
					}else{
						_this.urlbtx = false
					}
					console.log(res.data.info.type)
				});
			 }
		},
        mounted() {
			
        },
        methods: {
			aliassss(e){
				_this.use_user = e
			},
            initData(){
                common.request('machine/bind_fetch',{deviceid:uni.getStorageSync('deviceid')}, function (res){
					console.log(res)
				});
            },
            addwatch(){
				if(_this.deviceid==''){
					uni.showToast({
					    title: '请输入设备号',
					    duration: 2000,
						icon :"none"
					});
					return false 
				}
				if(_this.alias==''){
					uni.showToast({
					    title: '请输入昵称',
					    duration: 2000,
						icon :"none"
					});
					return false 
				}
				if(_this.use_user==''){
					uni.showToast({
					    title: '请选择人群',
					    duration: 2000,
						icon :"none"
					});
					return false 
				}
				common.request('car/bind_fetch',{
					alias:_this.alias,
					deviceid:_this.deviceid,
					use_user:_this.use_user
				}, function (res){
					console.log(_this.alias)
					console.log(_this.deviceid)
					console.log(_this.use_user)
					common.request('car/bind_machine',{
						alias:_this.alias,
						deviceid:_this.deviceid,
						use_user:_this.use_user
					}, function (res){
						console.log(res)
						if(res.data.info.type){
							_this.urlbtx = true
						}else{
							_this.urlbtx = false
						}
						// uni.reLaunch({
						//     url:'/pages/index/index'
						// })
						
					});
					console.log(res)
					uni.showToast({
					    title: res.data.info,
					    duration: 2000,
						icon :"none"
					});
				});
			},
            goAdmin() {
                uni.navigateTo({
                    url:'/pages/admin/index'
                })
            },
            goBack() {
                uni.navigateBack({
                    data:1
                })
            },
            // 设置微信
            setWechat(){
                _this.wechatPay = !_this.wechatPay
            },
            switchChange(e) {
                _this.showPay = e.target.value
            }
        }
    }
    </script>
    <style lang="less" scoped>
	.uni-transition {
		bottom: calc(var(--window-bottom) + 0);
	}
	.inputbox{
		height: 80rpx;
	}
	.bord{
		background: #26A2FF;
	}
	@import url("./css/bind.less");
</style>
