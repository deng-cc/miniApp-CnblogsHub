var service = require("../../service/user.js")
var commonUtil = require("../../utils/common.js")

Page({
	
	data:{
		user:{}
	},

	onLoad:function(){
		let that = this;
		service.getCurUser(function(data){
			data.Face = commonUtil.imgUrlProxy(data.Face);
			data.Avatar = commonUtil.imgUrlProxy(data.Avatar);
			that.setData({
				user:data
			})
		}, null);
	},

	onSettingTap:function(event){
		wx.showToast({
			title: "然而并没什么可以设置，就是皮一下",
			icon:"none"

		})
	},

	onSuggestionTap:function(event){
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
	},

	onShareAppMessage:function(options){
		return {
			imageUrl: "/images/setting/coverShare.png"
		}
	},

	onAboutTap: function (event) {
		wx.navigateTo({
			url: "/pages/about/about"
		})
	},

	onLogoutTap: function (event) {
		wx.clearStorageSync();
		wx.reLaunch({
			url: "/pages/index/index"
		})
	}
})