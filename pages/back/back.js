Page({
	onClearTap:function(event){
		wx.clearStorageSync();
		console.log("clear local storage end")
	}
})