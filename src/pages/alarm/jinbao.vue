<template>
<view>
<!-- <uni-nav-bar left-icon="back" :fixed="true" :status-bar="true" title="警报" color="#000" @clickLeft="goBack" ></uni-nav-bar> -->
    <view class="page" style="padding: 0;">
        
        <view class="timearea">
            <!-- <view class="time" @tap="setTime(1)">
                {{start_time}}
            </view> 
            <text>至</text>
            <view class="time" @tap="setTime(0)">
                {{end_time}}
            </view> -->
			<view class="time" @tap="setTime(1)">
				{{start_time}}
			</view>
			<text>至</text>
			<view class="time" @tap="setTime(0)">
				{{end_time}}
			</view>
			<view class="search-btn" @tap="getAlarmList">搜索</view>
        </view>
        <view class="event-list " v-for="(item,index) in alarmList" :key="index" @tap="goDetails(item)" >
            <view>
				<image class="car-icon" src="../../static/image/car@2x.png"></image>
				<view>
					<view class="car-name">{{item.plateNo}}</view>
					<view class="title">{{item.alarmType}}</view>
					<view class="time">{{item.processedTime}}</view>
				</view>
			</view>
			<view>
				<text class="address">{{item.Location}}</text>
			</view>
        </view>
        <date-time ref="dateTime" startYear="2019" :isAll="true" :current="false" @confirm="onConfirm"></date-time>
    </view>
	
	<!-- "id": "1",
	"VehicleId": "966",
	"PlateNo": "冀B99999",
	"AlarmType": "超速",
	"Descr": "1",
	"AlarmSource": "1",
	"AlarmTime": "2020-08-13 18:00:38.000",
	"Speed": "35.00000",
	"Location": "河北省石家庄市正定县S302(城东街)(正定康桥御河幼儿园189米)",
	"Latitude": "114.5933361",
	"Longitude": "38.1281277",
	"ProcessedTime": "2020-08-13 18:01:20.000",
	"ProcessedUserId": "1",
	"ProcessedUserName": "名字",
	"AckSn": "1",
	"Processed": "2",
	"TenantId": "3",
	"CreateDate": "2020-08-13 18:01:34.000",
	"Remark": "备注",
	"Deleted": "0",
	"Owner": "0",
	"ROW_NUMBER": "1" -->
    </view>
</template>
<script>
	var _this;
	import uniSection from '@/components/uni-section/uni-section.vue'
    import uniIcons from '@/components/uni-icons/uni-icons.vue'
    import dateTime from '@/components/yu-datetime-picker/yu-datetime-picker.vue'
	import common from 'common.js'
	export default {
		components: {
			uniSection,
            uniIcons,
            dateTime
        },
        data() {
            return {
                alarmList:[],
                start_time: '',
                end_time: '',
                times:'2020-03-10 08:30:01',
                type:1,
				deviceid:''
            }
        },
        onLoad(e){
			var _this = this ; 
			console.log(e)
			_this.deviceid = e.deviceid ;
			var date = new Date();
			this.year = date.getFullYear();
			this.month = date.getMonth() < 9 ?("0"+(date.getMonth() + 1)):(date.getMonth() + 1);
			this.date = date.getDate() < 10 ?("0"+date.getDate()):date.getDate();
			this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
			this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
			this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			this.milliSeconds = date.getMilliseconds();
			var currentTime = this.year+'-'+this.month + '-' + this.date + ' ' + this.hour + ':' + this.minute + ':' + this.second 
			_this.start_time = currentTime;
			_this.end_time = currentTime ; 			
			console.log(currentTime)
        },
        mounted() {
            _this = this
            _this.getAlarmList();
            
        },
        methods: {
            goBack(){
                uni.navigateBack({
                    data:1
                })
            },
            setTime(type) {
				console.log(type)
                _this.type = type;
                if(type) {
                    _this.times = _this.start_time
                } else {
                    _this.times = _this.endTime_time
                }
                _this.$refs.dateTime.show();
            },
            onConfirm(e) {
				
                if(_this.type) {
                    _this.start_time = e.selectRes
                } else {
                    _this.end_time = e.selectRes 
                }
                 // _this.getAlarmList();
            },
            getAlarmList(){ 
				var token = uni.getStorageSync('token');
				console.log(token)
				console.log(_this.deviceid) 
				// var dats = {
				// 	deviceid:_this.deviceid,
				// 	start_time:_this.start_time, 
				// 	end_time:_this.end_time,
				// 	token:token
				// } 
				// console.log(_this.start_time.split(' ')[0],_this.end_time.split(' ')[0])
				// console.log(dats)  
				let a = _this.start_time.split(' ')[0]
				let b = _this.end_time.split(' ')[0]
                common.request('car/police_list', {
                  deviceid:_this.deviceid,
                  start_time:'2020-09-01', 
                  end_time:'2020-10-01',
                  token:token 
                }, function(res) {    
					_this.alarmList = res.data.info.data  
				})  
                
            }, 
            // 查看详情 
            goDetails(item) {
                uni.navigateTo({
                    url:'/pages/alarm/details?id=' + item.id+"&longitude="+item.longitude+"&latitude="+item.latitude+"&deviceid="+_this.deviceid 
                })
            } 
        }
    }
    </script>
    <style lang="less" scoped> 
	.uni-transition {
		bottom: calc(var(--window-bottom) + 0);
	}

	@import url("./css/main.less");
</style>