var service = require("../../service/statuses.js");
var commonUtil = require("../../utils/common.js");
//上传图片数量限制
const UPLOAD_IMAGE_COUNT = 9;
//压缩后图片链接的预估占位数，图片链接22+空格1
const ESTIMATED_IMGURL_LENGTH = 23;
//图片解析位的占位数 #img ... #end
const IMG_CODE_LENGTH = 8;
//发送闪存的总字符限制
const STATUS_SIZE_LIMIT = 300;

Page({

	data: {
		remain: 0,
		content: "",
		statusSize:STATUS_SIZE_LIMIT,
		tempFilePaths: []
	},

	onInput: function (event) {
		let content = event.detail.value;
		this.setData({
			remain: content.length,
			content: content
		})
	},

	onChooseTap: function (event) {
		let that = this;
		wx.chooseImage({
			sizeType: "compressed",
			count: UPLOAD_IMAGE_COUNT,
			success: function (res) {
				that.setData({
					tempFilePaths: that.data.tempFilePaths.concat(res.tempFilePaths)
				})
				console.log(res)
			},
		})

	},

	sendStatus: function (content) {
		service.sendStatus(content,
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
			}
		);
	},

	onSubmitTap: function (event) {
		let that = this;
		let content = this.data.content;
		let filePaths = this.data.tempFilePaths;
		if(filePaths.length){
			if(content.length + filePaths.length * ESTIMATED_IMGURL_LENGTH + IMG_CODE_LENGTH > STATUS_SIZE_LIMIT){
				wx.showToast({
					title: "内容和图片占位总字符数不得超过300",
					icon: "none"
				})
				return;
			}
		}

		if (content || filePaths.length) {
			wx.showLoading({
				title: "发送中",
				mask: true
			});

			let imgArr = [];
			//有图片
			if (filePaths.length) {
				for (let i = 0; i < filePaths.length; i++) {
					let filePath = filePaths[i];
					console.log("start upload file:" + filePath);
					wx.uploadFile({
						url: 'https://upload.cc/image_upload',
						filePath: filePath,
						name: "uploaded_file[]",
						success: function (re) {
							let data = JSON.parse(re.data);
							console.log(data);
							if (data["total_success"]) {
								let imgUrl = "https://upload.cc/" + data["success_image"][0].url;
								commonUtil.shortenUrl(imgUrl, function (shortUrl) {
									imgArr.push(shortUrl);
									//所有图片上传成功
									if (imgArr.length == filePaths.length) {
										console.log(imgArr);
										let imgsCode = "#img" + imgArr.join(" ") + " #end";
										content += imgsCode;
										that.sendStatus(content);
										console.log("end upload file");
									}
								});
							} else {
								wx.showToast({
									title: "上传图片失败（图片压缩后需小于2M）",
									icon: "none"
								})
							}
						},
						fail: function (re) {
							console.log(re);
							wx.showToast({
								title: re.errMsg,
								icon: "none"
							})
						}
					})
				}
			}
			//没有图片
			else {
				this.sendStatus(content);
			}
		}
	},

	onDeleteImage: function (event) {
		let tempImages = this.data.tempFilePaths;
		let index = event.target.dataset.imageIndex;
		tempImages.splice(index, 1);
		this.setData({
			tempFilePaths: tempImages
		})
	}


})