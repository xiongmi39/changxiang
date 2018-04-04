//flightList.js
//获取应用实例
var app = getApp()
Page({
  data: {
    dest:"",
    hiddenmodalput:false,
    flightList:[],
    hiddenLoading:true
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
  showCxmodal(){
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
        DEST:that.data.dest,
        openId:wx.getStorageSync('openId'),
        sign: app.appConfig.getSign(app.appConfig.config.getAllFlightListByDest,[{key:"DEST",value:that.data.dest}])
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
        that.handleFlightList(res.data.pd);
        that.setData({
          flightList:res.data.pd
        }) 

      },
      fail: function(){
        that.setData({
          hiddenLoading:true
        })  
      }
    })
  },
  handleFlightList:function(list){
    list.forEach((item)=> {
      let citys = item.ROUTE_C.split("-");
      if(citys.length == 0){
        return
      }
      let start = citys[0];
      let end = citys[1];
      item.startCity = start;
      item.endCity = end;

    });
  }
})
