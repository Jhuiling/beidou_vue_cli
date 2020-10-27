<template>
    <view>
    <uni-nav-bar left-icon="back" :fixed="true" :status-bar="true"  title="设备详情" @clickLeft="goBack" ></uni-nav-bar>
    <view class="page">
        <view class="device">
            <view class="info">
                <view class="logo"><image src="../../static/image/weatch@2x.png"></image></view>
                <view class="title">{{name}}</view>
<!--<view class="subtitle">XXX智能手环——MP1185C</view><view class="subtitle">XXX智能手环——MP1185C</view> -->
            </view>
            <view class="item">
                <text class="title">设备昵称</text> 
                <view class="subtitle">
                    <input class="uni-input"  v-model="machineInfo.alias" type="text" placeholder="请输入16字符昵称" />
                </view>
            </view>
			
			<view class="item">
			    <text class="title">设备号</text>
			    <view class="subtitle">
			        <input class="uni-input" v-model="machineInfo.deviceid" type="text" placeholder="" /> 
			    </view>
			</view>
			
			<view class="item">
			    <text class="title">紧急联系人</text>
			   <view class="subtitle">
			       <input class="uni-input" v-model="machineInfo.sos1" type="text" placeholder="" /> 
			   </view>
			</view>
			
            <view class="item" @tap="goAdmin">
                <text class="title">设备管理员</text>
                <view class="arrow">
                    <image src="../../static/image/right.png"></image>
                </view>
            </view>
            <view class="item" v-on:click="goQrcode">
                <text class="title">设备二维码</text>
                <view class="arrow">
                    <image src="../../static/image/right.png"></image>
                </view>
            </view>
        </view>
        <view class="line"></view>
		<button type="default" class="btn" @click="jiebang()">解绑设备</button>
<!--        <view class="date">
            <view class="item">
                <text class="title">激活日期</text>
                <view class="subtitle">
                    2020.01.01 12:00
                </view>
            </view>
            <view class="item">
                <text class="title">到期日期</text> 
                <view class="subtitle end">
                    <button type="primary" size="mini">续费</button>
                    2020.01.01 12:00
                </view>
            </view>
        </view>
        <view class="line"></view>
         <view class="pay">
            <view class="item">
                <text class="title">绑定并开启支付功能</text>
                <view class="subtitle mini">
                    <switch  size="mini"  @change="switchChange" />
                </view>
            </view>
            <view v-if="showPay">
                <view class="item">
                    <text class="title">微信支付</text>
                    <view class="subtitle">
                        <view class="radios">
                            <radio  :checked="wechatPay" @tap="setWechat" />
                        </view>      
                    </view>
                </view>
                <view class="item">
                    <text class="title">支付宝支付</text>
                    <view class="subtitle">                           
                            <view class="text">
                                <text> 未绑定</text>
                            <view class="radios">
                            <radio  :checked="wechatPay" @tap="setWechat" />
                        </view> 
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="line"></view> -->
       
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
				machineInfo:{},
				name:'',
				deviceid:'',
				id:''
            }
        },
		onLoad(e){
			console.log(e);
			var deviceid = e.deviceid ; 
			this.deviceid = e.deviceid 
			common.request('machine/details', {
				deviceid:deviceid
			}, function(res) {
				console.log(res)
				_this.machineInfo = res.data.info.machineInfo
				_this.name = res.data.info.machineInfo.alias
				_this.id = res.data.info.machineInfo.id
			})
			// deviceid
		},
        mounted() { 
            _this = this;
			// _this.getDetials();
			
        },
        methods: {
			jiebang(){
				common.request('machine/unbind_machine', {
					id:_this.id,
					deviceid : _this.deviceid
					// deviceid:353520180320184
				}, function(res) {
					uni.showToast({
					    title: '标题',
					    duration: 2000,
						icon:"none"
					});
					console.log(_this.id)
					console.log(res)
				})
				// deviceid
				// unbind_machine
			},
			goQrcode() {
			    uni.navigateTo({
			        url:'/pages/setting/qrcode'
			    })
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
            },
			getDetials () {
				let data = {
					deviceid:uni.getStorageSync('deviceid'),
				}
				common.request('machine/details', data, function(res) {
					_this.machineInfo = res.data.info.machineInfo
					_this.name = res.data.info.machineInfo.alias
				})
			}
        }
    }
    </script>
    <style lang="less" scoped>
	.uni-transition {
		bottom: calc(var(--window-bottom) + 0);
	}

	@import url("./css/details.less");
</style>
