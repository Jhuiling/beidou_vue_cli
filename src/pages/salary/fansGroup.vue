<template>
	<view>
		<view class="detail-list">
			<cmd-cell-item v-for="(item,index) in fansList" :title="item.fans.nick_name" :brief="item.fans.mobile" :slotLeft="true"
			 :slotRight="true" :arrow="false">
				<template slot="slotLeft">
					<image mode="scaleToFill" style="width: 80rpx;height: 80rpx;border-radius: 50%;" :src="item.fans.head_path" class="list-img"></image>
				</template>
				<template slot="slotRight">
					<image @click="authFans(index)" style="width: 35rpx; height: 35rpx;margin-right: 10rpx;" src="/static/image/s_set@3x.png"></image>
					<image @click="delFans(index)" style="width: 35rpx; height: 35rpx;margin-left:30rpx;margin-right: 10rpx" src="/static/image/del@3x.png"></image>
				</template>
			</cmd-cell-item>
		</view>
	</view>
</template>

<script>
	var _this = this;
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-name-item.vue'
	import common from 'common.js'
	export default {
		components: {
			uniNavBar,
			cmdCellItem
		},
		data() {
			return {
				fansList: [],
				id: 0,
			}
		},
		onLoad(e) {
			this.id = e.id;
			this.get_fans_list();
		},
		mounted() {
			_this = this;
		},
		methods: {
			get_fans_list() {
				common.request('Salary/fansList', {
					id: this.id
				}, function(res) {
					if (res.data.status == 1) {
						_this.fansList = res.data.info;
					} else {
						_this.fansList = [];
					}
				});
			},
			delFans(key) {
				uni.showModal({
					title: '是否移除用户' + _this.fansList[key].fans.nick_name,
					success: function(res) {
						if (res.confirm) {
							common.request('Salary/delFans', {
								id: _this.fansList[key].id
							}, function(res) {
								if (res.data.status == 0) {
									uni.showToast({
										icon: 'none',
										title: res.data.info,
										duration: 2000
									});
								} else {
									uni.showToast({
										icon: 'none',
										title: res.data.info,
										duration: 2000
									});
									setTimeout(function() {
										_this.fansList.splice(key, 1);
									}, 2000)
								}
							});
						}
					}
				});
			},
			authFans(key){
				uni.showModal({
					title: '是否转移考勤组管理给' + _this.fansList[key].fans.nick_name,
					success: function(res) {
						if (res.confirm) {
							common.request('Salary/authFans', {
								id: _this.fansList[key].id,
								salId: _this.id
							}, function(res) {
								if (res.data.status == 0) {
									uni.showToast({
										icon: 'none', 
										title: res.data.info,
										duration: 2000
									});
								} else {
									uni.showToast({
										icon: 'none',
										title: res.data.info,
										duration: 2000
									});
									setTimeout(function() {
										uni.navigateBack();
									}, 2000)
								}
							});
						}
					}
				});
			}
		},
	}
</script>

<style lang="less" scoped>
</style>
