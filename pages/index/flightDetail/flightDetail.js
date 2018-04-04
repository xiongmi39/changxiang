//flightDetail.js
//获取应用实例
var app = getApp()
Page({
  data: {
    flightInfo:"",
    startCity:"",
    endCity:"",
    realisland:""
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
    var citys = info.ROUTE_C.split("-");
    var start = citys[0];
    var end = citys[1];

    var islandarr = info.COUNTERS.split(",");
    var realisland = "";
    for(var i=0 ; i<islandarr.length;i++){
      realisland += islandarr[i].slice(0,1);
    }
    this.setData({
      startCity: start,
      endCity: end,
      realisland: realisland
    })
  }
})
