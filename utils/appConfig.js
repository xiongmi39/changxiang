//假数据
// var basePath = "http://rap2api.taobao.org/app/mock/8763/";
var md5 = require('./md5.js');

//测试服务地址
// var basePath = "http://192.168.4.82:9080/pss_mp/";
var basePath = "http://192.168.1.137:80/pss_mp/";
// var basePath = "http://47.104.178.197:8082/pss_mp/";
// var basePath = "https://www.kkhedu.cn/pss_mp/";
var accessid= 'LTAI9x58N5LlyUIP';
var accesskey= 'hQuVSHsJwwxjZ0MvjB9RKBYepKiMYD';
var host = 'https://cwagpss.oss-cn-qingdao.aliyuncs.com/';
var policy = 'eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==';
var signature = 'xwEIIJrFp6tnDWBJkG/qziqSl+M=';

function getSign(url,params){
	var paramstext = "";
	if(params.length>0){
		for (var i = 0 ;i<params.length; i++) {
			var tmptext = `${params[i].key}=${params[i].value}&`;
			paramstext += tmptext;
		}
	}
	var currentdate =  dateFormatter(new Date(), 'yyyyMMdd');
	// console.log("url:"+url.replace("http://", "")+paramstext);
	// console.log("currentdate:"+currentdate);
	// console.log("token:"+wx.getStorageSync('token'));
	// console.log("openid:"+wx.getStorageSync('openid'));
	console.log('token:'+wx.getStorageSync('token'));
	var finalurl = `${url.replace("http://", "")}?${paramstext}token=${wx.getStorageSync('token')}&date=${currentdate}`;
	console.log("finalurl:" + finalurl);
	var sign = md5.hexMD5(finalurl);
	console.log("sign:"+ sign);
	return sign;
}
function getparamArr(){

}

function dateFormatter(date, format) {
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
		'q+': Math.floor((date.getMonth() + 3) / 3),
		'S': date.getMilliseconds()
	};

	if (/(y+)/.test(format)) {
//RegExp.$1表示匹配到的第一个结果(y表示年)
format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
}
for (let k in o) {
	if (new RegExp('(' + k + ')').test(format)) {
		format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
	}
}
return format;
}

var config = {
	'accessid':accessid,
	'accesskey':accesskey,
	'host':host,
	'policy':policy,
	'signature':signature,
	'test': `${basePath}test`,
	'login':basePath+'login'+'?',
	'getOpenId':`${basePath}login/getOpenId`,
	'saveUserInfo':`${basePath}login/saveUserInfo`,
	'getAllFlightList':`${basePath}flight/getAllFlightByFlightNo`,
	'getAllFlightListByDest': `${basePath}flight/getAllFlightListByDest`,
	'getAllInlandDestCityinfo': `${basePath}dest/getAllInlandDestCityinfo`,
	'getAllInternationDestCityinfo': `${basePath}dest/getAllInternationDestCityinfo`,
	'saveRemindFlightInfo':`${basePath}flightRemind/saveRemindFlightInfo`,
	'getAllRemidFlightList':`${basePath}flightRemind/getAllRemidFlightList`,
	'deleteFlightRemind': `${basePath}flightRemind/deleteFlightRemind`,
	'getCarouselFigureinfo': `${basePath}carouselFigure/getCarouselFigureinfo`,
	'sendPhoneVerificationCode': `${basePath}verification/sendPhoneVerificationCode`,
	'getAllComplaintsType' :`${basePath}complaint/getAllComplaintsType`,
	'saveComplain': `${basePath}complaint/saveComplaintsAdvice`,
	'getAllComplaintsAdvice': `${basePath}complaint/getAllComplaintsAdvice`,
	'saveComplaintEvaluate': `${basePath}complaint/saveComplaintEvaluate`
	
};

module.exports = {
	dateFormatter:dateFormatter,
	getSign:getSign,
	config: config
}