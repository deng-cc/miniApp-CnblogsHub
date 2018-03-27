var help = require("../../data/help.js")

Page({
	
	data:{
		helpContent:help.content
	},
	onImageTap:function(event){
		wx.previewImage({
			urls: ["http://wx3.sinaimg.cn/mw690/7ce9fb4dgy1fprf5gq83bj2076076wey.jpg"],
		})
	}

})