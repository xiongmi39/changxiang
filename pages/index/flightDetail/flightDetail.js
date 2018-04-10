//flightDetail.js
//获取应用实例
var app = getApp()
Page({
  data: {
    flightInfo:"",
    startCity:"",
    endCity:"",
    realisland:"",
    startTime:"",
    startDate:""
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
    var startDate = "";
    if(info.DA_TIME){
      startTime = info.DA_TIME.split(" ")[1];
      startDate = item.DA_TIME.split(" ")[0];
    }else if(info.DE_TIME){
      startTime = info.DE_TIME.split(" ")[1];
      startDate = info.DE_TIME.split(" ")[0];
    }else if(info.DP_TIME){
      startTime = info.DP_TIME.split(" ")[1];
      startDate = info.DP_TIME.split(" ")[0];
    }

    if(info.AP_TIME){
      reachTime = info.AP_TIME.split(" ")[1];
    }else if(info.AE_TIME){
      reachTime = info.AE_TIME.split(" ")[1];
    }else if(info.AA_TIME){
      reachTime = info.AA_TIME.split(" ")[1];
    }
    this.setData({
      startCity: start,
      endCity: end,
      realisland: realisland,
      startTime: startTime,
      reachTime: reachTime,
      startDate:startDate
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
      path: '/pages/index/index?flightNo='+this.data.flightInfo.FLIGHT_NO,
     
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  cancelWarn: function(){
    
  }
})
