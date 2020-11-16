<template>
    <view class="page" id="health" style="background-color: rgba(0,0,0,0);">
		<image src="../../static/image/jiankang_bg_01.jpg" style="width: 100%;position: fixed;height: 650rpx;"></image>
		<!-- <image src="../../static/image/ac-bg1_03.jpg"  style="width: 100%;position: fixed;bottom: 0rpx;"></image> -->
        <view style="backgroud-image:url(../../static/image/jiankang_bg_01.jpg)">
			
			<uni-nav-bar left-icon="back" :fixed="true" :status-bar="true" title="健康" :color="setBg ? '#000' : '#fff'" :shadow="setBg" :backgroundColor="setBg ? '#f8f8f8' : 'transparent'"  @clickLeft="goBack"></uni-nav-bar>
			    <swiper style="height: 430rpx;" v-on:change="fnSwichCharts" :indicator-dots="true" :indicator-color="'#4d94e7'" :indicator-active-color="'#fff'" class="details">
			        <swiper-item  >
			            <view class="arcbar">
			                <arcbar-chart
			                :dataAs="step"
			                :basicAs="{
			                    colors: ['#887bff']
			                }"
			                :extraAs="{
			                    arcbar: {
			                            type: 'circle',
			                            startAngle :1.5,
			                            endAngle: 1.49
			                        }
			                }"
			                ></arcbar-chart>
			                <view class="over-view">
			                    <view class="logo">
			                        <image src="../../static/image/steps@2x.png"></image>                  
			                    </view>
			                    <view class="title">
			                        {{healthDetails.sportstep}}
			                    </view>
			                    <view class="smtitle">
			                        今日步数
			                    </view>
			                </view>
			                <view class="like">
			                    <image src="../../static/image/heart_ac.png"></image>
			                    {{healthDetails.heart}}
			                </view>
			            </view>
			            <view class="list">
			                <view class="item">
			                    <view class="num">{{healthDetails.sportdistance}}</view>
			                    <view class="small-title">距离(km)</view>
			                </view>
			                <view class="item">
			                    <view class="num">{{healthDetails.sportcalorie}}</view>
			                    <view class="small-title">卡路里(Kcal)</view>
			                </view>
			                <view class="item">
			                    <view class="num">{{healthDetails.systolic}}</view>
			                    <view class="small-title">高压(mmHg)</view>
			                </view>
			                <view class="item">
			                    <view class="num">{{healthDetails.diastolic}}</view>
			                    <view class="small-title">低压(mmHg)</view>
			                </view>
			            </view>
			        </swiper-item>
			        <swiper-item>
			            <view class="arcbar">
			                <arcbar-chart
			                :dataAs="step"
			                :basicAs="{
			                    colors: ['#887bff']
			                }"
			                :extraAs="{
			                    arcbar: {
			                            type: 'circle',
			                            startAngle :1.5,
			                            endAngle: 1.49
			                        }
			                }"
			                ></arcbar-chart>
			                <view class="over-view">
			                    <view class="logo">
			                        <image src="../../static/image/moon@2x.png"></image>                        
			                    </view>
			                    <view class="title">
			                        {{healthDetails.sleeptotal}}
			                    </view>
			                    <view class="smtitle">
			                        昨日睡眠时长
			                    </view>
			                </view>
			                <view class="like">
			                    <image src="../../static/image/heart_ac.png"></image>
			                    {{healthDetails.heart}}
			                </view>
			            </view>
			            <view class="time">
			                <view class="length">
			                    <view class="txt">
			                        入睡
			                    </view>
			                    <view class="progress">
			                        <view class="second" v-bind:style="'width:'+healthDetails.sleeplow/healthDetails.sleeptotal*100+'%'">
			                           
			                        </view>
			                         <view class="third" v-bind:style="'width:'+healthDetails.sleepdeep/healthDetails.sleeptotal*100+'%'" ></view>
			                    </view>
			                    
			                    <view class="txt">
			                        睡醒
			                    </view>
			                    
			                </view>
			                <!-- <view class="length scale">
			                    <view>
			                        <view class="txt">
			                        23:30
			                        </view>
			                        <view class="line">
			                            <view class="begin">01:00</view>
			                            <view class="end">08:00</view>
			                        </view>
			                        <view class="txt">
			                            7:30
			                        </view>
			                    </view>
			                </view> -->
			                <view class="deep">
			                    深度睡眠
			                </view>
			                <view class="shallow">
			                    浅度睡眠
			                </view>
			            </view>
			        </swiper-item>
			    </swiper>
			
			    <view class="switch" style="border-bottom-width:1rpx  ;
			border-color: #ff4564;margin-top: 50rpx;">
			        <view class="cirnav" v-if="!showTime">
			            <view v-bind:class="type == 1 ? 'cirtitle active' : 'cirtitle' " v-on:click="setType(1)">
			                心率
			            </view>
			            <view v-bind:class="type == 2 ? 'cirtitle active' : 'cirtitle' " v-on:click="setType(2)">
			                步数
			            </view>
			            <view v-bind:class="type == 3 ? 'cirtitle active' : 'cirtitle' " v-on:click="setType(3)">
			                血压
			            </view>
			        </view>
			        <view class="cirnav" v-if="showTime">
			            <view class="cirtitle active">
			                数据
			            </view>
			        </view>
			        <view class="squnav">
			            <view v-for="(item,index) in cycle" :key="index"  :class="item.value==cycleValue ? 'swbox active'  : 'swbox '" @tap="changeCycle(item)">{{item.name}}</view>
			        </view>
			    </view>
			    <histogram-chart
			        v-if="showChart"
			        :dataAs="histogramData2"
			        v-bind:type="type !== 2 ? 'meter' : 'group'"
			        canvasId="ht1"
			        labelKey="label"
			        valueKey="value"
			        :yAxisAs="{
			            formatter: {
			                type: 'number' //type:number percent String,额外参数:fixed:NUmber,name:String
			            }
			        }"
			    />
		</view>
    </view>
	
	
	
</template>
<script>
var _this;
import HistogramChart from '@/components/stan-ucharts/HistogramChart.vue';
import arcbarChart from '@/components/stan-ucharts/ArcbarChart.vue';
import common from 'common.js'
export default {
    name: 'Index',
    components: {
        HistogramChart,
        arcbarChart,
    },
    data() {
        return {
            showChart: false,
            healthDetails:{},
            setBg:false,
            showTime:false,
            type:1,
			deviceid:'',
            step:{
                series: 
                    [{
                        name: '',
                        data: 0.8,
                    }]
                    
				},
            cycle:[{
                name:'日',
                value:'day'
            },{
                name:'周',
                value:'week'
            },{
                name:'月',
                value:'month'
            },{
                name:'年',
                value:'year'
            }],
            cycleValue:'day',
            histogramData2: {
            },
			currentIndex:0
        }
    },
	onLoad(e){
		this.deviceid = e.deviceid
	},
    mounted() {
        _this = this;
        _this.fnGetHealth()
        _this.fnGetCharts()
    },
    onPageScroll(obj) {
        if(obj.scrollTop > 20) {
            _this.setBg = true
        } else {
            _this.setBg = false
        }
    },
	watch:{
		cycleValue:function(val){
			this.showChart = false
			if(this.currentIndex===1){
				this.fnGetSleep()
			}else{
				this.fnGetCharts()
			}
		}
	},
    methods: {
        goBack() {
            uni.navigateBack({
                delta: 1
            });
        },
        setType (data) {
            _this.type = data
            _this.showChart = false
            _this.fnGetCharts()
        },
        changeCycle(item) {
            this.cycleValue = item.value
			
        },
        fnSwichCharts(event) {
			_this.showChart = false
			this.currentIndex = event.detail.current
            if(event.detail.current == 1) {
                _this.showTime = true
                _this.fnGetSleep()
            }  else {
                _this.showTime = false
				_this.fnGetCharts()
            }
			
        },
        fnGetSleep() {
            _this.showChart = false
            common.request('machine/health_chart', {
                deviceid:_this.deviceid,
                type:4,
				format:_this.cycleValue
            }, function(res) {
                let data = {
                        opts:{
                            xAxis:
                            {
                                itemCount:7
                            }
                        },
                        label : res.data.info.title||'',
                        value:[{
                            name:'深度睡眠',
                            data:res.data.info.sleepdeep||[]
                        },{
                            name:'浅度睡眠',
                            data:res.data.info.sleeplow||[]
                        }]
                    }
                    _this.histogramData2 = data
                _this.showChart = true
                _this.$forceUpdate()
            })
        },
        fnGetHealth() {
            common.request('machine/health_top', {
                deviceid:_this.deviceid
            }, function(res) {
				_this.healthDetails = res.data.info
			})
        },
        fnGetCharts() {
			console.log(_this.type,_this.cycleValue,_this.deviceid)
            common.request('machine/health_chart', {
                deviceid:_this.deviceid,
                type:_this.type,
                format:_this.cycleValue
            }, function(res) {
				console.log(res)
                let data = {}
                if(_this.type == 1) {
                    data = {
                        opts:{
                            xAxis:
                            {
                                itemCount:7
                            }
                        },
                        label : res.data.info.title,
                        value:[{
                            name:'最高',
                            data:res.data.info.max_value
                        },{
                            name:'平均',
                            data:res.data.info.value
                        },{
                            name:'最低', 
                            data:res.data.info.min_value
                        }]
                    }
                } else if(_this.type == 2){
                    data = {
                        opts:{
                            xAxis:
                            {
                                itemCount:7
                            }
                        },
                        label : res.data.info.title||[],
                        value:[{
                            name:'步数',
                            data:res.data.info.value||[]
                        }]
                    }
                } else {
                    data = {
                        opts:{
                            xAxis:
                            {
                                itemCount:7
                            }
                        },
                        label : res.data.info.title,
                        value:[{
                            name:'高压',
                            data:res.data.info.max
                        },{
                            name:'低压',
                            data:res.data.info.min
                        }]
                    }
                }
                
                _this.histogramData2 = data
                _this.showChart = true
                _this.$forceUpdate()
			})
        }
    }
}
</script>
<style lang="less" scoped>
	.uni-transition {
		bottom: calc(var(--window-bottom) + 0);
	}
    .page{
		overflow-y: scroll!important;
	}
	@import url("./css/main.less");
</style>