<template>
	<view class="forget">

		<view class="content">
			<!-- 主体 -->
			<form @submit="formSubmit">
				<view class="main">
					<view class="tips">若你忘记了密码，可在此重置新密码。</view>
					<wInput v-model="phoneData" name="mobile" type="text" maxlength="11" placeholder="注册手机号"></wInput>
					<wInput v-model="passData" name="password" type="password" maxlength="11" placeholder="请输入新密码" isShowPass></wInput>
					<wInput v-model="verCode" name="varcode" type="number" maxlength="6" placeholder="验证码" isShowCode ref="runCode"
					 @setCode="getVerCode()"></wInput>
				</view>
				<view  type="submit"  style="background-color:rgb(82,125,225);width: 600rpx;border-radius: 100px;height: 70rpx;line-height: 70rpx;color:#ffffff;margin: 0px auto;"> 
					<text style="text-align: center;font-size: 24rpx;width: 200rpx;margin: 0px auto;display: block;">重置密码</text>
				</view>
			</form>
		</view>
	</view>
</template>
 
<script>
	var _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import common from 'common.js'
	export default {
		data() {
			return {
				phoneData: "", //电话
				passData: "", //密码
				verCode: "", //验证码
				isRotate: false, //是否加载旋转
			}
		},
		components: {
			wInput,
			wButton
		},
		mounted() {
			_this = this;
		},
		methods: {
			getVerCode() {
				//获取验证码
				if (_this.phoneData.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '手机号不正确'
					});
					return false;
				}
				// 请求服务器取得验证码
				uni.request({
					url: common.url('common/sendMobileMessage'), //仅为示例，并非真实接口地址。
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						mobile: _this.phoneData,
					},
					method: 'POST',
					success: (res) => {
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: res.data.info
						});
						if (res.data.status == 1) {
							_this.$refs.runCode.$emit('runCode');
						}
					}
				});
			},
			formSubmit(e) {
				//注册
				uni.request({
					url: common.url('login/forget'), //仅为示例，并非真实接口地址。
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: e.detail.value,
					method: 'POST',
					success: (res) => {
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: res.data.info
						});
						if (res.data.status == 1) {
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								});
							}, 1500);
						}
					}
				});
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>
