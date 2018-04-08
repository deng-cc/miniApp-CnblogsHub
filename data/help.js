var content = [
	{
		question:"1、cnblogsMemo是什么",
		answer:"这是博客园（https://www.cnblogs.com）中“闪存”功能的微信小程序，“闪存”类似微博和朋友圈，不过功能更简单"
	},
	{
		question: "2、授权码是什么",
		answer: "你可以理解为登陆博客园的钥匙，实际上是因为博客园的API采用OAuth2授权，需要用code换取token，这里的code就是授权码"
	},
	{
		question: "3、如何获取授权码",
		answer: "用浏览器访问\"http://t.cn/RE52jiw\"，或关注我的微信公众号（TheYellowUmbrella），回复关键词\"code\"即可",
		image:"/images/common/farhampton.jpg"
	},
	{
		question: "4、为什么无法直接在小程序登陆",
		answer: "授权需要跳转到博客园的授权登陆页面，但个人开发者的小程序不支持在小程序内部直接的网页跳转(web-view组件不支持)"
	}

]

module.exports = {
	content:content
}