<template>
    <view>
    <uni-nav-bar left-icon="back" :fixed="true" :status-bar="true"  title="设备详情" @clickLeft="goBack" ></uni-nav-bar>
    <view class="page">
        <view class="device">
            <view class="info">
                <view class="logo"><image :src="`/static/image/b_${use_user}.png`"></image></view>
                <view class="title">{{name}}</view>
<!--                <view class="subtitle">XXX智能手环——MP1185C</view>
                <view class="subtitle">XXX智能手环——MP1185C</view> -->
            </view>
            <view class="item">
                <text class="title">设备昵称</text>
                <view class="subtitle">
                    <input style="background: transparent;" class="uni-input" v-model="machineInfo.alias" type="text" placeholder="请输入16字符昵称" />
                </view>
            </view>
			
			<view class="item">
			    <text class="title">设备号</text>
			    <view class="subtitle">
			        <input  style="background: transparent;" disabled class="uni-input" v-model="machineInfo.deviceid" type="text" placeholder="" /> 
			    </view>
			</view>
			
			<view class="item">
			    <text class="title">紧急联系人</text>
			   <view class="subtitle">
			       <input  style="background: transparent;" disabled class="uni-input" :value="machineInfo.machine?machineInfo.machine.sos1:''" type="text" placeholder="" /> 
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
			<view class="use-people">
			  <view class="title">选择设备图标</view>
			  <view class="use-list">
			  	<view v-for="(item, index) in 12" :key="index" class="renbox">
					<image
					  :src="
					    use_user == index
					      ? `/static/image/b_${index}.png`
					      : `/static/image/sb_${index}.png`
					  "
					  @click="modifyIcon(index)"
					  class="icon_item"
					></image>
					<!-- <text class="rentext">{{ item.name }}</text> -->
				</view>
			  </view>
			</view>
        </view>
		
		
        <view class="line"></view>
		<button type="default" class="btn" @click="jiebang()">解绑设备</button>
		<button type="default" class="btn1" @click="modify()">修改信息</button>
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
				id:'',
				use_user:''
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
				// uni.showToast({
				//     title: '成功',
				//     duration: 2000
				// });
				_this.machineInfo = res.data.info.machineInfo;
				_this.use_user = _this.machineInfo.use_user
				console.log("_this.machineInfo ",_this.machineInfo )
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
			modifyIcon(e) {
			  _this.use_user = e;
			},
			modify(){
				if(!this.machineInfo.alias){
					uni.showToast({
						title: '请输入昵称',
						duration: 2000,
						icon: "none"
					});
					return false
				}
				common.request('machine/seting', {
					alias: this.machineInfo.alias,
					deviceid: this.deviceid,
					use_user: this.use_user,
					token :uni.getStorageSync('token')
				}, function(res) {
						console.log("绑定设备",res)
					if (res.data.status == 1) {
						uni.showToast({
							title:'修改成功'
						})
					} else {
						uni.showToast({
							title: res.data.info,
							duration: 2000,
							icon: "none"
						});
					}
				});
			},
			jiebang(){
				common.request('machine/unbind_machine', {
					id:_this.id,
					deviceid : _this.deviceid
					// deviceid:353520180320184
				}, function(res) {
					uni.showToast({
					    title: '解绑成功',
					    duration: 2000,
						icon:"none"
					});
					uni.navigateBack()
					console.log(_this.id)
					console.log(res)
				})
				// deviceid
				// unbind_machine
			},
			goQrcode() {
				 _this = this;
			    uni.navigateTo({
			        url:'/pages/setting/qrcode?deviceid='+_this.deviceid
			    })
			},
            goAdmin() {
                uni.navigateTo({
                    url:'/pages/admin/index?deviceid='+this.deviceid
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
