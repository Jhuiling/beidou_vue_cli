<template>
	<view>
		<view class="detail-list" v-for="item in salaryList">
			<cmd-cell-item :title="item.title" slotRight :arrow="true">
				<navigator :url="'edit?id='+item.id">
					<image style="width: 35rpx; height: 35rpx;margin-right: 10rpx;" src="/static/image/sets@3x.png"></image>
					<text style="font-size: 28rpx;">设置</text>
				</navigator>
				<navigator :url="'fansGroup?id='+item.id">
					<image style="width: 35rpx; height: 35rpx;margin-left:30rpx;margin-right: 10rpx" src="/static/image/me_group@3x.png"></image>
					<text style="font-size: 28rpx;">{{item.number}}</text>
				</navigator>
			</cmd-cell-item>
		</view>
	</view>
</template>

<script>
	var _this = this;
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	import common from 'common.js'
	export default {
		components: {
			uniNavBar,
			cmdCellItem
		},
		data() {
			return {
				salaryList: []
			}
		},
		onShow(){
				this.get_salary_list();
		},
		onLoad() {
			
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: 'create'
			});
		},
		mounted() {
			_this = this;
		},
		methods: {
			get_salary_list() {
				common.request('Salary/salarylist', {}, function(res) {
					console.log(res)
					if (res.data.status == 1) {
						_this.salaryList = res.data.info;
					}else{
						_this.salaryList = [];
					}
				});
			}
		},
	}
</script>

<style lang="less" scoped>
</style>
