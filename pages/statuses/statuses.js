var app = getApp();
var data = require("../../mock/data.js")
var commonUtil = require("../../utils/common.js")
var service = require("../../service/statuses.js")


Page({
	data: {
		statuses: [],
		curType: "",
		curPageIndex: 0,
	},

	initStatuses: function (type, success) {
		wx.showLoading({
			title: "loading"
		});
		this.setData({
			statuses: [],
			curType: type,
			curPageIndex: 1
		})
		let that = this;
		function process(data) {
			that.processData(data);
			wx.hideLoading();
			success;
		}
		service.getStatuses(this.data.curType, this.data.curPageIndex, process, null);
	},

	onLoad: function (options) {
		this.initStatuses("all");
	},

	//下拉刷新
	onPullDownRefresh: function () {
		function success() {
			wx.stopPullDownRefresh();
		}
		this.initStatuses(this.data.curType, success);
	},

	//触底加载
	onReachBottom: function () {
		console.log("loading new statuses data start")
		this.setData({
			curPageIndex: this.data.curPageIndex + 1
		})
		service.getStatuses(this.data.curType, this.data.curPageIndex, this.processData, null);
	},

	//topBar类型点击
	onStatusesTypeTap: function (event) {
		let type = event.target.dataset.type;
		this.initStatuses(type);
	},

	//数据处理
	processData: function (data) {
		let result = this.data.statuses;
		for (let idx in data) {
			let bean = data[idx];
			//处理图片外链
			bean.UserIconUrl = commonUtil.imgUrlProxy(bean.UserIconUrl)
			result.push(bean);
		}

		this.setData({
			statuses: result
		})
		console.log("processData end:");
		console.log(result);
		return true;
	}


})