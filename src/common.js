import config from './config.js'
var canReturn = true
function url(url, vars = {}) {
	var urlStr = config.data.app_host;
	urlStr += '/api/';
	urlStr += url;
	if (vars) {
		for (var i in vars) {
			urlStr += '/' + i + '/' + vars[i]
		}
	}
	urlStr += '.html';
	return urlStr;
}
 
function request(urlStr, data = {}, callBack = function() {}) {
	console.log(data);
	var xxx = data.type
	var token = uni.getStorageSync('token');
	console.log(token)
	data.token = token;
	uni.request({
		url: url(urlStr), 
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		dataType: 'json',
		data: data,
		method: 'POST',
		success: (res) => {
			if(xxx=="caoshi"){
				callBack(res);
			}else{
				if (res.data.status == -99) {
					if(!canReturn) {return false}
					canReturn = false
					uni.showToast({
						icon: 'none',
						position: 'center',
						title: res.data.info
					});
					setTimeout(function() { 
						canReturn = true
						uni.reLaunch({
							url: '/pages/login/login'
						});
					}, 1500);
				} else {
					callBack(res);
				}	
			}
			
		},
		fail: (err) => {
			console.log(err);
		}
	});
}

function formatDate(date, fmt) {
	date = new Date(date * 1000);
	fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	var o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		"s+": date.getSeconds()
	}
	for (var k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			var str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
};

function padLeftZero(str) {
	return ('00' + str).substr(str.length);
}

exports.url = url;
exports.request = request;
exports.formatDate = formatDate;
