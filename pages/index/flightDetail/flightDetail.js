//flightDetail.js
//获取应用实例
var app = getApp()
Page({
  data: {
    flightInfo:"",
    startCity:"",
    endCity:"",
    realisland:"",
    startTime:""
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
      flightInfo: JSON.parse(options.flightInfo)    
    })
    console.log(this.data.flightInfo);
    this.handleflightInfo(this.data.flightInfo);
  },
  handleflightInfo: function(info){
    //城市
    var citys = info.ROUTE_C.split("-");
    var start = citys[0];
    var end = citys[1];
    //值机区，柜台
    var islandarr = info.COUNTERS.split(",");
    var realisland = [];
    for(var i=0 ; i<islandarr.length;i++){
      realisland.push(islandarr[i].slice(0,1));
    }
    realisland =realisland.join(",");
    //出发时间，到达时间
    var startTime = "";
    var reachTime = "";
    if(info.DA_TIME){
      startTime = info.DA_TIME.split(" ")[1];
    }else if(info.DE_TIME){
      startTime = info.DE_TIME.split(" ")[1];
    }else if(info.DP_TIME){
      startTime = info.DP_TIME.split(" ")[1];
    }

    if(info.AP_TIME){
      startTime = info.AP_TIME.split(" ")[1];
    }else if(info.AE_TIME){
      startTime = info.AE_TIME.split(" ")[1];
    }else if(info.AA_TIME){
      startTime = info.AA_TIME.split(" ")[1];
    }
    this.setData({
      startCity: start,
      endCity: end,
      realisland: realisland,
      startTime: startTime,
      reachTime: reachTime
    })
  }
})
