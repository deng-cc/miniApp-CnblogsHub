var app = getApp();
var service = require("../../service/statuses.js");

Page({

	onShow:function(){
		this.refreshComments(this.data.status.Id);
	},

	data: {
		status: {},
		comments: []
	},

	initStatus: function (id) {
		wx.showLoading({
			title: "loading"
		});
		this.data.status.Id = id;
		service.getStatus(id, this.processStatus, null);
	},

	onLoad: function (options) {
		this.initStatus(options.id);
	},

	onPullDownRefresh: function () {
		this.initStatus(this.data.status.Id);
		this.refreshComments(this.data.status.Id);
		wx.stopPullDownRefresh();
	},

	refreshComments:function(statusId){
		let that = this;
		function process(data) {
			that.processComments(data);
		}
		service.getComments(statusId, process, null);
	},

	processStatus: function (data) {
		service.processData(data);
		this.setData({
			status: data
		})
		wx.hideLoading();
	},

	processComments: function (data) {
		for (let idx in data) {
			let bean = data[idx];
			service.processData(bean);
		}
		this.setData({
			comments: data
		})
	},

	updateReply: function (event) {
		let reply = app.globalData.reply;
		let status = this.data.status;
		let commentIdx = event.currentTarget.dataset.commentIdx;

		reply.statusId = status.Id;
		reply.userName = commentIdx >= 0 ? this.data.comments[commentIdx].UserDisplayName : "";
		reply.commentId = commentIdx >= 0 ? this.data.comments[commentIdx].Id : 0;
		reply.replyToUserId = commentIdx >= 0 ? this.data.comments[commentIdx].UserId : status.UserId;

		let placeHolder = commentIdx >= 0 ? this.data.comments[commentIdx] : status;
		let placeHolderContent = "回复 @" + placeHolder.UserDisplayName + ": " + placeHolder.Content;
		if (placeHolderContent.length > 100) {
			placeHolderContent = placeHolderContent.substring(0, 99) + "...";
		}
		reply.placeHolderContent = placeHolderContent;
		console.log(reply);
	},

	onReplyParent: function (event) {
		this.updateReply(event);
		wx.navigateTo({
			url: "/pages/reply/reply"
		})
	},

	onReplyChild: function (event) {
		this.updateReply(event);
		wx.navigateTo({
			url: "/pages/reply/reply"
		})
	}

})