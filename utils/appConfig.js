//假数据
// var basePath = "http://rap2api.taobao.org/app/mock/8763/GET/";

//测试服务地址
var basePath = "http://192.168.4.82:9080/pss_mp/login/";

var config = {
	'test': basePath+'test',
	'login':basePath+'login',
	'getOpenId':basePath+'getOpenId'
};

module.exports = {
  config: config
}