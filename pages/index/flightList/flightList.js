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
  },
  goDetail: function(){
    wx.navigateTo({
      url: '../flightDetail/flightDetail?flightId='+'aaa'
    })
  }
})
