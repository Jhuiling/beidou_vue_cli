<template>
  <view>
      <uni-nav-bar left-icon="back" :fixed="true" :status-bar="true" title="新建或设置闹钟" @clickLeft="backClock" @clickRight="saveClock">
        <view slot="right" class="nav-save">保存</view>
      </uni-nav-bar>
      <view class="page">
        <picker-view v-if="showPicker" class="picker" :value="value" >
            <picker-view-column>
                <view v-for="(item,index) in hours" :key="index">{{item}}</view>
            </picker-view-column>
            <picker-view-column>
                <view  v-for="(item,index) in mins" :key="index">{{item}}</view>
            </picker-view-column>
        </picker-view>
        <view class="uni-list ">
            <radio-group @change="radioChange">
                <label class="uni-list-cell uni-list-cell-pd change" v-for="(item, index) in items" :key="item.value">
                    <view class="title">{{item.name}}</view>
                    <view class="radios">
                        <radio :value="item.value" :checked="index === current" />
                    </view>                   
                </label>
            </radio-group>
        </view>
  </view>
  </view>
</template>

<script>
var _this = this;
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
export default {
    components: {uniNavBar},
    data() {
        return {
            hours:[1,2,3,4,5,6,7,8,9],
            mins:[],
            value:[8,0],
            showPicker:false,
            current:0,
            items: [{
                    value: '0',
                    name: '仅一次'
                },
                {
                    value: '1',
                    name: '周一',
                    checked: 'true'
                },
                {
                    value: '2',
                    name: '周二'
                },
                {
                    value: '3',
                    name: '周三'
                },
                {
                    value: '4',
                    name: '周四'
                },
                {
                    value: '5',
                    name: '周五'
                },
                {
                    value: '6',
                    name: '周六'
                },
                {
                    value: '7',
                    name: '周日'
                },
            ],
        }
    },
    created() {
        _this = this;
        _this.hours = _this.setArr(_this.hours,24);
        _this.mins = _this.setArr(_this.mins,59);
        _this.$forceUpdate()
        _this.showPicker = true
    },
    methods: {
        // 保存闹钟
        saveClock() {
            uni.navigateBack({
                delta: 1
            })
        },
        backClock() {
            uni.navigateBack({
                delta: 1
            })
        },
        radioChange: function(evt) {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].value === evt.target.value) {
                    this.current = i;
                    break;
                }
            }
        },
        setArr(data,num) {
            data = []
            for(let i = 0; i < num; i++) {
                i = i < 10 ? '0' + i : '' + i
                data.push(i)
            }
            return data
        },
        setStep: function(e) {
            _this.stepIndex = e.target.value
        },
        setDistance: function(e) {
            _this.distanceIndex = e.target.value
        },
    }
}
</script>
    <style lang="less" scoped>
	.uni-transition {
		bottom: calc(var(--window-bottom) + 0);
	}

	@import url("./css/create.less");
</style>