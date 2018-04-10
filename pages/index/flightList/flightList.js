//flightList.js
//获取应用实例
var app = getApp()
Page({
  data: {
    dest:"",
    hiddenmodalput:false,
    flightList:[],
    hiddenLoading:true,
    currentFlight:{}
  },
  onReady: function () {
    //获得dialog组件
    this.cxmodal = this.selectComponent("#cxmodal");
  },
  onLoad: function (options) {
    this.setData({    
      dest: options.dest    
    })  
    
    console.log(this.data.dest);
    this.searchFlightByDest();
  },
  showCxmodal(e){
    var flightInfo = e.currentTarget.dataset.detail;
    this.setData({
      currentFlight:flightInfo
    })
    this.cxmodal.modalinput();
  },
  goDetail: function(e){
    var flightInfo = JSON.stringify(e.currentTarget.dataset.detail);
    wx.navigateTo({
      url: '../flightDetail/flightDetail?flightInfo='+flightInfo
    })
  },
  searchFlightByDest:function(){
    var that = this;
    that.setData({
      hiddenLoading:false
    }) 
    wx.request({
      url: app.appConfig.config.getAllFlightListByDest,
      data: {
        dest:that.data.dest,
        openId:wx.getStorageSync('openId'),
        sign: app.appConfig.getSign(app.appConfig.config.getAllFlightListByDest,[{key:"dest",value:that.data.dest}])
      },
      success: function(res){
        that.setData({
          hiddenLoading:true
        })
        if(!res.data.pd || res.data.pd <0){
          that.setData({
            hiddenLoading:true
          }) 
          return;
        }
        app.util.handleFlightList(res.data.pd);
        that.setData({
          flightList:res.data.pd
        }) 

      },
      fail: function(){
        app.openAlert();
        that.setData({
          hiddenLoading:true
        })  
      }
    })
  }
})
