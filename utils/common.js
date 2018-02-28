
function imgUrlProxy(imgUrl) {
	if (imgUrl) {
		return imgUrl.replace(/http\w{0,1}:\/\//g, "https://images.weserv.nl/?url=")
	}
}


module.exports = {
	imgUrlProxy: imgUrlProxy,
}