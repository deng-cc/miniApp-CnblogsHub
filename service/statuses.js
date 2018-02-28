var base = require("base.js");
var baseUrl = base.baseUrl;

const URL_STATUSES = `${baseUrl}/statuses/`;
const PAGE_SIZE = 30;

function getStatuses(type, pageIndex, success, fail) {
	let url = URL_STATUSES + `@${type}?pageIndex=${pageIndex}&pageSize=${PAGE_SIZE}&tag=`;
	base.sendGetAuth(url, success, fail);
}


module.exports = {
	getStatuses: getStatuses
}