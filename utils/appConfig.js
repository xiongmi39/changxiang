//假数据
// var basePath = "http://rap2api.taobao.org/app/mock/8763/GET/";
var md5 = require('./md5.js');

//测试服务地址
var basePath = "http://192.168.4.82:9080/pss_mp/login/";

function getSign(url,params){
	var paramstext = "";
	if(params.length>0){
		for (var i = 0 ;i<params.length; i++) {
			var tmptext = `&${params[i].key}=${params[i].value}`;
			paramstext += tmptext;
		}
	}
	console.log("url:"+paramstext);
	var sign = md5.hexMD5(`${url}?${paramstext}&token=aaaa&date=20170212`);
	return sign;
}
function getparamArr(){

}

var config = {
	'test': `${basePath}test`,
	'login':basePath+'login'+'?',
	'getOpenId':`${basePath}getOpenId`
};

module.exports = {
	getSign:getSign,
	config: config
}