var app = getApp();
var service = require("../../service/statuses.js");

Page({

	data: {
		remain: 0,
		content: "",
		reply: app.globalData.reply
	},

	onInput: function (event) {
		let content = event.detail.value;
		this.setData({
			remain: content.length,
			content: content
		})
	},

	onSubmitTap: function (event) {
		let reply = this.data.reply;
		let content = reply.userName ? "@" + reply.userName + ": " + this.data.content : this.data.content;
		if (content) {
			wx.showLoading({
				title: "发送中",
				duration: 1000,
				mask: true
			});
			service.replyStatus(reply.statusId, content, reply.replyToUserId, reply.commentId,
				function () {
					wx.hideLoading();
					wx.showToast({
						title: "发送成功",
						icon: "success",
						complete: function () {
							setTimeout(function () {
								wx.navigateBack();
							}, 1000)
						}
					})
				},
				function () {
					wx.hideLoading();
					wx.showToast({
						title: "发送失败",
						image: "/images/common/warn.png"
					})
				});
		}
	}


})