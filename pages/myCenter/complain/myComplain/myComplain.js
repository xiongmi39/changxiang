//sample.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getAllComplaintsAdvice();
  },
  getAllComplaintsAdvice: function(){
    wx.request({
      url: app.appConfig.config.getAllComplaintsAdvice,
      data: {
        openId:wx.getStorageSync('openId'),
        sign: app.appConfig.getSign(app.appConfig.config.getAllComplaintsAdvice,[])
      },
      success: function(res){
        console.log(res);
      },
      fail: function(){
        app.openAlert();

      }
    })
  }
})
