var app = getApp();
var data = require("../../mock/data.js")
var commonUtil = require("../../utils/common.js")
var service = require("../../service/statuses.js")

const PAGE_SIZE = 25;
const PAGE_SIZE_LIMIT = service.pageSizeLimit;


Page({
	data: {
		statuses: [],
		curType: "",
		curPageSize: 0,
		curPageIndex: 0,
		lastPageAdd: 0
	},

	initStatuses: function (type) {
		wx.showLoading({
			title: "loading"
		});
		let that = this;
		function process(data) {
			that.setData({
				statuses: [],
				curPageSize: 0,
				curPageIndex: 0,
				lastPageAdd: 0
			});
			if (that.processData(data)) {
				that.setData({
					curType: type,
					curPageIndex: 1,
					curPageSize: data.length,
					lastPageAdd: data.length
				})
				wx.hideLoading();
			}
		}
		service.getStatuses(type, 1, PAGE_SIZE, process, null);
	},

	onLoad: function (options) {
		this.initStatuses("all");
	},

	//下拉刷新
	onPullDownRefresh: function () {
		let type = this.data.curType;
		this.initStatuses(type);
		wx.stopPullDownRefresh();
	},

	//触底加载
	onReachBottom: function () {
		console.log("loading new statuses data start")
		let that = this;
		let type = this.data.curType;
		let overflow = this.data.curPageSize + PAGE_SIZE - PAGE_SIZE_LIMIT;
		if (overflow >= 0) {
			function process(data) {
				if (that.processData(data)) {
					that.setData({
						curPageSize: 0,
						curPageIndex: that.data.curPageIndex + 1,
						lastPageAdd: overflow
					})
				}
			}
			service.getStatuses(type, this.data.curPageIndex, PAGE_SIZE_LIMIT, process, null);
		} else {
			function process(data) {
				if (that.processData(data)) {
					that.setData({
						curPageSize: that.data.curPageSize + PAGE_SIZE,
						lastPageAdd: PAGE_SIZE
					})
				}
			}
			service.getStatuses(type, this.data.curPageIndex, this.data.curPageSize + PAGE_SIZE, process, null);
		}
		console.log("loading new statuses end, addSize=" + this.data.lastPageAdd);
	},

	//topBar类型点击
	onStatusesTypeTap: function (event) {
		let type = event.target.dataset.type;
		this.initStatuses(type);
	},

	//数据处理
	processData: function (data) {
		let result = this.data.statuses;
		let start = this.data.curPageSize ? this.data.curPageSize : 0;
		if (start >= data.length) {
			console.log("processData end, handle nothing")
			return false;
		}
		for (let i = start; i < data.length; i++) {
			let bean = data[i];
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