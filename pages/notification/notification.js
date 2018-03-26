Page({

	onNotificationTap: function (event) {
		let type = event.target.dataset.type;
		if (type) {
			wx.navigateTo({
				url: "/pages/notificationList/notificationList?type=" + type
			})
		}
	}


})