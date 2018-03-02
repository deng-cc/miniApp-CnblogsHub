var service = require("../../service/statuses.js")

Page({
	onClearTap:function(event){
		wx.clearStorageSync();
		console.log("clear local storage end")
	},
	onTestTap1:function(event){
		let id = 1327394;
		service.getStatus(id);
	},
	onTestTap2: function (event) {
		let id = 1327394;
		service.getComments(id);
	}
})