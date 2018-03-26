Page({

	onNotificationTap:function(event){
		let type = event.target.dataset.type;
		wx.navigateTo({
			url: "/pages/notificationList/notificationList?type=" + type
		})
	}


})