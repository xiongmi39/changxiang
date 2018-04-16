//sample.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  onLoad: function () {

  },
  onReady: function () {
    //获得dialog组件
    this.cxType = this.selectComponent("#cxType");
  }
})
