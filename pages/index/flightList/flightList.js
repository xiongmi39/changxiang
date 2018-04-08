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
      //出发，到达城市
      let citys = item.ROUTE_C.split("-");
      if(citys.length == 0){
        return
      }
      let start = citys[0];
      let end = citys[1];
      item.startCity = start;
      item.endCity = end;

      //出发时间，到达时间
      var startTime = "";
      var reachTime = "";
      var startDate = "";
      var endDate = "";
      if(item.DA_TIME){
        startTime = item.DA_TIME.split(" ")[1];
        startDate = item.DA_TIME.split(" ")[0];
      }else if(item.DE_TIME){
        startTime = item.DE_TIME.split(" ")[1];
        startDate = item.DE_TIME.split(" ")[0];
      }else if(item.DP_TIME){
        startTime = item.DP_TIME.split(" ")[1];
        startDate = item.DP_TIME.split(" ")[0];
      }

      if(item.AP_TIME){
        startTime = item.AP_TIME.split(" ")[1];
        endDate = item.AP_TIME.split(" ")[0];
      }else if(item.AE_TIME){
        startTime = item.AE_TIME.split(" ")[1];
        endDate = item.AE_TIME.split(" ")[0];
      }else if(item.AA_TIME){
        startTime = item.AA_TIME.split(" ")[1];
        endDate = item.AA_TIME.split(" ")[0];
      }

      if(endDate.length == 0){
        endDate = startDate;
      }
      item.startTime = startTime;
      item.reachTime = reachTime;
      item.startDate = startDate;
      item.endDate = endDate;

    });
  }
})
