<template>
    <view>
    <uni-nav-bar left-icon="back" :fixed="true" :status-bar="true"  right-text="新建闹钟" title="闹钟" @clickLeft="goBack" @clickRight="createClock"></uni-nav-bar>
    <view class="page">
        <view class="item">
            <text class="title">8:00</text>
            <view class="subtitle mini">
                <switch  size="mini"   />
            </view>
        </view>
    </view>
    </view>
</template>

<script>
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
export default {
    components: {uniNavBar},
    data() {
        return {
            nbTitle: '标题',
            nbLoading: false,
            nbFrontColor: '#000000',
            nbBackgroundColor: '#ffffff'
        }
    },
    methods: {
        goBack() {
            uni.navigateBack({
                delta: 1
            })
        },
        createClock() {
            uni.navigateTo({
                url:'/pages/clock/create'
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
