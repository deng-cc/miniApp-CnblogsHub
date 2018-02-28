var base = require("base.js");
var baseUrl = base.baseUrl;

const URL_STATUSES = `${baseUrl}/statuses/`;
const PAGE_SIZE_LIMIT = 100;

function getStatuses(type, pageIndex, pageSize, success, fail) {
	let url = URL_STATUSES + `@${type}?pageIndex=${pageIndex}&pageSize=${pageSize}&tag=`;
	base.sendGetAuth(url, success, fail);
}


module.exports = {
	pageSizeLimit : PAGE_SIZE_LIMIT,
	getStatuses: getStatuses
}