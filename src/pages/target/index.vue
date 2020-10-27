<template>
  <view>
    <uni-nav-bar
      left-icon="back"
      :fixed="true"
      :status-bar="true"
      title="运动目标设置"
      @clickLeft="goBack"
    ></uni-nav-bar>
    <view class="page">
      <view class="uni-list item">
        <view class="uni-title uni-common-pl title">运动步数</view>
        <view class="uni-list-cell content">
          <view class="uni-list-cell-db">
            <picker @change="setStep" :value="stepIndex" :range="step">
              <view class="uni-input"
                >{{ step[stepIndex] }}步
                <view class="arrow">
                  <image src="../../static/image/right.png"></image>
                </view>
              </view>
            </picker>
          </view>
        </view>
      </view>
      <view class="uni-list item">
        <view class="uni-title uni-common-pl title">运动距离</view>
        <view class="uni-list-cell content">
          <view class="uni-list-cell-db">
            <picker
              @change="setDistance"
              :value="distanceIndex"
              :range="distance"
            >
              <view class="uni-input"
                >{{ distance[distanceIndex] }}公里
                <view class="arrow">
                  <image src="../../static/image/right.png"></image>
                </view>
              </view>
            </picker>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
var _this = this;
export default {
  data() {
    return {
      step: [1000, 3000, 5000, 10000],
      stepIndex: 0,
      distance: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      distanceIndex: 0
    };
  },
  mounted() {
    _this = this;
  },
  methods: {
    goBack() {
        uni.navigateBack({
            data:1
        })
    },
    setStep: function(e) {
      _this.stepIndex = e.target.value;
    },
    setDistance: function(e) {
      _this.distanceIndex = e.target.value;
    }
  }
};
</script>
<style lang="less" scoped>
.uni-transition {
  bottom: calc(var(--window-bottom) + 0);
}

@import url("./css/main.less");
</style>
