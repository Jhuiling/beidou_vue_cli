<template>
<view>
    <!-- <uni-nav-bar left-icon="back" :fixed="true" :status-bar="true"  title="轨迹" @clickLeft="goBack" ></uni-nav-bar> -->
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
		
        <view class="libis" v-for="(item,index) in list" :key="index"  @tap="goDetails">
           <view class="shijian">2019.09.14</view>
		   <view class="kaifa">
			   <view class="jinriyj">
				   <view class="yjbosl">7.2</view>
				   <view class="webbr">今日油价</view>
			   </view>
			   <view class="jinriyj">
				   <view class="yjbosl">1236.3</view>
				   <view class="webbr">本日消费(元)</view>
			   </view>
		   </view>
		   <view class="kaifa">
			   <view class="jinriyj">
				   <view class="yjbosl">98</view>
				   <view class="webbr">总里程(km)</view>
			   </view>
			   <view class="jinriyj">
				   <view class="yjbosl">1236.3</view>
				   <view class="webbr">总油耗(L)</view>
			   </view>
			   <view class="jinriyj">
				   <view class="yjbosl">1236.3</view>
				   <view class="webbr">总行驶时间(分)</view>
			   </view>
		   </view>
		   
		   
		   <view class="kaifa">
		   			   <view class="jinriyj">
		   				   <view class="yjbosl">72</view>
		   				   <view class="webbr">里程</view>
		   			   </view>
		   			   <view class="jinriyj">
		   				   <view class="yjbosl">39</view>
		   				   <view class="webbr">油耗</view>
		   			   </view>
		   </view>
		   <view class="kaifa">
		   			   <view class="jinriyj">
		   				   <view class="yjbosl">98</view>
		   				   <view class="webbr">最高速度(km/h)</view>
		   			   </view>
		   			   <view class="jinriyj">
		   				   <view class="yjbosl">63</view>
		   				   <view class="webbr">平均速度(km/h)</view>
		   			   </view>
		   			   <view class="jinriyj">
		   				   <view class="yjbosl">2</view>
		   				   <view class="webbr">急加速(次)</view>
		   			   </view>
					   <view class="jinriyj">
							   <view class="yjbosl">2</view>
							   <view class="webbr">急减速(次)</view>
					   </view>
		   </view>
		   
		   
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
	
	<!-- "Id": "1",
	"simNo": "13100000966",
	"plateNo": "测A00966",
	"sendTime": "2020-08-25 16:08:24.000",
	"startTime": "2020-08-25 00:08:29.000",
	"endTime": "2020-08-25 23:08:42.000",
	"mileage": "12.00000",
	"sumMileage": "12.00000",
	"oilConsumption": "23.00000",
	"sumOilConsumption": "32.00000",
	"avgMileage": "2.00000",
	"SpeedingTime": "2",
	"highSpeedTimes": "1",
	"highSpeedTime": "1",
	"longIdleSpeed": "1",
	"IdleSpeedTime": "1",
	"IdleSumOil": "1.00000",
	"fatigueDrivingTime": "1",
	"avgSpeed": "12.00000",
	"maxSpeed": "123.00000",
	"maxTrun": "1",
	"engineMaxTemperature": "1",
	"ROW_NUMBER": "1" -->
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
                start_time: '2020-02-28 14:09:13',
                end_time: '2020-03-09 04:44:49',
                times:'2020-03-10 08:30:01',
                type:1,
                list:[],
				deviceid:'' 
            }
        },
		onLoad(e){
			var _this = this ;
			_this.deviceid = e.deviceid ;
			common.request("machine/get_time_range",{
				token :uni.getStorageSync('token')
			} ,function(res) {
				_this.start_time = res.data.info.start_time
				_this.end_time = res.data.info.end_time
			});
		},
        mounted(e) {
			
            _this = this;
            _this.getList()
			
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
				console.log(_this.deviceid)
                let data = {
                    start_time:'2020-09-14',
                    end_time:'2020-09-28',
                    deviceid:_this.deviceid , 
					token :uni.getStorageSync('token')
                }  
				console.log(data)
				common.request("car/trip", data, function(res) {
					console.log(res)    
                    _this.list = res.data.info.data
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
            goDetails() {
				var token = uni.getStorageSync('token');
				console.log(token)
				// start_time:_this.start_time,
				// end_time:_this.end_time,
                uni.navigateTo({
                    url:'/pages/trajectory/guijitz?token='+token+"&start_time="+_this.start_time +"&end_time="+_this.end_time+'&deviceid='+_this.deviceid
                })
            }
        }
    }
    </script>
    <style lang="less" scoped>
		.shijian{
			padding: 20rpx 0rpx;
			text-align: center;
			width: 100%;
			background: rgb(73,152,232);
			color: #FFFFFF;
			margin: 0rpx auto;
		}
		.yjbosl{
			font-size: 30rpx;
			font-weight: 700;
			
		}
		.jinriyj view{
			text-align: center;
		}
		.kaifa{
			display: flex;
			display: -webkit-flex;
			justify-content: space-around;
			padding: 20rpx 0rpx;
		}
	.uni-transition {
		bottom: calc(var(--window-bottom) + 0);
	}
	.pages{
		padding-top: 0rpx!important;
	}
	.libis{
		width: 95%;
		margin: 10rpx auto;
	}
	@import url("./css/main.less");
</style>