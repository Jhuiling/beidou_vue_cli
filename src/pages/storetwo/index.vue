<template>
	<view style="height: 100%;">
		
		 <!-- <view class="topfalse" style="width: 100%;height: 90rpx;background-color: #ffffff;"></view> -->
		<view id="nav-bar" class="nav-bar">
			<view v-for="(item,index) in tabBars" :key="item.id" class="nav-item" :class="{current: index === tabCurrentIndex}"
			 :id="'tab'+index" @click="changeTabs(index)">{{item.name}}</view>
		</view>
		<view class="nav-bar-height"></view>
		<view class="content"> 
			<view v-show="tabCurrentIndex === 0">
				<view class="item" v-for="item in goodList">
					<image class="img" mode="widthFix" :src="item.litpic"></image>
					<view class="btm-view">
						<view class="text-box">
							<view class="tit">{{item.title}}</view>
							<view class="text">{{item.subheading}}</view>
						</view>
						<view class="buy-btn" @click="disanf(item.url)">抢购</view>
					</view>
				</view>
				<l-load-more ref="loadMore"></l-load-more>
			</view>
			<view v-show="tabCurrentIndex === 1">
				<view class="swipe-wrap">
					<swiper indicator-dots="true" interval="5000" duration="500" autoplay="true" circular="true" @change="appchange">
						<swiper-item class="swipe-items" v-for="item in appList">
							<view class="card">
								<view class="tit">{{item.title}}</view>
								<image mode="widthFix" class="img" :src="item.litpic"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view>
					<view class="preview-wrap" v-show="index==appSelectEd" v-for="(item,index) in appList">
						<view class="title">{{item.title}}</view>
						<rich-text :nodes="item.content"></rich-text>
					</view>
				</view>
			</view>
			
			
			
			
		</view>
		
		<view class="nav-bar-two" style="z-index:1000;position: fixed;bottom:0;height:120rpx;">
			<view class="nav-bar-item" @click="navTo('/pages/index_daohang/index')">
				<image class="nav-bar-item-icon" src="../../static/image/home@3x.png"  style="border-width: 1rpx;border-color: #ff4564;"></image>
				<text class="nav-bar-item-text">首页</text>
			</view>
			<view class="nav-bar-item" @click="navTo('/pages/storetwo/index')">
				<image class="nav-bar-item-icon" src="../../static/image/store@3x.png"></image>
				<text class="nav-bar-item-text">商城</text>
			</view>
			<view class="nav-bar-item" @click="navTo('/pages/me/index')">
				<image class="nav-bar-item-icon" src="../../static/image/me@3x.png"></image>
				<text class="nav-bar-item-text">我的</text>
			</view>
		</view>
		
	</view>
	
	
</template>

<script>
	import storeList from './storeList'
	import storeApp from './storeApp'
	import LLoadMore from '@/components/l-load-more/l-load-more.vue'
	import common from '@/common.js'
	var _this;
	let windowWidth = 0,
		scrollTimer = false,
		tabBar,
		loadMore = true;
	export default {
		components: {
			storeList,
			storeApp,
			LLoadMore,
		},
		data() {
			return {
				current: 1,
				tabCurrentIndex: 0, //当前选项卡索引
				appSelectEd: 0,
				page: 1,
				goodList: [],
				appList: [],
				tabBars: [{
					name: '商城',
					id: '1',
				}, {
					name: '行业应用',
					id: '2'
				}]
			}
		},
		mounted() {
			_this = this;
		},
		onLoad() {
			this.getlist();
			this.getapp();
		},
		onPullDownRefresh() {
			if (this.tabCurrentIndex == 0) {
				uni.startPullDownRefresh();
				this.goodList = [];
				this.getlist();
			} else if (this.tabCurrentIndex == 1) {
				uni.startPullDownRefresh();
				this.getapp();
			}
		},
		onReachBottom() {
			if (this.tabCurrentIndex == 0) {
				this.getlist();
			}
		},
		methods: {
			disanf(e){
				var x = "https://"+e
				   plus.runtime.openURL(x, function(res) {  
					   console.log(res);  
				   });  
			},
			navTo(url) {
				uni.reLaunch({
					url: url
				});
			},
			getlist() {
				if (!loadMore) return false;
				loadMore = false
				common.request('goods/listdata/page/' + this.page, {type:"caoshi"}, function(res) {
					uni.stopPullDownRefresh();
					if (res.data.status != 1) return false;
					_this.goodList = _this.goodList.concat(res.data.info.data);
					if (res.data.info.current_page < res.data.info.last_page) {
						loadMore = true;
						_this.page++;
					} else {
						_this.$refs.loadMore.$loadOver();
					}
				});
			},
			getapp() {
				common.request('Industry/listdata', {type:"caoshi"}, function(res) {
					console.log(res)
					uni.stopPullDownRefresh();
					console.log(res.data)
					if (res.data.status != 1) return false;
					_this.appList = res.data.info;
				});
			},
			appchange(e){
				this.appSelectEd = e.detail.current;
			},
			//tab切换
			async changeTabs(e) {
				if (scrollTimer) {
					//多次切换只执行最后一次
					clearTimeout(scrollTimer);
					scrollTimer = false;
				}
				let index = e;
				//e=number为点击切换，e=object为swiper滑动切换
				if (typeof e === 'object') {
					index = e.detail.current
				}
				if (typeof tabBar !== 'object') {
					tabBar = await this.getElSize("nav-bar")
				}
				//计算宽度相关
				let tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;
				let nowWidth = 0;
				//获取可滑动总宽度
				for (let i = 0; i <= index; i++) {
					let result = await this.getElSize('tab' + i);
					width += result.width;
					if (i === index) {
						nowWidth = result.width;
					}
				}
				if (typeof e === 'number') {
					//点击切换时先切换再滚动tabbar，避免同时切换视觉错位
					this.tabCurrentIndex = index;
				}
				//延迟300ms,等待swiper动画结束再修改tabbar
				scrollTimer = setTimeout(() => {
					if (width - nowWidth / 2 > windowWidth / 2) {
						//如果当前项越过中心点，将其放在屏幕中心
						this.scrollLeft = width - nowWidth / 2 - windowWidth / 2;
					} else {
						this.scrollLeft = 0;
					}
					if (typeof e === 'object') {
						this.tabCurrentIndex = index;
					}
					this.tabCurrentIndex = index;

					//第一次切换tab，动画结束后需要加载数据
					let tabItem = this.tabBars[this.tabCurrentIndex];
					if (this.tabCurrentIndex !== 0 && tabItem.loaded !== true) {
						// this.loadNewsList('add');
						tabItem.loaded = true;
					}
				}, 300)
			},
			//获得元素的size
			getElSize(id) {
				return new Promise((res, rej) => {
					let el = uni.createSelectorQuery().select('#' + id);
					el.fields({
						size: true,
						scrollOffset: true,
						rect: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	@import "./css/index.css";
	@import url("./css/main.less");
	
</style>
