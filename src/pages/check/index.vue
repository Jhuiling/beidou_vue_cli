<template>
    <view>
         <uni-nav-bar left-icon="back" :fixed="true" :status-bar="true" title="检测" @leftClick="goBack" ></uni-nav-bar>
         <view class="page">
             <view class="car-bg">
                <view :class="isChecked ? 'car active' : 'car' "></view>
                <view v-if="!isChecked" class="check" @tap="beginCheck"></view>
                <view v-if="isChecked" class="progress-box">
                <progress :percent="percent" show-info stroke-width="10" font-size="14" activeColor="#45e6ff"  backgroundColor="#424aa5" />
            </view>    
             </view>
             <view class="wraning">
                 <image src="../../static/image/detection_degaer@2x.png"></image>
             </view>
             <view class="info">使用此功能需<text>先挂空挡并点火，严禁在行车时</text>使用此功能，否则会造成事故隐患。</view>
         </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            isChecked:false,
            percent:0
        }
    },
    methods: {
        // 返回
        goBack() {
            uni.navigateBack({
                data:1
            })
        },
        beginCheck() {
            this.isChecked = true
            setInterval( ()=> {
                if(this.percent == 99) {
                    clearInterval()
                    return false
                }
                this.percent++
            },50)
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