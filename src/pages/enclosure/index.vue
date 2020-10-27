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
      <view class="event-list " v-for="(item, index) in encolsureList" :key="index">
        <!-- <image class="car-icon" v-if="item.type == 1" mode="widthFix" src="/static/image/big_weatch@2x.png"></image> -->
				<image class="car-icon" mode="widthFix" src="/static/image/big_workcard@2x.png"></image>
        <text v-if="item.type == 1" class="car-name">手表</text>
        <text v-if="item.type == 2" class="car-name">工卡</text>
        <view class="time">{{item.update_time}}
            <image src="../../static/image/del@3x.png" v-on:click="removeEnclosure(item)"></image>
        </view>  
        <view class="address">
			{{item.title}} 
        </view>
      </view>
	  
	  <view  v-if="encolsureList.length==0" style="width: 100%;font-size: 30rpx;margin-top: 50rpx;text-align: center;">暂无数据</view>
	  
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
	  deviceid:''
    };
  },
  onLoad(e){
	  var _this = this ; 
	  _this.deviceid = e.deviceid 
  },
  mounted() {
    this.getEnclosureList()
    _this = this;
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
      let data = {
         deviceid:this.deviceid
      }
	   
	  console.log(this.deviceid)
	  
		common.request('machine/enclosure_list', data, function(res) {
			_this.encolsureList = res.data.info.data
			console.log(res)   
		})
    },
    removeEnclosure(item) {
      uni.showModal({
        title: '提示',
        content: '是否删除？',
        success: function (res) {
            if (res.confirm) {
                common.request('machine/enclosure_delete', {id:item.id}, function(result) {
                  console.log(result)
				  uni.showToast({
				      title: '成功',
				      duration: 2000
				  });
                  _this.getEnclosureList()
                })
            } else if (res.cancel) {
                console.log('用户点击取消'); 
            }
        }
      });
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
