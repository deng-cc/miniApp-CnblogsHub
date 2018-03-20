var app = getApp();
var service = require("../../service/statuses.js");

Page({

	data: {
		status: {},
		comments: []
	},

	initStatus:function(id){
		wx.showLoading({
			title: "loading"
		});
		let that = this;
		function process(data) {
			that.processComments(data);
			wx.hideLoading();
		}
		service.getStatus(id, this.processStatus, null);
		service.getComments(id, process, null);
	},

	onLoad: function (options) {
		this.initStatus(options.id);
	},

	onPullDownRefresh: function () {
		this.initStatus(this.data.status.Id);
		wx.stopPullDownRefresh();
	},

	processStatus: function (data) {
		service.processData(data);
		this.setData({
			status: data
		})
	},

	processComments: function (data) {
		for (let idx in data) {
			let bean = data[idx];
			service.processData(bean);
		}
		this.setData({
			comments: data
		})
	}


})