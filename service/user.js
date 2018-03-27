var base = require("base.js");
var commonUtil = require("../utils/common.js")
var baseUrl = base.baseUrl;


const URL_USER = `${baseUrl}/users/`;

function getCurUser(success, fail) {
	let url = URL_USER;
	base.sendGetAuth(url, success, fail);
}

module.exports = {
	getCurUser: getCurUser
}