var service = require("../../service/statuses.js");
var app = getApp();

Page({

	data: {
		notifications: [],
		curType: "",
		curPageIndex: 0,
		lineText: ""
	},

	initNotifications: function (type) {
		this.setData({
			notifications: [],
			curType: type,
			curPageIndex: 1,
			lineText: "加载更多"
		});
		let that = this;
		function process(data){
			if(data.length < 10){
				that.setData({
					lineText:""
				})
			}
			that.processData(data);
		}
		service.getStatuses(this.data.curType, this.data.curPageIndex, process, null)
	},

	onLoad: function (options) {
		if (options.type) {
			let title = options.type == "mention" ? "@我的" : "回复我的"
			wx.setNavigationBarTitle({
				title: title
			});

		};
		this.initNotifications(options.type);
	},

	//数据处理
	processData: function (data) {
		let result = this.data.notifications;
		for (let idx in data) {
			let bean = data[idx];
			service.processData(bean);
			//如果是@
			if (bean.MentionId) {
				bean.Content = bean.MentionType ? "在评论中提到我：" + bean.Content : "在闪存中提到我：";
			}
			//如果是回复
			else {
				bean.Content = bean.ParentCommentId ? "回复评论：" + bean.Content : "回复闪存：" + bean.Content;
			}
			result.push(bean);
		}
		this.setData({
			notifications: result
		})
	},

	onPullDownRefresh: function () {
		this.initNotifications(this.data.curType);
		wx.stopPullDownRefresh();
	},

	onReachBottom: function () {
		wx.showNavigationBarLoading();
		this.setData({
			curPageIndex: this.data.curPageIndex + 1
		})
		let that = this;
		function process(data) {
			that.processData(data);
			that.setData({
				lineText: data.length ? "加载更多" : "没有更多"
			})
			wx.hideNavigationBarLoading();
		}
		service.getStatuses(this.data.curType, this.data.curPageIndex, process, null);
	},

	onReplyParent: function (event) {
		let statusId = event.currentTarget.dataset.statusId;
		wx.navigateTo({
			url: "/pages/status/status?id=" + statusId
		})
	},

	onReplyChild: function (event) {
		let reply = app.globalData.reply;
		let src = this.data.notifications[event.currentTarget.dataset.notificationIndex];
		reply.statusId = src.StatusId;
		reply.userName = src.UserDisplayName;
		reply.commentId = src.Id;
		reply.replyToUserId = src.UserId;

		let placeHolderContent = "回复 @" + src.UserDisplayName + ": " + src.Content;
		if (placeHolderContent.length > 100) {
			placeHolderContent = placeHolderContent.substring(0, 99) + "...";
		}
		reply.placeHolderContent = placeHolderContent;

		wx.navigateTo({
			url: "/pages/reply/reply"
		})
	}

})