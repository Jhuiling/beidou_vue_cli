<template>
	<div class="guide">
		<image :src="imgpath[index]"></image>
		<button class="next_btns" @tap="next(index)"></button>
		<image v-if="index == 2" @tap="next1(indexCheck)" class="check" :src="checklist[indexCheck]"></image>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				imgpath: [
					"../../static/image/guide1.png",
					"../../static/image/guide2.png",
					"../../static/image/guide3.png",
				],
				indexCheck: 0,
				checklist: [
					"../../static/image/check.png",
					"../../static/image/checked.png",
				],
			};
		},
		methods: {
			next() {
				this.index += 1;
				if (this.index > 2) {
					uni.setStorage({
						key: "indexCheck",
						data: "1",
					})
					uni.redirectTo({
						url: "/pages/index/index",
					});
				}
			},
			next1() {
				this.indexCheck += 1;
				if (this.indexCheck == 1) {
					uni.setStorage({
						key: "indexCheck",
						data: "1",
						success: function() {
							// uni.navigateTo({
							// 	url: '/pages/index/guide',
							// });
						},
					});
				}
				if (this.indexCheck > 1) {
					this.indexCheck = 0;
					uni.setStorage({
						key: "indexCheck",
						data: "0",
						success: function() {
							// uni.navigateTo({
							// 	url: '/pages/index/guide',
							// });
						},
					});
					// uni.navigateTo({
					//   url: "/pages/index/index",
					// });
				}
			},
		},
	};
</script>

<style>
	@import "./css/index.css";

	.guide {
		position: fixed;
		width: 100%;
		height: 100%;
	}

	.guide image {
		width: 100%;
		height: 100%;
	}

	.next_btns {
		width: 100px;
		height: 50px;
		background: transparent;
		opacity: 0;
		position: absolute;
		left: 50%;
		margin-left: -50px;
		bottom: 80px;
	}

	.guide .check {
		z-index: 11;
		position: absolute;
		left: 50%;
		margin-left: -50px;
		bottom: 150px;
		/* top: 50%;
  margin-top: -10px; */
		width: 100px;
		height: 20px;
	}
</style>
