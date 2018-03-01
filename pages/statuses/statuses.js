var app = getApp();
var data = require("../../mock/data.js")
var commonUtil = require("../../utils/common.js")
var service = require("../../service/statuses.js")


Page({
	data: {
		statuses: [],
		curType: "",
		curPageIndex: 0,
		lineText:""
	},

	initStatuses: function (type) {
		wx.showLoading({
			title: "loading"
		});
		this.setData({
			statuses: [],
			curType: type,
			curPageIndex: 1,
			lineText:"加载更多"
		})
		let that = this;
		function process(data) {
			that.processData(data);
			wx.hideLoading();
		}
		service.getStatuses(this.data.curType, this.data.curPageIndex, process, null);
	},

	onLoad: function (options) {
		this.initStatuses("all");
	},

	//下拉刷新
	onPullDownRefresh: function () {
		this.initStatuses(this.data.curType);
		wx.stopPullDownRefresh();
	},

	//触底加载
	onReachBottom: function () {
		console.log("loading new statuses data start")
		wx.showNavigationBarLoading();
		this.setData({
			curPageIndex: this.data.curPageIndex + 1
		})
		let that = this;
		function process(data){
			that.processData(data);
			that.setData({
				lineText: data.length? "加载更多":"没有更多"
			})
			wx.hideNavigationBarLoading();
		}
		service.getStatuses(this.data.curType, this.data.curPageIndex, process, null);
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