<template>
    <view>
         <uni-nav-bar left-icon="back" :fixed="true" :status-bar="true" title="检测详情" @leftClick="goBack" ></uni-nav-bar>
         <view class="page">
             <view class="car-bg">
                <view class="car"></view>
                <view  class="check" ></view>
             </view>
             <view class="fault">
                 <view class="title">检测结果</view>
                 <!-- 手风琴效果 -->
                <uni-collapse>
                    <uni-collapse-item title="事故">
                        <template slot="title">
                            <view class="slot-title-box">
                                <view class="slot-title">车身系统</view>
                                <view class="slot-icon">
                                    <image src="../../static/image/warn.png"></image>
                                    故障代码：49632
                                    <uni-icons color="#bbb" size="20" type="arrowdown" />
                                </view>
                                
                            </view>
                        </template>
                        <view style="padding: 30rpx;">
                            手风琴效果
                        </view>
                    </uni-collapse-item>
                    <uni-collapse-item title="标题文字">
                        <view style="padding: 30rpx;">
                            手风琴效果
                        </view>
                    </uni-collapse-item>
                    <uni-collapse-item title="标题文字">
                        <view style="padding: 30rpx;">
                            手风琴效果
                        </view>
                    </uni-collapse-item>
                </uni-collapse>
             </view>
         </view>
    </view>
</template>
<script>
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
export default {
    components: {
        uniCollapse,
        uniCollapseItem
    },
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

	@import url("./css/details.less");
</style>