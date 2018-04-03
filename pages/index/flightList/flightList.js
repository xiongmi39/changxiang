//flightList.js
//获取应用实例
var app = getApp()
Page({
  data: {
    dest:""
  },
  onLoad: function (options) {
    this.setData({    
      dest: options.dest    
    })  
    console.log(this.data.dest);
    this.searchFlightByDest();
  },
  goDetail: function(){
    wx.navigateTo({
      url: '../flightDetail/flightDetail?flightId='+'aaa'
    })
  },
  searchFlightByDest:function(){
    var that = this;
    wx.request({
      url: app.appConfig.config.getAllFlightList,
      data: {
        DEST:that.data.dest,
        openid:wx.getStorageSync('openid'),
        sign: app.appConfig.getSign(app.appConfig.config.saveUserInfo,[{key:"DEST",value:that.data.dest}])
      },
      success: function(res){
        console.log(res);
      }
    })
  }
})
