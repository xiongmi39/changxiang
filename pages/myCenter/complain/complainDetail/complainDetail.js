//complainDetail.js
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

  },
  onReady: function () {
    //获得dialog组件
    this.cxRate = this.selectComponent("#cxRate");
  }
})
