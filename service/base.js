

const CLIENT_ID = "";
const CLIENT_SECRET = "";

const KEY_TOKEN = "token";
const KEY_REFRESH_TOKEN = "refresh_token"

const URL_BASE = "https://api.cnblogs.com/api";
const URL_CALLBACK = "https://oauth.cnblogs.com/auth/callback";
const URL_AUTHORIZE = "https://oauth.cnblogs.com/connect/token";



function sendGet(url, success, fail) {
	send(url, "GET", null, null, success, fail);
}

function sendPost(url, data, success, fail) {
	send(url, "POST", null, data, success, fail);
}

function sendGetAuth(url, success, fail) {
	let header = {
		"content-type": "application/json",
		"authorization": "Bearer " + getToken()
	};
	send(url, "GET", header, null, success, fail);
}

function sendPostAuth(url, data, success, fail) {
	let header = {
		"content-type": "application/json",
		"authorization": "Bearer " + getToken()
	};
	send(url, "POST", header, data, success, fail);
}

function sendGetHeader(url, header, success, fail) {
	send(url, "GET", header, null, success, fail);
}

function sendPostHeader(url, header, data, success, fail) {
	send(url, "POST", header, data, success, fail);
}

function send(url, method, header, data, success, fail) {
	wx.request({
		url: url,
		method: method,
		header: header ? header : { "content-type": "application/json" },
		data: data ? data : {},
		success: function (re) {
			console.log(re);
			console.info(method + " request send success, url=" + url + ", statusCode=" + re.statusCode);
			// if not error, invoke success(), else invoke fail()
			switch (re.statusCode) {
				case 200:
					if (success) { success(re.data) };
					break;
				case 401:
					//auth useless
					wx.showToast({
						title: "尝试刷新授权码",
						image: "/images/common/warn.png",
						complete: function () {
							refreshToken(
								function (re) {
									console.log("刷新token成功");
									wx.reLaunch({
										url: "/pages/statuses/statuses"
									})
								},
								function (re) {
									console.log("刷新token失败");
									wx.showToast({
										title: "授权码失效",
										image: "/images/common/warn.png",
										complete: function () {
											wx.removeStorageSync(KEY_TOKEN);
											wx.removeStorageSync(KEY_REFRESH_TOKEN);
											setTimeout(function () {
												wx.reLaunch({
													url: "/pages/index/index"
												})
											}, 800);
										}
									})
								}
							)
						}
					})
					if (fail) { fail(re) };
					break;
				default:
					console.error("api invoke failed, http status code: " + re.statusCode)
					wx.showToast({
						title: re.errMsg,
						image:"/images/common/warn.png"
					})
					if (fail) { fail(re) };
			}
		},
		fail: function (re) {
			wx.showToast({
				title: "当前网络异常",
				image: "/images/common/warn.png"
			})
			console.error(method + " request send fail");
			console.error(re);
		}
	})
}

function getNewToken(code, success, fail) {
	let header = { "content-type": "application/x-www-form-urlencoded" };
	let grantType = "authorization_code";
	let data = {
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		grant_type: grantType,
		code: code,
		redirect_uri: URL_CALLBACK
	};
	sendPostHeader(URL_AUTHORIZE, header, data,
		function (re) {
			wx.setStorageSync(KEY_TOKEN, re["access_token"]);
			wx.setStorageSync(KEY_REFRESH_TOKEN, re["refresh_token"]);
			success(re);
		},
		fail
	);
}

function refreshToken(success, fail) {
	console.log("授权已失效，开始尝试刷新token")
	let header = {
		"content-type": "application/x-www-form-urlencoded",
		"authorization": "Bearer " + getToken()
	};
	let data = {
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		redirect_uri: URL_CALLBACK,
		grant_type: "refresh_token",
		refresh_token: getRefreshToken()
	}
	sendPostHeader(URL_AUTHORIZE, header, data,
		function (re) {
			wx.setStorageSync(KEY_TOKEN, re["access_token"]);
			wx.setStorageSync(KEY_REFRESH_TOKEN, re["refresh_token"]);
			success(re);
		},
		fail
	);
}


function getToken() {
	return wx.getStorageSync(KEY_TOKEN);
}

function getRefreshToken() {
	return wx.getStorageSync(KEY_REFRESH_TOKEN);
}

module.exports = {
	baseUrl: URL_BASE,
	getNewToken: getNewToken,
	sendGetAuth: sendGetAuth,
	sendPostAuth: sendPostAuth
}