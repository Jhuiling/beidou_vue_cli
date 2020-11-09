<template>
<view>
<uni-nav-bar
      left-icon="back"
      :fixed="true"
      :status-bar="true"
      title="设备管理员"
      @clickLeft="goBack"
    ></uni-nav-bar>
    <view class="page">
        <view class="user" v-for="item in userList">
            <view class="logo"></view>
            <view class="info">
                <text class="name">{{item.alias}}</text>
                <view class="ident">{{item.is_main ?  '主' : '管'}}</view>
                <view class="username">用户13363236235</view>
            </view>
            <view class="ctrl">
                <image src="../../static/image/s_set@3x.png" @tap="setUser()"></image>
                <image src="../../static/image/del@3x.png" @tap="deleteUser()"></image>
            </view>
        </view>
    </view>
    </view>
</template>
<script>
	var _this;
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
    import common from 'common.js'
    export default {
		data() {
			return {
				userList :[],
				deviceid:null
			}
		},
		mounted () {
			_this = this;
			this.getUserList()
		},
		onLoad(e) {
			this.deviceid = e.deviceid
		},
        methods: {
			
            goBack() {
                uni.navigateBack({
                    data:1
                })
            },
			// 获取用户列表
			getUserList () {
				let data = {
					deviceid:this.deviceid||uni.getStorageSync('deviceid'),
				}
				console.log(data.deviceid)
				common.request('machine/details', data, function(res) {
					console.log(res)
					_this.userList = res.data.info.adminList
				})
			},
            // 设置用户
            setUser() {
                let msg = `是否将用户设成管理员`;
                uni.showModal({
                    title: '',
                    content: msg,
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定');
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            },
            deleteUser() {
                let msg = `是否删除用户？`;
                uni.showModal({
                    title: '',
                    content: msg,
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定');
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });
            }
        }
    }
</script>
<style lang="less" scoped>
	.uni-transition {
		bottom: calc(var(--window-bottom) + 0);
	}

	@import url("./css/main.less");
</style>