var app = getApp();
var demo = require("../../service/statuses.js");
var base = require("../../service/base.js")

Page({

	onShow:function(options){
		let token = wx.getStorageSync("token");
		if(token){
			wx.showLoading({
				title: "已授权，跳转中"
			})
			wx.switchTab({
				url: "/pages/statuses/statuses"
			})
		}
	},
	
	onInputBlur: function(event){
		app.globalData.indexInput = event.detail.value;
	},

	onSubmitTap : function(event){
		let code = app.globalData.indexInput;
		base.getNewToken(code, 
			function(re){
				console.log("getNewToken success")
				console.log(re);
				wx.switchTab({
					url: "/pages/statuses/statuses"
				})
			},
			function(re){
				console.log("getNewToken failed")
				console.log(re);
				wx.showToast({
					title: "授权码无效",
					image:"/images/index/warn.png"
				})
			}
		);
	}

})