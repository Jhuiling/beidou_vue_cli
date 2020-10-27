<template>
	<view class="tabBar">
		<view
		 v-for="(item,index) in tabBar" 
		 :key="index" 
		 class="tabbar_item" 
		 :class="{'active':item.pagePath == currentPage}"
		 @click="navTo(item)"
		 >
			<image v-if="item.pagePath == currentPage" :src="item.selectedIconPath" mode=""></image>
			<image v-else :src="item.iconPath" mode=""></image>
			<view class="text">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			currentPage:{
				type:String,
				default:'index'
			}
		},
		data() {
			return {

				tabBar:[{
					"pagePath": "/pages/index/index",
					"iconPath": "../../static/image/home@3x.png",
					"selectedIconPath": "../..static/image/s_home@3x.png",
					"text": "首页"
				}, {
					"pagePath": "/pages/store/index",
					"iconPath": "../../static/image/store@3x.png",
					"selectedIconPath": "../..static/image/s_store@3x.png",
					"text": "商城"
				}, {
					"pagePath": "/pages/me/index",
					"iconPath": "../../static/image/me@3x.png",
					"selectedIconPath": "../..static/image/s_me@3x.png",
					"text": "我的"
				}]
			};
		},
		created() {
			uni.hideTabBar({})
		},
		computed:{
			
		},
		methods:{
			navTo(item){
				console.log(item)
				if(item.pagePath !== this.currentPage){
					uni.switchTab({
						url: item.pagePath
					})
				} else{
					this.$parent.toTop()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	//导航栏设置
		$isRadius:0; //左上右上圆角
		$isWidth:100%; //导航栏宽度
		$isBorder:1px solid rgba(0, 0, 0, 0.33); //边框 不需要则设为0px
		$isBg:#fff; //背景
	
	// 选中设置
		$chooseTextColor:rgb(51, 119, 255); //选中时字体颜色
		$chooseBgColor:white; //选中时背景颜色 transparent为透明
	
	//未选中设置
		$normalTextColor:#999; //未选中颜色
	.tabBar{
		width: $isWidth;
		height: 100upx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		margin:0 auto;
		z-index: 998;
		background-color: $isBg;
		border-top: $isBorder;
		display: flex;
		justify-content: space-around;
		border-top-right-radius: $isRadius;
		border-top-left-radius: $isRadius;
		box-sizing: border-box;
		overflow: hidden;
		.tabbar_item{
			width: 25%;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			&.active{
				border-left: $isBorder;
				border-top: $isBorder;
				background: $chooseBgColor;
				color: $chooseTextColor;
			}
		}
		image{
			width: 48upx;
			height:48upx;
			margin-left: 5upx;
		}
	}
</style>
