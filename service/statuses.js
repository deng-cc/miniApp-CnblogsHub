var base = require("base.js");
var commonUtil = require("../utils/common.js")
var baseUrl = base.baseUrl;

const PAGE_SIZE = 30;
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

function processContent(content) {
	//处理@
	let reg = /<a.*?>(@.*?)<\/a>/g;
	let pod = content;
	let bean = null;
	while ((bean = reg.exec(pod))) {
		let url = bean[0];
		let fine = bean[1];
		content = content.replace(url, fine)
	}
	return content;
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
	//处理图片外链
	data.UserIconUrl = commonUtil.imgUrlProxy(data.UserIconUrl);
	//处理内容
	data.Content = processContent(data.Content);
	//处理日期
	data.DateAdded = processDate(data.DateAdded);
}


module.exports = {
	processData: processData,
	getStatus: getStatus,
	getStatuses: getStatuses,
	getComments: getComments,
	sendStatus: sendStatus
}