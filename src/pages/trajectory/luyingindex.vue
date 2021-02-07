<template>
<view>
    <uni-nav-bar left-icon="back" :fixed="true" :status-bar="true"  title="录音列表" @clickLeft="goBack" ></uni-nav-bar>
    <view class="page">
        <view class="timearea">
            <view class="time" @tap="setTime(1)">
                {{start_time}}
            </view>
            <text>至</text>
            <view class="time" @tap="setTime(0)">
                {{end_time}}
            </view>
        </view>
		<!-- "machinefans": {
			"alias": "好吃吃就",
			"deviceid": "626160003568108"
		} -->
        <view class="event-list " v-for="(item,index) in list" :key="index"  @tap="goDetails(item.path)">
            <!-- <image class="car-icon" src="../../static/image/car@2x.png"></image> -->
            <!-- <text class="car-name" v-if="item.machinefans.alias!=null">{{item.machinefans.alias}}</text> -->
            <view>创建时间：{{item.create_time}}</view>
			<view @click.stop="handleDelItem(item)" class="del-btn">删除</view>
            <!-- <view class="address">
                {{item.address}}
            </view> -->
        </view>
    </view>
    <date-time
                    ref="dateTime"
                    startYear="2019"
                    :isAll="true"
                    :current="false"
                    @confirm="onConfirm"
                ></date-time>
    </view>
</template>
<script>
    var _this;
    import dateTime from '@/components/yu-datetime-picker/yu-datetime-picker.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import common from 'common.js'
	export default {
		components: {
			uniSection,
            uniIcons,
            dateTime
        },
        data() {
            return {
                start_time: '',
                end_time: '',
                times:'2020-03-10 08:30:01',
                type:1,
                list:[],
				deviceid:'' ,
				loading:false
            }
        },
		watch:{
			loading:function(val){
				if(val){
					uni.showLoading()
				}else{
					uni.hideLoading()
				}
			}
		},
		onLoad(e){
			var _this = this ;
			_this.deviceid = e.deviceid ;
			common.request("machine/get_time_range",{
				token :uni.getStorageSync('token')
			} ,function(res) {
				console.log(res.data.info)
				_this.start_time = res.data.info.start_time
				_this.end_time = res.data.info.end_time
				let data = {
				    start_time:res.data.info.start_time,
				    end_time:res.data.info.end_time,
				    deviceid:_this.deviceid 
				} 
				common.request("machine/record_list", data, function(res) {
					console.log(res)
				    _this.list = res.data.info
				});
			}); 
		},
        mounted(e) {
			
            _this = this;
			
        },
        methods:{
            setTime(type) {
                _this.type = type;
                if(type) {
                    _this.times = _this.start_time
                } else {
                    _this.times = _this.end_time
                } 
                _this.$refs.dateTime.show();
            },
            getList () {
				if(this.loading)return 
				this.loading = true
				console.log(_this.start_time)
				console.log(_this.end_time)
                let data = {
                    start_time:_this.start_time,
                    end_time:_this.end_time,
                    deviceid:_this.deviceid 
                } 
				common.request("machine/record_list", data, (res)=> {
					console.log(res)
                    _this.list = res.data.info
					this.loading = false
                });
            },
            onConfirm(e) {
                if(_this.type) {
                    _this.start_time = e.selectRes
                } else {
                    _this.end_time = e.selectRes
                }
				console.log(1111) 
				 _this.getList();
            },
            goBack() {
                uni.navigateBack({
                    data:1
                }) 
            },
            goDetails(e) {
				var token = uni.getStorageSync('token');
				console.log(e)
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = e;
				innerAudioContext.onPlay(() => {
					uni.showLoading({
						title: '播放中'
					});  
					setTimeout(function(){
						 uni.hideLoading();
					},10000) 
				});
				innerAudioContext.onError((res) => {
				  console.log(res.errMsg);
				  console.log(res.errCode);
				});
            },
			handleDelItem(item){
				if(this.loading)return 
				this.loading =true
				let data = {
				    id:item.id,
				    deviceid:_this.deviceid 
				} 
				common.request("machine/del_record", data, (res)=> {
					this.loading =false
					this.getList()
				});
				this.loading =false
				
			}
        }
    }
    </script>
    <style lang="less" scoped>
	.uni-transition {
		bottom: calc(var(--window-bottom) + 0);
	}
	.page{
		padding-top: 100rpx;
	}
	@import url("./css/main.less");
	
	.event-list{
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
	}
	.del-btn{
		padding:10rpx 30rpx;
		border-radius: 30rpx;
		background-color: skyblue;
		color: #FFFFFF;
	}
</style>