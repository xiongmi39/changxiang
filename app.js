var appConfig = require('./utils/appConfig.js');
var util = require('./utils/util.js');

App({
  // ========== 全局数据对象（整个应用程序共享） ==========
  globalData: {},
  appConfig: appConfig,
  util:util,

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
  sendUserInfo:function(userInfo){
        wx.request( { 
         url: appConfig.config.saveUserInfo, 
         header: { 
          "content-type": "application/x-www-form-urlencoded"
        }, 
        method: "POST", 
       //data: { cityname: "上海", key: "1430ec127e097e1113259c5e1be1ba70" }, 
       data: util.json2Form(userInfo), 
       complete: function( res ) { 
        console.log(res);
       //  that.setData( { 
       //   toastHidden: false, 
       //   toastText: res.data.reason, 
       //   city_name: res.data.result.data.realtime.city_name, 
       //   date: res.data.result.data.realtime.date, 
       //   info: res.data.result.data.realtime.weather.info, 
       // }); 
       // if( res == null || res.data == null ) { 
       //   console.error( '网络请求失败' ); 
       //   return; 
       // } 
     } 
    }) 
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
              that.globalData.openId = res.data.openId;
              wx.setStorageSync('token', res.data.token);
              wx.setStorageSync('openId', res.data.openid);
              wx.getUserInfo({
                success: function (res) {
                  // that.setData({userInfo: res.userInfo})
                  // that.update();
                  that.globalData.userInfo = res.userInfo;
                  res.userInfo.openId = wx.getStorageSync('openId');
                  res.userInfo.encryptedData = res.encryptedData;
                  res.userInfo.iv = res.iv;
                  res.userInfo.signature = res.signature;
                 
                  console.log(res);
                  that.sendUserInfo(res.userInfo);
                }
              })

            }
          })


        } else {
          that.openAlert();
        }

      },
      fail: function (res) {
        that.openAlert();
      }
    });
    // wx.getUserInfo({
    //   success: function (res) {
    //               // that.setData({userInfo: res.userInfo})
    //               // that.update();
    //               that.globalData.userInfo = res.userInfo;
    //               console.log(JSON.stringify(res));
    //               console.log(res);
    //               that.sendUserInfo(res.userInfo);
    //             }
    // })
    //test
    // wx.setStorageSync('token', "tokentest");
    // wx.setStorageSync('openId', "openIdtest");
    // wx.request({
    //   url: appConfig.config.saveUserInfo,
    //   data: {
    //     aaa:'123',
    //     openId:"openId",
    //     sign: appConfig.getSign(appConfig.config.test,[{key:"aaa",value:"123"}])
    //   },
    //   success: function(res){
    //     console.log(res);
    //   }
    // })



  },
  openAlert: function (val) {
    var text = '网络无反应，请检查您的网络设置';
    if(val){
      text = val;
    }
    wx.showModal({
      content: text,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },
  openToast: function (val) {
    wx.showToast({
      title: val,
      icon: 'success',
      duration: 3000
    });
  }

})
