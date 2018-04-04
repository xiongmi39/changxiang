//myCenter.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    showModal:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   //  console.log('onLoad')
   //  var that = this
  	// //调用应用实例的方法获取全局数据
   //  app.getUserInfo(function(userInfo){
   //    //更新数据
   //    that.setData({
   //      userInfo:userInfo
   //    })
   //    that.update()
   //  })
  },
  onReady: function () {
    //获得dialog组件
    this.cxmodal = this.selectComponent("#cxmodal");
  },
  showCxmodal(){
    this.cxmodal.modalinput();
  }

})
