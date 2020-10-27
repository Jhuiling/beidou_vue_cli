<template>
    <view>
    <uni-nav-bar left-icon="back" :fixed="true" :status-bar="true" title="设备" @clickLeft="goBack"  ></uni-nav-bar>
    <view class="page" v-if="shopage">
		<view class="fabox"></view>
        <view class="device">
            <view class="info" @tap="goDetails()">
                <view class="icon">
                    <image src="../../static/image/right.png"></image>
                </view>
                <view class="logo"><image src="../../static/image/weatch@2x.png"></image></view>
                <view class="title">{{deviceInfo.alias}}</view>
                <!-- <view class="subtitle">XXX智能手环——MP1185C</view> -->
            </view>
            <view class="item">
                <text class="title">设置时间汇报间隔</text>
                <view class="times">
                    <text>秒</text>
                    <input class="uni-input" type="number" placeholder="" v-model="deviceInfo.machine.space_time" v-on:blur="saveSetting()" />
                </view>
            </view>
        </view>
        <view class="line"></view>
        <view class="people" v-if="shouer">
            <view class="item">
                <text class="title">报警紧急联系人1</text>
                <view class="times">
                    <input class="uni-input" type="number" placeholder="" v-model="deviceInfo.machine.sos1"  v-on:blur="saveSetting()"  />
                </view>
            </view>
            <view class="item">
                <text class="title">报警紧急联系人2</text>
                <view class="times">
                    <input class="uni-input" type="number" placeholder="" v-model="deviceInfo.machine.sos2"  v-on:blur="saveSetting()"  />
                </view>
            </view>
        </view>
        <view class="line"></view>
		
		
		
        <view class="tips"  v-if="shouer">
            <view class="item">
                <text class="title">报警提醒方式</text>
                <view class="subtitle">
                    <view class="text">开</view>
                    <view class="text">关</view>
                </view>
            </view>
            <view class="item"  v-if="!kaiguan">
                <text class="title sub">SOS报警</text>
                <view class="subtitle">
                    <radio-group>
                        <label class="uni-list-cell uni-list-cell-pd change" >
                            <view class="radios">
                                <radio v-on:click="changeThis(0)" checked />
                            </view>                   
                        </label>
						<label class="uni-list-cell uni-list-cell-pd change" >
						    <view class="radios">
						        <radio v-on:click="changeThis(1)"  />
						    </view>                   
						</label>
                    </radio-group>
                </view>
            </view>
           <view class="item"  v-if="!kaiguan">
                <text class="title sub">跌倒报警</text>
                <view class="subtitle">
                    <radio-group>
                        <label class="uni-list-cell uni-list-cell-pd change">
                            <view class="radios">
                                <radio v-on:click="fallSet(0)"  />
                            </view>                   
                        </label>
						<label class="uni-list-cell uni-list-cell-pd change" >
						    <view class="radios">
						        <radio  v-on:click="fallSet(1)" checked />
						    </view>                   
						</label>
                    </radio-group>
                </view>
            </view>
        </view>
		
		<view class="tips" v-if="kaiguan">
		    <view class="item">
		        <text class="title sub">震动警告</text>
		        <view class="subtitle">
		            <radio-group @change="radioChange">
		                <label class="uni-list-cell uni-list-cell-pd change" >
		                    <view class="radios">
		                        <radio v-on:click="changeThistwi(0)" :checked="shake==0"/>
		                    </view>                   
		                </label>
						<label class="uni-list-cell uni-list-cell-pd change" >
						    <view class="radios">
						        <radio v-on:click="changeThistwi(1)" :checked="shake==1"/>
						    </view>                   
						</label>
		            </radio-group>
		        </view>
		    </view>
		   <view class="item">
		        <text class="title sub">声控录音</text>
		        <view class="subtitle">
		            <radio-group>
		                <label class="uni-list-cell uni-list-cell-pd change">
		                    <view class="radios">
								<!-- shake:_this.shake,
								record:_this.record, -->
		                        <radio v-on:click="fallSettwo(0)" :checked="record==0"/>
		                    </view>                   
		                </label>
						<label class="uni-list-cell uni-list-cell-pd change">
						    <view class="radios">
						        <radio v-on:click="fallSettwo(1)" :checked="record==1"/>
						    </view>                   
						</label>
		            </radio-group>
		        </view>
		    </view>
		</view>
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
                 items: [{
                    value: '1',
                    name: '紧急电话'
                },{
                    value: '2',
                    name: '系统通知'
                }],
				shopage:false,
                 current:0,
                 deviceInfo:{},
				 kaiguan:false,
				 shake:'',
				 record:'',
				 fall_type:'',
				 sos_type:'',
				 shouer:false
            }
        },
        mounted () {
            _this = this
            this.getInfo()
			setTimeout(function(){
				_this.shopage = true
				_this.shouer = true
			},1000) 
        },
		onLoad(e){
			  var _this = this ; 
			  _this.deviceid = e.deviceid 
		},
        methods: {
			changeThis(x){
				_this.fall_type = x
				// shake:'',
				// record:'',
				// fall_type:'',
				// sos_type:''
				console.log(_this.shake)
				console.log(_this.record)
				_this.saveSetting()
			},
			fallSettwo(x){
				_this.record = x
				// shake:'',
				// record:'',
				console.log(x) 
				_this.saveSetting()
			},
			changeThistwi(x){
				_this.shake = x 
				// shake:'',
				// record:'',
				console.log(x) 
				_this.saveSetting()
			},
			fallSet(x) {
				// fall_type:_this.fall_type,
				// sos_type:_this.sos_type,
				_this.sos_type = x
				_this.saveSetting()
				// shake:'',
				// record:'',
			},
            goClock() {
                uni.navigateTo({
                    url:'/pages/clock/index'
                })
            },

            goRemind() {
                uni.navigateTo({
                    url:'/pages/remind/index'
                })
            },
            goTarget() {
                uni.navigateTo({
                    url:'/pages/target/index'
                })
            },
            // 详情
            goDetails() {
                uni.navigateTo({
                    url:'/pages/setting/details?deviceid='+ this.deviceid
                })
            },
            goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
            getInfo () {
                common.request('machine/seting_index',{
                    deviceid:_this.deviceid
                },function (res) {
					console.log(res)
					if(res.data.info.type==2){
						_this.kaiguan = true
						_this.shake = res.data.info.machine.shake
						_this.record = res.data.info.machine.record
					}
                    _this.deviceInfo = res.data.info
                })
            },
			saveSetting () {
				if(_this.kaiguan){
					var datas = {
						deviceid:_this.deviceid,
						sos1:_this.deviceInfo.machine.sos1,
						sos2:_this.deviceInfo.machine.sos2,
						space_time:_this.deviceInfo.machine.space_time,
						shake:_this.shake,
						record:_this.record,
					}
					console.log(datas)
					common.request('machine/seting',datas,function (res) {
					    console.log(res)
					})
				}else{ 
					common.request('machine/seting',{
					    deviceid:_this.deviceid,
						sos1:_this.deviceInfo.machine.sos1,
						sos2:_this.deviceInfo.machine.sos2,
						space_time:_this.deviceInfo.machine.space_time,
						fall_type:_this.fall_type,
						sos_type:_this.sos_type,
					},function (res) { 
					    console.log(res)
					})
				}
				
			},
            radioChange: function(evt) {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].value === evt.target.value) {
                    this.current = i;
                    break;
                }
            }
        },
        },
    }
    </script>
<style lang="less" scoped>
	uni-page-body {
	    height: 100%;
	}
	.qrcode {
		width: 650rpx;
		padding: 50rpx;
		text-align: center;
		image {
			width: 650rpx;
		}
	}
	.page {
	    width: 100%;
	    padding-top: 100rpx;
	
	    .device {
	        height: 340rpx;
	        padding: 40rpx 30rpx;
	        .item {
	            padding: 0;
	            border: 0;
	        }
	        .info {
	            height: 280rpx;
	            border-bottom: 1px solid #eee;
	            text-align: center;
	            position: relative;
	            .logo {
	                height: 120rpx;
	                padding: 10rpx;
	                image {
	                    width: 62rpx;
	                    height: 82rpx;
	                    background: #eee;
	                    border-radius: 50%;
	                    padding: 10rpx 20rpx;
	                }
	            }
	            .title {
	                font-size: 32rpx;
	            }
	
	            .subtitle {
	                font-size: 24rpx;
	                color: #999;
	            }
	        }
	        .icon {
	            width:20rpx;
	            height: 30rpx;
	            position: absolute;
	            top: 0;
	            bottom: 40rpx;
	            margin: auto 0;
	            right: 80rpx;
	            image {
	                width: 100%;
	                height: 100%;
	            }
	        }
	    }
	    .item {
	        height: 100rpx;
	        line-height: 100rpx;
	        border-bottom: 1px solid #eee;
	        .title {
	            font-size: 28rpx;
	            color: #333;
	        }
	        .times,.subtitle {
	            float: right;
	            color: #999;
	            width: 240rpx;
	            height: 60rpx;
	            padding-top: 20rpx;
	            line-height: 60rpx;
	            font-size: 30rpx;
	            input {
	                width: 120rpx;
	                height: 60rpx;
	                border-radius: 60rpx;
	                float: right;
	                background-color: #eef0f4;
	                padding: 0 20rpx;
	                text-align: right;
	            }
	        }
	        .arrow {
	            float: right;
	            width: 20rpx;
	            height: 30rpx;
	            image {
	                width: 100%;
	                height: 100%;
	                
	            }
	        }
	    }
	    .set,.people,.tips {
	        padding: 0 30rpx;
	        .subtitle,.times {
	            width: 300rpx;
	            input {
	                width: 240rpx;
	                color: #333;
	                font-size: 28rpx;
	            }
	            .text {
	                color: #999;
	                font-size: 24rpx;
	                width: 150rpx;
	                text-align: center;
	                display: inline-block;
	                image {
	                    width: 40rpx;
	                    height: 40rpx;
	                    margin-top: 15rpx;
	                }
	            }
	            .radios {
	                display: inline-block;
	                margin: 0 10rpx;
	                width: 120rpx;
	                text-align: center;
	            }
	            .radios:nth-of-type(odd){
	                margin-left: 20rpx;
	            }
	            .radios:nth-of-type(even ) {
	                margin-right: 0;
	            }
	        }
	        .sub {
	            color: #999;
	        }
	    } 
	    .item:last-of-type {
	        border: 0;
	    }
	    .line {
	        height: 16rpx;
	        background-color: #e9e9e9;
	    }
	}
	.uni-transition {
		bottom: calc(var(--window-bottom) + 0);
	}
	.fabox{
		height: 40rpx;
	}
</style>