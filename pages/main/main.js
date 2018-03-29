var appConfig = require('../../utils/appConfig.js')

var app = getApp()
Page({
  data: {
    motto: 'Hello WeApp',
    userInfo: {},
    movies:[    
    {url:'../../images/swiper.png'} ,    
    {url:'../../images/swiper.png'} ,    
    {url:'../../images/swiper.png'} ,    
    {url:'../../images/swiper.png'}     
    ] 
  },
  onButtonTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  	//登录
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setData({userInfo: res.userInfo})
            that.update();
            console.log(res);
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    });
    //接口测试
    wx.request({
      url: appConfig.config.test,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
      }
    })

  },
  bindViewTap: function(event){
    console.log(event.currentTarget.dataset.id);
  }
})
