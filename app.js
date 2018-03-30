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
    wx.login({
      success: function (resdata) {
        if (resdata.code) {
          //发起网络请求
          wx.request({
            url: appConfig.config.login,
            data: {
              code: resdata.code
            },
            success: function(res){
              that.globalData.session_key = res.session_key;
              that.globalData.openid = res.openid;
              wx.getUserInfo({
                success: function (res) {
                  that.setData({userInfo: res.userInfo})
                  that.update();
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
  }

})
