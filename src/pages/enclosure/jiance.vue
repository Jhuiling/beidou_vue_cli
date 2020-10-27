<template>
  <view>
    <view class="topbosx">
		<image class="bgimg" src="../../static/image/oneceshi.png"></image>
		<image :class="turnss==1?'xuzhuaoq turn':'xuzhuaoq'"  src="../../static/image/oneqche.png"></image>  
		<image class="xuanzhua" src="../../static/image/onejianche.png"  @click="jianche"></image>
		<!-- <view class="sahngchi" v-if="dianjl==0" @click="chakan">上次结果</view>
		<view class="sahngchi"  v-if="dianjl==1" @click="guanbi">关闭</view> -->
	</view>
	
	<view>
		<view class="jinggao">警告</view>
		<view class="xigais">使用此功能需先挂空挡并点火，严禁在行车时使用此功能，否则会造成事故隐患</view>
	</view>
	
	<view v-if="dianjl==1">
		<view class="jianchejs">
			检测结果
		</view>
		<view class="waibaowei">
			<view class="dingbus">
				<view class="chesheng">车身系统</view>
				<view class="daibs">故障代码4821</view>
			</view>
			<view class="jishual">
				<view class="jishanns">计算机货辅助输出电路</view>
				<view class="judhdns">无故障</view>
			</view>
			<view class="jishual">
				<view class="jishanns">地盘系统</view>
				<view class="judhdns">无故障</view>
			</view>
			<view class="jishual">
				<view class="jishanns">然后或空气</view>
				<view class="judhdns">无故障</view>
			</view>
			<view class="jishual">
				<view class="jishanns">其他系统</view>
				<view class="judhdns">无故障</view>
			</view>
		</view>
		
		<view class="waibaowei">
			<view class="dingbus">
				<view class="chesheng">混合动力系统</view>
				<view class="daibs">故障代码4821</view>
			</view>
		</view>
		
		<view class="waibaowei">
			<view class="dingbus">
				<view class="chesheng">辅助输出系统</view>
				<view class="daibs">故障代码4821</view>
			</view>
		</view>
	</view>
    
  </view>
</template>
<script>
var _this;
import uniSection from "@/components/uni-section/uni-section.vue";
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import common from "common.js";
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
export default {
  components: { uniNavBar },
  data() {
    return {
      encolsureList:[],
	  deviceid:'',
	  turnss:0,
	  dianjl:0
    };
  },
  onLoad(e){
	  var _this = this ; 
	  _this.deviceid = e.deviceid 
  },
  mounted() {
    _this = this;
  },
  methods: {
	  guanbi(){
		  var _this = this ;
		  _this.dianjl = 0
	  },
	  chakan(){
		  var _this = this ; 
		  _this.dianjl = 1
	  },
	mouseEnter() {
		this.animationShow="paused"
	},
	mouseLeave() {
		this.animationShow="running"
	},
    jianche() {
		var _this = this ; 
		_this.turnss = 1 ;
		_this.dianjl = 0 
        common.request('car/testing', {
			deviceid:_this.deviceid
		}, function(res) {
			if(res.data.status==1){
				uni.showToast({
				    title: res.data.info,
				    duration: 2000
				});
			}else{
				uni.showToast({
				    title: res.data.info,
				    duration: 2000
				});
			}
			setTimeout(function(){
				_this.turnss = 0 
				_this.dianjl = 1
			},1000)
        	console.log(res)   
        })
      }
  }
};
</script>

<style lang="less" scoped>
	.waibaowei{
		width: 90%;
		margin: 20rpx auto;
	}
	.jianchejs{
		font-size: 30rpx;
		text-align: center;
	}
	.jishanns{
		font-size:30rpx;
		color:#777777;
	}
	.judhdns{
		font-size:30rpx;
		color:#777777;
	}
	.chesheng{
		font-size:30rpx;
	}
	.daibs{
		font-size:30rpx;
	}
	.dingbus,.jishual{
		display: flex;
		display: -webkit-flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		border-bottom: 1rpx solid #F3F3F3;
		padding: 20rpx 0rpx;
	}
	.jinggao{
		padding: 20rpx ;
		color: #ffffff;
		background: rgb(122,85,67);
		width: 30%;
		margin: 30rpx auto;
		text-align: center;
	}
	.xigais{
		width: 80%;
		font-size: 30rpx;
		margin: 0rpx auto ;
	}
.uni-transition {
  bottom: calc(var(--window-bottom) + 0);
}
.topbosx{
	width: 100%;
	height: 500rpx;
	position: relative;
}
.bgimg{
	width: 100%;
	height: 500rpx;
}
.xuanzhua{
	width: 170rpx;
	height: 170rpx;
	position: absolute;
	right: 50rpx;
	bottom: 50rpx;
}
.xuzhuaoq{
	width: 160rpx;
	height: 270rpx;
	margin: auto;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
}
.sahngchi{
	position: absolute;
	right: 0;
	top: 0;
	padding: 20rpx;
	background: #FFFFFF;
	font-size: 25rpx;
}
.turn{
      animation:turn 3s linear infinite;      
      margin: 100px auto;
    }
    /* 
      turn : 定义的动画名称
      1s : 动画时间
      linear : 动画以何种运行轨迹完成一个周期
      infinite :规定动画应该无限次播放
     */
    @keyframes turn{
      0%{-webkit-transform:rotate(0deg);}
      25%{-webkit-transform:rotate(90deg);}
      50%{-webkit-transform:rotate(180deg);}
      75%{-webkit-transform:rotate(270deg);}
      100%{-webkit-transform:rotate(360deg);}
    }
@import url("./css/main.less");
</style>
