var app = getApp();
var commonUtil = require("../../utils/common.js")
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
		this.initStatus(this.status.Id);
		wx.stopPullDownRefresh();
	},

	processStatus: function (data) {
		//处理图片外链
		data.UserIconUrl = commonUtil.imgUrlProxy(data.UserIconUrl)
		//处理内容
		data.Content = service.processContent(data.Content);
		this.setData({
			status: data
		})
	},

	processComments: function (data) {

		for (let idx in data) {
			let bean = data[idx];
			//处理图片外链
			bean.UserIconUrl = commonUtil.imgUrlProxy(bean.UserIconUrl)
			//处理内容
			bean.Content = service.processContent(bean.Content);
		}
		this.setData({
			comments: data
		})
	}


})