//flightList.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  },
  goDetail: function(){
    wx.navigateTo({
      url: '../flightDetail/flightDetail?flightId='+'aaa'
    })
  }
})
