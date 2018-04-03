//flightDetail.js
//获取应用实例
var app = getApp()
Page({
  data: {
    flightInfo:"",
    startCity:"",
    endCity:""
  },
  onReady: function () {
    //获得dialog组件
    this.cxmodal = this.selectComponent("#cxmodal");
  },
  showCxmodal(){
    this.cxmodal.modalinput();
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    this.setData({    
      flightInfo: JSON.parse(options.flightInfo)    
    })
    console.log(this.data.flightInfo);
    var citys = flightInfo.ROUTE_C.split("-");
    var start = citys[0];
    var end = citys[1];
    this.setData({
      startCity: start,
      endCity: end
    })
  }
})
