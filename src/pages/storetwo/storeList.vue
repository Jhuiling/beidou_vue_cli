<template>
	<view class="content" :class="_goodList">
		<you-scroll ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore">
			<view class="item" v-for="item in _goodList" :key="item" @click="scrollTo">
				<image class="img" mode="widthFix" src="/static/image/me_bg@2x.png"></image>
				<view class="btm-view">
					<view class="text-box">
						<view class="tit">产品标题产品标题最多15个字</view>
						<view class="text">产品副标题，最多20字</view>
					</view>
					<view class="buy-btn">抢购</view>
				</view>
			</view>
		</you-scroll>
	</view>
</template>
<script>
	import youScroll from '@/components/you-scroll/you-scroll'
	export default {
		components: {
			youScroll
		},
		name: 'storeList',
		data() {
			return {
				list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			};
		},
		props: {
			goodList: {
				type: Array,
				default () {
					return []
				}
			},
		},
		computed:{
			_goodList(){
				console.info(this.goodList);
				return this.goodList;
			}
		},
		methods: {
			
		},
		onReachBottom() {
			console.info('1');
		}
	}
</script>

<style lang="less" scoped>
	@import url("./css/main.less");
</style>
