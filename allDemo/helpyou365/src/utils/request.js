const Promise = require('es6-promise').Promise

function wxPromisify(fn) {
	return function(obj = {}) {
		return new Promise((resolve, reject) => {
			obj.success = function(res) {
				//成功 (只返回res.data)
				resolve(res.data)
			}
			obj.fail = function(res) {
				//失败
				reject(res)
			}
			fn(obj)
		})
	}
}
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function(callback) {
	let P = this.constructor;
	return this.then(
		value => P.resolve(callback()).then(() => value),
		reason => P.resolve(callback()).then(() => {
			throw reason
		})
	);
};
/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url, data) {
	var getRequest = wxPromisify(wx.request)
	return getRequest({
		url: url,
		method: 'GET',
		data: data,
		header: {
			'Content-Type': 'application/json'
		}
	})
}

/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, data) {
	var postRequest = wxPromisify(wx.request)
	return postRequest({
		url: url,
		method: 'POST',
		data: data,
		header: {
			"content-type": "application/x-www-form-urlencoded"
		},
	})
}

/**
 * 获取get的URL
 */
function getRquestUrl(url, data) {
	var signArr = [];
	for(var x in data) {
		var sign = x + '=' + data[x];
		signArr.push(sign)
	}

	var signString = '';
	for(var x in signArr) {
		if(parseInt(x) + 1 == 1) {
			signString += signArr[x].toString();
		} else {
			signString += "&" + signArr[x].toString();
		}
	}
	return url + "?" + signString;
}

/*文件上传*/
function uploadFile(url,files,name,data) {
	return new Promise((resolve, reject) => {
		wx.uploadFile({
			url: url,
			filePath: files,
			name: name,
			formData: data,
			success: (res => {
				if(res.statusCode === 200) {
					//200: 服务端业务处理正常结束
					resolve(res)
				} else {
					reject(res)
				}
			}),
			fail: (res => {
				reject(res)
			})
		})
	})
}

module.exports = {
	postRequest: postRequest,
	getRequest: getRequest,
	getRquestUrl: getRquestUrl,
	uploadFile:uploadFile
}