//sample.js
//获取应用实例
var app = getApp()
Page({
  data: {
    complaintList:[]
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
    var that = this;
    wx.request({
      url: app.appConfig.config.getAllComplaintsAdvice,
      data: {
        openId:wx.getStorageSync('openId'),
        sign: app.appConfig.getSign(app.appConfig.config.getAllComplaintsAdvice,[])
      },
      success: function(res){
        that.setData({
          complaintList: res.data.pd
        })
        console.log(res);
      },
      fail: function(){
        app.openAlert();

      }
    })
  },
  goDetail: function(e){
    var complaintDetail = JSON.stringify(e.currentTarget.dataset.detail);
    wx.navigateTo({
      url: '../flightDetail/flightDetail?complaintDetail='+complaintDetail
    })
  }
})
