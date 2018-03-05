var service = require("../../service/statuses.js")

Page({
	onClearTap:function(event){
		wx.clearStorageSync();
		console.log("clear local storage end")
	},
	onSuggestTap:function(event){
		console.log("onSuggestTap start")
		let sysInfo = wx.getSystemInfoSync();
		wx.navigateToMiniProgram({
			appId:"wx8abaf00ee8c3202e",
			extraData:{
				id:"25030",
				customData:{
					clientInfo:sysInfo.brand,
					clientVersion: sysInfo.model,
					os:sysInfo.platform,
					osVersion: sysInfo.system
				}
			}
		})
	},
	onTestTap1:function(event){

	},
	onTestTap2: function (event) {

	}
})