
function imgUrlProxy(imgUrl) {
	if (imgUrl) {
		return imgUrl.replace(/http\w{0,1}:\/\//g, "https://images.weserv.nl/?url=")
	}
}

function shortenUrl(url, callback){
	if(url){
		let api = `https://a.bbest.me/short/create?l=${url}`;
		wx.request({
			url: api,
			success:function(re){
				if(re.data["short_url"]){
					callback("http://bbest.me/"+re.data["short_url"]);
				}
			}
		})
	}
}

module.exports = {
	imgUrlProxy: imgUrlProxy,
	shortenUrl: shortenUrl
}