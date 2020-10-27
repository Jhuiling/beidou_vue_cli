<template>
<view>
          <uni-nav-bar left-icon="back" :fixed="true" :status-bar="true"  title="提醒设置" @clickLeft="goBack"></uni-nav-bar>
      <view class="page">
    <view class="item">
        <text class="title">来电提醒</text>
        <view class="subtitle mini">
            <switch  size="mini"  />
        </view>
    </view>
        <view class="item">
        <text class="title">短信提醒</text>
        <view class="subtitle mini">
            <switch  size="mini"  />
        </view>
    </view>
  </view>
</view>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        // 返回
        goBack() {
            uni.navigateBack({
                data:1
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