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
    this.searchFlightByNo();
  },
  searchFlightByNo:function(){
    var that = this;
    wx.request({
      url: app.appConfig.config.getAllFlightList,
      data: {
        FLIGHT_NO:that.data.flightNo,
        openid:wx.getStorageSync('openid'),
        sign: app.appConfig.getSign(app.appConfig.config.saveUserInfo,[{key:"FLIGHT_NO",value:that.data.flightNo}])
      },
      success: function(res){
        console.log(res);
      }
    })
  }
})
