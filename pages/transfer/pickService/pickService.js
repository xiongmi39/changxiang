//pickService.js
//获取应用实例
var app = getApp()
Page({
  data: {
    items: [
    {name: 'today', value: '3-28', checked: 'true'},
    {name: 'tomorrow', value: '3-29'}
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

  }

})
