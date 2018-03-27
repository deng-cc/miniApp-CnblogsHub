Page({

	onNotificationMentionTap: function (event) {
		wx.navigateTo({
			url: "/pages/notificationList/notificationList?type=mention"
		})
	},
	onNotificationCommentTap: function (event) {
		wx.navigateTo({
			url: "/pages/notificationList/notificationList?type=comment"
		})
	}

})