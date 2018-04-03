//flightDetail.js
//获取应用实例
var app = getApp()
Page({
  data: {
    flightNo:""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    this.setData({    
      flightNo: options.flightNo    
    })  
    console.log(this.data.flightNo);
  }
})
