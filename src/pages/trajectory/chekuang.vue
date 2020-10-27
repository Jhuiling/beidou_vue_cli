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
		
        <view class="event-list " v-for="(item,index) in list" :key="index"  @tap="goDetails">
            <image class="car-icon" src="../../static/image/car@2x.png"></image>
            <text class="car-name">{{item.PlateNo}}</text>
            <text class="time">{{item.SendTime}}</text>
            <view class="address">
                {{item.Location}}
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
                    deviceid:_this.deviceid ,
					token :uni.getStorageSync('token')
                }  
				console.log(data) 
				common.request("car/car_condition", data, function(res) {
					console.log(res)   
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
           
        }
    }
    </script>
    <style lang="less" scoped>
	.uni-transition {
		bottom: calc(var(--window-bottom) + 0);
	}

	@import url("./css/main.less");
</style>