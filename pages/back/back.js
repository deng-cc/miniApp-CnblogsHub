var service = require("../../service/statuses.js")

Page({
	onClearTap:function(event){
		wx.clearStorageSync();
		console.log("clear local storage end")
	},
	onTestTap1:function(event){
		function sucess(data){
			console.log("--------------pageIndex1--------------")
			console.log(data)
			console.log("--------------pageIndex1--------------")
		}
		service.getStatuses("following", 2, 25, sucess, null)
	},
	onTestTap2: function (event) {
		function sucess(data) {
			console.log("--------------pageIndex2--------------")
			console.log(data)
			console.log("--------------pageIndex2--------------")
		}
		service.getStatuses("following", 1, 50, sucess, null)
	}
})