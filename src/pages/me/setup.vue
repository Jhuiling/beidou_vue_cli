<template>
	<view>
		<view class="detail-top">
			<image :src="imgurl" @click="chooseHead()" style="border-radius: 50%;width: 118rpx;height: 118rpx;margin: 32rpx 0 12rpx;"></image>
			<!-- <cropper selWidth="600rpx" selHeight="600rpx" :avatarSrc="imgurl" @upload="myUpload" imgStyle="">
			</cropper> -->
			<view class="name">点击编辑头像</view>
		</view>
		<view class="detail-list">
			<cmd-cell-item title="手机号码" :addon="mobile" :arrow="false"></cmd-cell-item>
			<cmd-cell-item title="账户昵称" slotRight :arrow="false">
				<view>
					<input type="text" v-model="nickName" class="nike-input" placeholder="请输入您的昵称">
				</view>
			</cmd-cell-item>
			<button type="default" class="over-btn" @click="setInfo">保存</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	import cropper from '@/components/lxiaoxiao-cropper/lxiaoxiao-cropper.vue'
	import common from 'common.js'
	import Binding from 'weex-bindingx';
	import pathToBase64 from '../../js_sdk/gsq-image-tools/image-tools/index.js'
	export default {
		components: {
			uniNavBar,
			cmdCellItem,
			cropper
		},
		data() {
			return {
				label: '',
				imgurl: '/static/image/head_none@2x.png',
				mobile: '',
				nickName: '',
				fansinfo: []
			}
		},
		onLoad() {
			var _this = this;
			common.request('Member/fansinfo', {}, function(res) {
				_this.fansinfo = res.data.info;
				_this.mobile = res.data.info.mobile;
				_this.nickName = res.data.info.nick_name == null ? '' : res.data.info.nick_name;
				_this.imgurl = res.data.info.head_path == null ? '/static/image/head_none@2x.png' : res.data.info.head_path;
			});
		},
		methods: {
			setInfo() {
				common.request('Member/setinfo', {
					nick_name: this.nickName
				}, function(res) {
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: res.data.info
					});
				})
			},
			chooseHead() {
				var _this = this ;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: function(res) {
						console.info(res.tempFiles[0].path)
						// "tempFiles": [{
						// 	"path": "_doc/uniapp_temp_1591584826430/compressed/1591584838352.jpg",
						// 	"size": 254221
						// }]
						// console.log(JSON.stringify(res.tempFilePaths));
						let path = res.tempFilePaths[0];  
						            // 压缩图片  
						            plus.zip.compressImage({    
						                src:path,    
						                dst:path,    
						                overwrite:true,    
						                quality:20,    
						                width: '780px',      
						                height:'1040px',      
						                format: 'jpg'    
						                },    
						                function(res) {    
						                    console.log("图片压缩完成");    
						                    let imgPathUrl = res.target;   
						                    let imgPathSize = res.size;  
						                    console.log("图片链接："+imgPathUrl)  
						                    console.log("图片尺寸："+imgPathSize)  
						                    // 文件系统中的读取文件对象，用于获取文件的内容  
						                    uni.showLoading({  
						                        title: '图片转换中。。。'  
						                    });  
						                    let reader = new plus.io.FileReader();   
						                    // 文件读取操作完成时的回调函数  
						                    reader.onloadend = (fileData)=> {  
						                        uni.hideLoading();  
						                        console.log('文件读取完成！');      
						                        let speech = fileData.target.result;//base64图片
												   // console.log(speech)
												   _this.myUpload(speech)
						                        // 去除base64文件头  
						                        // let imgData = speech.replace(/^data:image\/\w+;base64,/, "");  
						
						                    };      
						                    reader.readAsDataURL(res.target);  
						                },    
						                function(error) {    
						                    console.log("Compress error!",error);   
						                    return;   
						
						            });
					}
				});
			},
			//上传返回图片
			myUpload(rsp) {
				const self = this;
				// console.log(rsp)
				// self.imgurl = rsp.path; //更新头像方式一
				common.request('Member/uploadimg', {
					head_path: rsp,
				}, function(res) {
					console.log(res)
					if(res.data.status == 1){
						self.imgurl = res.data.info
					}else{
						uni.showToast({
							icon: 'none',
							position: 'center',
							title: res.data.info
						});
					}
				})
				// console.info(rsp);
				// rsp.avatar.imgSrc = rsp.path; //更新头像方式二
			},
		},
	}
</script>

<style lang="less" scoped>
	@import url("./css/setup.less");
</style>
