var base = require("base.js");
var baseUrl = base.baseUrl;

const PAGE_SIZE = 30;
const URL_STATUSES = `${baseUrl}/statuses/`;
const URL_STATUS = `${baseUrl}/statuses/`
const URL_COMMENTS = `${baseUrl}/statuses/`

function getStatuses(type, pageIndex, success, fail) {
	let url = `${URL_STATUSES}@${type}?pageIndex=${pageIndex}&pageSize=${PAGE_SIZE}&tag=`;
	base.sendGetAuth(url, success, fail);
}

function getStatus(id, success, fail) {
	let url = `${URL_STATUS}${id}`;
	base.sendGetAuth(url, success, fail);
}

function getComments(id, success, fail) {
	let url = `${URL_COMMENTS}${id}/comments`;
	base.sendGetAuth(url, success, fail);
}

function processContent(content){
	//处理@
	let reg = /<a.*?>(@.*?)<\/a>/g;
	let pod = content;
	let bean = null;
	while((bean = reg.exec(pod))){
		let url = bean[0];
		let fine = bean[1];
		content = content.replace(url, fine)
	}
	return content;
}


module.exports = {
	processContent:processContent,
	getStatus: getStatus,
	getStatuses: getStatuses,
	getComments: getComments
}