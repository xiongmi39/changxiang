
var app = getApp()
Page({
  data: {
    motto: 'Hello WeApp',
    userInfo: {},
    movies:[    
    {carousel_path:'../../images/swiper.png'} ,    
    {carousel_path:'../../images/swiper.png'} ,    
    {carousel_path:'../../images/swiper.png'} ,    
    {carousel_path:'../../images/swiper.png'}     
    ] 
  },
  onButtonTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.setStorageSync('token', "");
    wx.setStorageSync('openId', "");
    console.log('onLoad')
    var that = this;
  	//登录
    app.logIn();
    //同步处理
    var i=setInterval(function(){
      if(wx.getStorageSync('token') !== ""){
        that.getCarouselFigureinfo();
        clearInterval(i);
      }
    },500)

  },
  bindViewTap: function(event){
    console.log(event.currentTarget.dataset.id);
  },
  getCarouselFigureinfo: function(){
    var that = this;
    wx.request({
      url: app.appConfig.config.getCarouselFigureinfo,
      data: {
        openId:wx.getStorageSync('openId'),
        sign: app.appConfig.getSign(app.appConfig.config.getCarouselFigureinfo,[])
      },
      success: function(res){
        if(!res.data.pd){
          return;
        }
        that.setData({
          movies: res.data.pd
        })
     },
     fail: function(){
      console.log("failed");
      app.openAlert();

      }
    })
  }
})
