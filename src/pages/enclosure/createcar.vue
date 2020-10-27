<template>
  <view>
    <web-view :src="'/hybrid/html/enclosurecar.html?deviceid='+deviceid+'&token='+token+'&longitude='+longitude+'&latitude='+latitude" @pagestart="onPageStart" @onPostMessage="handlePostMessage"
		 @pagefinish="onPageFinish"  @receivedtitle="onReceivedTitle"></web-view> 
    <!-- <view class="page">

    <uni-nav-bar
      left-icon="back"
      right-text="保存"
      title="创建围栏"
      @clickLeft="goBack"
      @clickRight="save"
    >
    </uni-nav-bar>
   
    <view
      ref="showshare"
      :class="close ? 'create-wrap-close' : 'create-wrap-open'"
      class="create-wrap"
    >
      <view class="show-btn" @click="togglePopup()">
        <image
          :src="close ? '/static/image/up.png' : '/static/image/down.png'"
          mode="scaleToFill"
        ></image>
      </view>
      
      <view class="ese-title" v-show="close">精准度设置</view>
      <view class="inner" v-if="!close" ref="createInner">
        <view class="range">
          <view class="title">半径范围</view>
          <view class="g-progress">
            <view class="subtitle">{{ beginNum }}米</view>
            <cu-progress
              :currentNum="currentNum"
              @change="setProgress"
              showVL="440"
              width="440rpx"
              stlyle="display:inline-block;"
              activeColor="#547eff"
              noActiveColor="#efefef"
              strokeWidth="14"
              handleSize="24px"
              bgBorderRadius="10px"
              handleBorderRadius="10px"
              handleColor="#fff"
            ></cu-progress>
            <view class="endtitle">{{ endNum }}米</view>
          </view>
        </view>
        <view class="warning">
          <view class="title">进出报警设置</view>
          <view>
            <radio-group>
              <label
                class="radio-title"
                v-for="(item, index) in 4"
                :key="index"
              >
                <text>进</text>
                <radio />
              </label>
            </radio-group>
          </view>
        </view>
        <view class="type">
          <view class="title">围栏类型</view>
        </view>
        <view class="position">
          <view class="title">定位位置</view>
          <view class="address">
            <image src="../../static/image/shebeiguanli_11.jpg"></image
            >河北省河北省河北省河北省河北省河北省河北省河北省河北省河北省
          </view>
        </view>
        <button type="primary" style="border-radius:50rpx;margin-bottom:40rpx">
          确定
        </button>
      </view>
    </view>
    </view>-->
  </view>
</template>

<script>
var _this, WV;
import uniSection from "@/components/uni-section/uni-section.vue";
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import cuProgress from "@/components/cu-progress/cu-progress.vue";
import common from "common.js";
export default {
  components: {
    uniSection,
    uniIcons,
    cuProgress
  },
  data() {
    return {
      beginNum: 100,
      endNum: 4000,
      currentNum: 0,
      close: true,
      height: 300,
      pageX: 0,
      pixelRatio: 2,
      windowHeight: 1280,
	  deviceid:'',
	  token:'',
	  longitude:'',
	  latitude:''
    };
  },
  onReady() {},
  onLoad(e) {
	  console.log(11111111111111)
	  console.log(e.deviceid)
	  this.deviceid  = e.deviceid
	  var _this = this 
	  // this.createEnclosure();
	  uni.getLocation({
	      type: 'wgs84',
	      success: function (res) {
			  _this.longitude = res.longitude 
			  _this.latitude = res.latitude
	          console.log('当前位置的经度：' + res.longitude);
	          console.log('当前位置的纬度：' + res.latitude);
	      }
	  });
	  uni.getStorage({
	      key: 'token',
	      success: function (res) {
			  _this.token = res.data
	          // console.log('这是获取key中的内容',res.data) 
	      }
	  }) 
  },
  onShow() {},
  mounted() {
    _this = this;
    // _this.createEnclosure();
    // #ifdef APP-PLUS
    // uni.getSystemInfo({
    //   success: function(res) {
    //     _this.pixelRatio = res.pixelRatio;
    //     _this.windowHeight = res.windowHeight;
    //   }
    // });
    // setTimeout(() => {
    //   var currentWebview = this.$mp.page.$getAppWebview(); //获取当前页面的webview对象
    //   WV = currentWebview.children()[0];
    //   console.log(this.windowHeight - 200);
    //   WV.setStyle({ top: 94, height: _this.windowHeight - 160 });
    // }, 1000);
    // #endif
  },
  methods: {
    handlePostMessage: function(data) {
				// 获取网页的参数
			},
 
 
			onPageStart: function(e) {
				console.log(e);
				// 监听页面加载成功
				this.PageStart = true;
				// 其实页面也可以使用这个方法传参
				//this.$refs.webview.evalJs("setLoginToken('我就是个参数啊')");
 
			},
			onPageFinish: function(e) {
				this.pagefinish = e.url;
				this.canGoBack = e.canGoBack;
				this.canGoForward = e.canGoForward;
				var tn = currentWebview.getStyle().titleNView;
				tn.titleText = '新手指南'
				// tn.titleText = e.detail.title || '第三方网站';
				// currentWebview.setStyle({
				// 	titleNView: tn
				// });
 
			},
			onReceivedTitle: function(e) {
				if (e.title) {
					var tn = currentWebview.getStyle().titleNView;
					tn.titleText = e.detail.title || '第三方网站';
					currentWebview.setStyle({
						titleNView: tn
					});
				}
			},
			reloadWebviewUrl() {
				// 刷新网页
				var webview = weex.requireModule('webview');
				webview.reload(this.$refs.webview);
			},
    setHeight() {
      WV.setStyle({ top: 90, height: _this.height });
    },
    // 返回
    goBack() {
      uni.navigateBack({
        data: 1
      });
    },
    togglePopup() {
      _this.close = !this.close;
      if (_this.close) {
        WV.setStyle({
          top: 94,
          height: _this.windowHeight - 160,
          zindex: -999
        });
      } else {
        WV.setStyle({
          top: 94,
          height: _this.windowHeight - 530,
          zindex: -999
        });
      }
    },
    setProgress(val) {
      _this.pageX = val.value;
      _this.currentNum =
        _this.beginNum + ((_this.endNum - _this.beginNum) / 100) * val.value;
    },
    // 创建围栏
    createEnclosure() {
      let data = {
        deviceid: this.deviceid,
        latitude: "40.031118",
        longitude: "116.335354",
        range: "400",
        is_police: "1",
        type: 1
      };
	  console.log(this.deviceid)
      common.request("machine/enclosure_create", data, function(res) {
        console.log(data);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.uni-transition {
  bottom: calc(var(--window-bottom) + 0);
}

@import url("./css/create.less");
</style>
