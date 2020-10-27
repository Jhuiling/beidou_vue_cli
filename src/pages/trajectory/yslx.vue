<template>
  <view>
    <view class="daohangbt">
		<uni-nav-bar
		  left-icon="back"
		  right-text="新建围栏"
		  title="围栏"
		  :fixed="false"
		  @clickLeft="goBack"
		  @clickRight="createEse"
		>
		</uni-nav-bar>
	</view>
    <view class="page">
     <!-- <view class="img_box">
        <image :src="src"></image>
      </view> -->
	  <view @tap="getEnclosureList()">提价</view>
    </view>
  </view>
</template>
<script>
var _this;
import uniSection from "@/components/uni-section/uni-section.vue";
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import common from "common.js";
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import AMapWXfile from '@/plugins/amap-wx.js'
export default {
  components: { uniNavBar },
  data() {
    return {
      encolsureList:[],
	  deviceid:'',
	   src: ''
    };
  },
  onLoad(e){
	  var _this = this ; 
	  var deviceid = e.deviceid 
	  _this.deviceid = e.deviceid 
	common.request("car/route_list",{
		deviceid :deviceid
	} ,function(res) {
		console.log(res)
	});
  },
  mounted() {
    // this.getEnclosureList()
    _this = this; 
	// car/route_list
  },
  methods: {
    // 创建围栏
    createEse() {
          uni.navigateTo({
              url:'/pages/enclosure/create?deviceid='+this.deviceid
          })
      },
    goBack() {
      uni.navigateBack({
        delta: 1
      });
    },
    // 获取围栏列表
    getEnclosureList() {
	    var _this = this ; 
      var  token =  uni.getStorageSync('token')
	    var datas = {
			  deviceid : _this.deviceid,
			  range: '116.31604,39.96491;116.320816,39.966606;116.321785,39.966827;116.32361,39.966957' ,
			  token:token,
			  title:'路线预设',
			  is_police :'1'
	    }
		var uels = 'http://car.jiaxinruanjian.com/api/car/enclosure_create?deviceid='+ _this.deviceid+'&range=116.31604,39.96491;116.320816,39.966606;116.321785,39.966827;116.32361,39.966957&title=路线预设&is_police=1&token='+token
		uni.request({
			url: uels, //仅为示例，并非真实接口地址。
			success: (res) => {
				console.log('get成功');
				console.log(res);
			},
			fail:(res)=>{
				console.log(res);
			}

		});
	
	},
    removeEnclosure(item) {
     
    }
  }
};
</script>
<style lang="less" scoped>
.uni-transition {
  bottom: calc(var(--window-bottom) + 0);
}

@import url("./css/main.less");

.img_box{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.img_box image{
  width: 100%;
  height: 100%;
}
</style>
