<template>
	<view>
		<view class="detail-list">
			<cmd-cell-item title="考勤组名称" :slotRight="true" :arrow="false">
				<view>
					<input type="text" v-model="title" class="nike-input" placeholder="请输入,限12字以内">
				</view>
			</cmd-cell-item>
			<navigator url="time">
				<cmd-cell-item title="考勤时间" :slotRight="false" :arrow="true" :addon="weekStr.length==0?'请设置':weekStr"></cmd-cell-item>
			</navigator>
			<navigator url="address">
				<cmd-cell-item title="考勤地点" :slotRight="false" :arrow="true" :addon="addressStr.length==0?'请设置':addressStr"></cmd-cell-item>
			</navigator>
			<cmd-cell-item title="考勤公告" :slotRight="true" :arrow="false">
				<view>
					<textarea v-model="notice" class="textarea" placeholder="请输入公告内容,限100字內" />
					</view>
			</cmd-cell-item>
		</view>
		<button type="primary" @click="submit">确认</button>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	import common from 'common.js'
	var _this;
	export default {
		components: {
			uniNavBar,
			cmdCellItem
		},
		data() {
			return {
				id:0,
				title:'',
				notice:'',
				weekStr:'',
				addressStr:''
			}
		},
		onLoad(e) {
			if(e.id){
				this.getSalaryInfo(e.id);
			}
		},
		onShow(){
			this.setStorage();
		},
		onHide(){
			
		},
		onUnload(){
			uni.removeStorageSync('timeData');
			uni.removeStorageSync('location');
			uni.removeStorageSync('range');
		},
		onNavigationBarButtonTap(){
			uni.navigateTo({
			    url: 'create'
			});
		},
		mounted() {
			_this = this;
		},
		methods: {
			getSalaryInfo(id){
				common.request('Salary/salaryInfo',{id:id},function(res){
					if(res.data.status == 1){
						_this.id = res.data.info.id;
						_this.title = res.data.info.title;
						_this.notice = res.data.info.notice;
						uni.setStorageSync('timeData',res.data.info.timeData);
						uni.setStorageSync('range',res.data.info.scope);
						uni.setStorageSync('location',res.data.info.location);
						_this.setStorage();
					}
				})
			},
			setStorage(){
				var timeData = uni.getStorageSync('timeData');
				if(timeData){
					var weekArr = timeData.week;
					var weekStr = '';
					for (var k in weekArr) {
						if (weekArr[k].class == "chose") {
							weekStr+='周'+weekArr[k].name+' ';
						}
					}
					this.weekStr = weekStr;
				}
				
				var location = uni.getStorageSync('location');
				if(location){
					this.addressStr = location.address;
				}
			},
			submit(){
				
				
				var postData = {};
				var timeData = uni.getStorageSync('timeData');
				var location = uni.getStorageSync('location');
				var range = uni.getStorageSync('range');
				if(_this.id>0){
					postData.id = _this.id;
				}
				// console.log(timeData.week)
				// timeData.week = JSON.stringify(timeData.week)
				// timeData.timeChose = JSON.stringify(timeData.timeChose)
				// timeData.overtimeArr = JSON.stringify(timeData.overtimeArr)
				
				console.log(timeData)
				postData.title = this.title;
				postData.notice = this.notice;
				postData.range = range;
				postData.timeData = JSON.stringify(timeData) ;
				postData.location = JSON.stringify(location);
				console.log(postData);
				console.log(JSON.stringify(timeData))
				common.request('Salary/create',postData,function(res){
					console.log(postData)
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: res.data.info
					});
					if(res.data.status ==1){
						uni.removeStorageSync('timeData');
						uni.removeStorageSync('location');
						uni.removeStorageSync('range');
						uni.navigateBack();
					}
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	@import url("./css/create.less");
</style>
