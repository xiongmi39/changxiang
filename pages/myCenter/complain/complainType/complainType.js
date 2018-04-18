//sample.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  onLoad: function () {
    this.getAllComplaintsType();
  },
  onReady: function () {
    //获得dialog组件
    this.cxType = this.selectComponent("#cxType");
  },
  getAllComplaintsType: function(){
    wx.request({
      url: app.appConfig.config.getAllComplaintsType,
      data: {
        openId:wx.getStorageSync('openId'),
        sign: app.appConfig.getSign(app.appConfig.config.getAllFlightList,[])
      },
      success: function(res){

      },
      fail: function(){
        app.openAlert();

      }
    })
  }
})
