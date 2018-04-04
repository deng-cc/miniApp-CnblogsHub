var base = require("base.js");
var commonUtil = require("../utils/common.js")
var baseUrl = base.baseUrl;

const PAGE_SIZE = 20;
const URL_STATUSES = `${baseUrl}/statuses/`;

function getStatuses(type, pageIndex, success, fail) {
	let url = `${URL_STATUSES}@${type}?pageIndex=${pageIndex}&pageSize=${PAGE_SIZE}&tag=`;
	base.sendGetAuth(url, success, fail);
}

function getStatus(id, success, fail) {
	let url = `${URL_STATUSES}${id}`;
	base.sendGetAuth(url, success, fail);
}

function getComments(id, success, fail) {
	let url = `${URL_STATUSES}${id}/comments`;
	base.sendGetAuth(url, success, fail);
}

function sendStatus(content, success, fail) {
	let url = `${URL_STATUSES}`;
	let isPrivate = false;
	let data = {
		Content: content,
		IsPrivate: isPrivate
	}
	base.sendPostAuth(url, data, success, fail)
}

function replyStatus(statusId, content, replyToUserId, commentId, success, fail) {
	let url = `${URL_STATUSES}${statusId}/comments`;
	let data = {
		"ReplyTo": replyToUserId,
		"ParentCommentId": commentId,
		"Content": content
	}
	base.sendPostAuth(url, data, success, fail);
}

function processContent(data) {
	//处理@
	let pod = data.Content;
	let bean = null;
	let regAt = /<a.*?>(.*?)<\/a>/g;
	while ((bean = regAt.exec(pod))) {
		let url = bean[0];
		let fine = bean[1];
		data.Content = data.Content.replace(url, fine)
	}
	//处理图片
	let regImg = /#img(http:\/\/.*?)#end/g;
	let imgs = regImg.exec(pod);
	if(imgs){
		let imgArr = imgs[1].trim().split(" ");
		data.imgArr = imgArr;
		data.Content = data.Content.replace(imgs[0], "");
	}
}

function processDate(str) {
	//处理为正常格式
	str = str.replace(/-/g, "/");
	str = str.replace("T", " ");
	str = str.substring(0, 19);
	//处理日期为xx前格式
	let date = new Date(str);
	let now = new Date();
	let gap = Date.parse(now) / 1000 - Date.parse(date) / 1000;
	if (gap < 60) {
		str = "刚刚";
	}
	else if (gap < 60 * 60) {
		str = Math.floor(gap / 60) + "分钟前";
	}
	else if (gap < 60 * 60 * 24 && date.getDate() === now.getDate()) {
		str = Math.floor(gap / 60 / 60) + "小时前"
	}
	else {
		str = str.substring(0, 16);
	}
	return str;
}

function processData(data) {
	//处理内容
	processContent(data);
	//处理日期
	data.DateAdded = processDate(data.DateAdded);
	//处理图片外链
	data.UserIconUrl = commonUtil.imgUrlProxy(data.UserIconUrl);
	data.IconName = commonUtil.imgUrlProxy(data.IconName);
	if(data.imgArr){
		for(let i = 0; i < data.imgArr.length; i++){
			data.imgArr[i] = commonUtil.imgUrlProxy(data.imgArr[i]);
		} 
	}
}


module.exports = {
	processData: processData,
	getStatus: getStatus,
	getStatuses: getStatuses,
	getComments: getComments,
	sendStatus: sendStatus,
	replyStatus: replyStatus
}