<template>
	<scroll-view scroll-y="true" @scroll="getScroll" class="page" id="me">
		<uni-nav-bar title="我的" rightIcon="scan" :backgroundColor="scrollTop>0?'rgba(255,255,255,.5)':'rgba(0,0,0,0)'" border=""
		 fixed="true" :color="scrollTop>0?'#000':'#fff'" statusBar="true" @clickRight="scanDevice"></uni-nav-bar>
		<view class="top-view" >
			<view class="me-head">
				<image mode="scaleToFill" style="border-radius: 50%;" :src="imgurl" class="me-head-img"></image>
			</view>
			<view class="name">{{nickName.length==0?mobile:nickName}}</view>
		</view>
		<view class="list-view">
			<uni-list class="list-view">
				<uni-list-item @click="mechineList" title="设备管理" thumb="/static/image/eq@2x.png"></uni-list-item>
			</uni-list>

			<view>
				<view class="machine-box">
					<view class="machine-item">
						<view class="num">1</view>
						<image class="img me_car" mode="widthFix" src="/static/image/me_car@2x.png"></image>
					</view>
					<view class="machine-item">
						<view class="num">2</view>
						<image class="img me_weatch" mode="widthFix" src="/static/image/me_weatch@2x.png"></image>
					</view>
					<view class="machine-item" @tap="goWatch">
						<view class="num me_watchtt">3</view>
						<image class="img me_watch" mode="widthFix" src="/static/image/me_cuff@2x.png"></image>
					</view>
					<view class="machine-item">
						<view class="num">4</view>
						<image class="img" mode="widthFix" src="/static/image/shebei4.png"></image>
					</view>
					<view class="machine-item">
						<view class="num">5</view>
						<image class="img me_belt" mode="widthFix" src="/static/image/me_belt@2x.png"></image>
					</view>

				</view>
			</view>

			<uni-list class="uni-list">
				<uni-list-item title="人员管理" thumb="/static/image/grounps@2x.png" :show-badge="true" badge-text="12"></uni-list-item>
			</uni-list> 
			<navigator class="uni-list" url="/pages/salary/list">
				<uni-list>
					<uni-list-item title="考勤管理" thumb="/static/image/attend@2x.png"></uni-list-item>
				</uni-list>
			</navigator>
			<uni-list class="uni-list">
				<uni-list-item title="关于我们" thumb="/static/image/aboutus@2x.png"></uni-list-item>
			</uni-list>
			<navigator class="uni-list" url="setup">
				<uni-list>
					<uni-list-item title="账户设置" thumb="/static/image/sets@3x.png"></uni-list-item>
				</uni-list>
			</navigator>
			<uni-list class="uni-list">
				<uni-list-item title="常见问题" thumb="/static/image/question@2x.png"></uni-list-item>
			</uni-list>
		</view>
		<view class="btn-wrap">
			<view class="btn-row" v-if="isSalary" @click="doSalary">
				<view>考勤打卡</view>
				<uni-icons type="forward" size="25" color="#fff" />
			</view>
			<view class="btn-row" v-else @click="joinSalary">
				<view>加入考勤组</view>
				<uni-icons type="plusempty" size="30" color="#fff" />
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import common from 'common.js'
	var _this;
	export default {
		components: {
			uniList,
			uniListItem,
			uniIcons,
			uniNavBar
		},
		data() {
			return {
				scrollTop: '',
				label: '',
				imgurl: require('../../static/image/head_none@2x.png'),
				mobile: '',
				nickName: '',
				fansinfo: [],
				isSalary: false,
				salaryId: 0
			}
		},
		onLoad() {},
		onShow() {
			this.getMemberInfo();
		},
		mounted() {
			_this = this;
		},
		methods: {
			mechineList() {
				uni.navigateTo({
					url:'/pages/machine/list'
				})
			},
			// 扫描设备
			scanDevice() {
				uni.navigateTo({
					url:'/pages/machine/scanning'
				})
			},
			goWatch() {
				uni.navigateTo({
					url:'/pages/watch/index'
				})
			},
			getMemberInfo() {
				var _this = this;
				common.request('Member/fansinfo', {}, function(res) {
					_this.fansinfo = res.data.info;
					_this.mobile = res.data.info.mobile;
					_this.nickName = res.data.info.nick_name == null ? '' : res.data.info.nick_name;
					_this.imgurl = res.data.info.head_path == null ? '/static/image/head_none@2x.png' : res.data.info.head_path;
					if (res.data.info.salary) {
						_this.isSalary = true;
						_this.salaryId = res.data.info.salary.sal_id;
					}
				});
			},
			
			getScroll(event) {
				this.scrollTop = event.target.scrollTop
			},
			joinSalary() {
				uni.navigateTo({
					url: '/pages/salary/joinSalary?id=6'
				});
				// uni.scanCode({
				// 	success: function(res) {
				// 		console.log('条码类型：' + res.scanType);
				// 		console.log('条码内容：' + res.result);
				// 		// 扫描通过后跳转到考勤组信息页面
				// 		uni.navigateTo({
				// 			url: '/salsry/info?id=' + res.result
				// 		});
				// 	}
				// });
			},
			doSalary() {
				uni.navigateTo({
					url: '/pages/salary/home?id=' + _this.salaryId
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("./css/main.less");
</style>
