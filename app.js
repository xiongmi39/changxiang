var appConfig = require('./utils/appConfig.js');

App({
  // ========== 全局数据对象（整个应用程序共享） ==========
  globalData: {},
  appConfig: appConfig,

  // ========== 应用程序全局方法 ==========
  
  // ========== 生命周期方法 ==========
  onLaunch () {
    // 应用程序启动时触发一次
    console.log('App Launch');
  },

  onShow () {
    // 当应用程序进入前台显示状态时触发
    console.log('App Show')
  },

  onHide () {
    // 当应用程序进入后台状态时触发
    console.log('App Hide')
  },
  logIn:function(){
    var that = this;
    that.globalData.token = "testtoken";
    console.log(that.globalData);
    wx.login({
      success: function (resdata) {
        if (resdata.code) {
          //发起网络请求
          wx.request({
            url: appConfig.config.getOpenId,
            data: {
              code: resdata.code
            },
            success: function(res){
              that.globalData.token = res.data.token;
              that.globalData.openid = res.data.openid;
              wx.setStorageSync('token', res.data.token);
              wx.setStorageSync('openid', res.data.openid);
              wx.getUserInfo({
                success: function (res) {
                  // that.setData({userInfo: res.userInfo})
                  // that.update();
                  that.globalData.userInfo = res.userInfo;
                  console.log(res);
                }
              })

            }
          })


        } else {
          console.log('登录失败！' + res.errMsg)
        }

      },
      fail: function (res) {
        console.log(res)
      }
    });
    //test
    wx.setStorageSync('token', "tokentest");
    wx.setStorageSync('openid', "openidtest");
    // wx.request({
    //   url: appConfig.config.saveUserInfo,
    //   data: {
    //     aaa:'123',
    //     openid:"openid",
    //     sign: appConfig.getSign(appConfig.config.test,[{key:"aaa",value:"123"}])
    //   },
    //   success: function(res){
    //     console.log(res);
    //   }
    // })



  }

})
