//flightDetail.js
//获取应用实例
var app = getApp()
Page({
  data: {
    flightInfo:"",
    isFromList:"",
    startCity:"",
    endCity:"",
    realisland:"",
    startTime:"",
    startDate:"",
    status:"计划"
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
      flightInfo: JSON.parse(options.flightInfo),
      isFromList: options.isFromList    
    })
    console.log(this.data.flightInfo);
    var flightInfo = app.util.handleflightInfo(this.data.flightInfo);
    this.setData({    
      flightInfo: flightInfo    
    })    

  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '畅想旅行',
      // path: '/pages/index/flightDetail/flightDetail?flightInfo='+JSON.stringify(this.data.flightInfo),
      path: '/pages/index/index?flightNo='+this.data.flightInfo.flight_no,

      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  _refreshFlight: function(){
    var pages = getCurrentPages()
    var prevPage = ""  //上上一个页面
    
    if(this.data.isFromList == "true"){
      prevPage = pages[pages.length-1]
      wx.navigateBack(prevPage);
    }else{
      prevPage = pages[pages.length-2]
      wx.navigateBack(prevPage);
    }
    // this.searchFlightByNo();
  },
  searchFlightByNo:function(){
    var that = this;
    wx.request({
      url: app.appConfig.config.getAllFlightList,
      data: {
        flight_no:that.data.flightInfo.flight_no,
        openId:wx.getStorageSync('openId'),
        sign: app.appConfig.getSign(app.appConfig.config.getAllFlightList,[{key:"flight_no",value:that.data.flightInfo.flight_no}])
      },
      success: function(res){
        app.util.handleflightInfo(res.data.pd);
        that.setData({
          flightInfo: res.data.pd
        })
      },
      fail: function(){
        app.openAlert();
      
      }
    })
  },
  deleteFlightRemind: function(){
    var that = this;
    wx.request({
      url: app.appConfig.config.deleteFlightRemind,
      data: {
        flight_no:that.data.flightInfo.flight_no,
        openId:wx.getStorageSync('openId'),
        sign: app.appConfig.getSign(app.appConfig.config.deleteFlightRemind,[{key:"flight_no",value:that.data.flightInfo.flight_no}])
      },
      success: function(res){
        app.openToast('取消关注成功');
        that._refreshFlight();
        var pages = getCurrentPages()
        var prevPage = pages[pages.length-2]  //上一个页面
        wx.navigateBack(prevPage);
      },
      fail: function(){
        app.openAlert();
      }
    })      
  }
})
