var app = getApp();
var demo = require("../../service/statuses.js");
var base = require("../../service/base.js")

Page({

	onShow: function (options) {
		//异步静默刷新token
		base.refreshTokenSilently();
		let token = wx.getStorageSync("token");
		if (token) {
			wx.showLoading({
				title: "已授权，跳转中",
				mask: true
			})
			wx.switchTab({
				url: "/pages/statuses/statuses"
			})
		}
	},

	onInput: function (event) {
		this.setData({
			code: event.detail.value
		})
	},

	onSubmitTap: function (event) {
		wx.showLoading({
			title: "login",
			mask: true
		})
		let code = this.data.code;
		base.getNewToken(code,
			function (re) {
				wx.hideLoading();
				console.log("getNewToken success")
				console.log(re);
				wx.switchTab({
					url: "/pages/statuses/statuses"
				})
			},
			function (re) {
				console.log("getNewToken failed")
				console.log(re);
				wx.showToast({
					title: "授权码无效",
					image: "/images/common/warn.png"
				})
			}
		);
	},

	onHelpTap: function (event) {
		wx.navigateTo({
			url: "/pages/help/help"
		})
	},

	onSuggestionTap: function (event) {
		let sysInfo = wx.getSystemInfoSync();
		wx.navigateToMiniProgram({
			appId: "wx8abaf00ee8c3202e",
			extraData: {
				id: "25030",
				customData: {
					clientInfo: sysInfo.brand,
					clientVersion: sysInfo.model,
					os: sysInfo.platform,
					osVersion: sysInfo.system
				}
			}
		})
	}

})