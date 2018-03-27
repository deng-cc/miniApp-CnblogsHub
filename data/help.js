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
		answer: "关注我的微信公众号（TheYellowUmbrella），回复关键词\"code\"即可",
		image:"/images/common/farhampton.jpg"
	},
	{
		question: "4、为什么要关注公众号",
		answer: "之前说过博客园的授权是OAuth2，这需要跳转到博客园的授权登陆网页，而小程序内部不支持单纯的网页跳转（至少个人开发者不支持），所以只能另辟蹊径地将授权网址发送给大家，让大家手动操作一下"
	},
	{
		question: "5、不关注公众号可以获取授权码吗",
		answer: "当然可以，访问如下网址即可：http://t.cn/RE52jiw"
	}

]

module.exports = {
	content:content
}