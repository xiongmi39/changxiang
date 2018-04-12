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
    var citys = info.route_c.split("-");
    var start = citys[0];
    var end = citys[1];
    //值机区，柜台
    var islandarr = info.counters.split(",");
    var realisland = [];
    for(var i=0 ; i<islandarr.length;i++){
      realisland.push(islandarr[i].slice(0,1));
    }
    realisland =realisland.join(",");
    //出发时间，到达时间
    var startTime = "";
    var reachTime = "";
    var startDate = "";
    if(info.da_time){
      startTime = info.da_time.split(" ")[1];
      startDate = info.da_time.split(" ")[0];
    }else if(info.de_time){
      startTime = info.de_time.split(" ")[1];
      startDate = info.de_time.split(" ")[0];
    }else if(info.dp_time){
      startTime = info.dp_time.split(" ")[1];
      startDate = info.dp_time.split(" ")[0];
    }

    if(info.ap_time){
      reachTime = info.ap_time.split(" ")[1];
    }else if(info.ae_time){
      reachTime = info.ae_time.split(" ")[1];
    }else if(info.aa_time){
      reachTime = info.aa_time.split(" ")[1];
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
      path: '/pages/index/index?flightNo='+this.data.flightInfo.flight_no,

      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  cancelWarn: function(){

  },
  _refreshFlight: function(){
    this.searchFlightByNo();
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
        that.handleflightInfo(res.data.pd);
        that.setData({
          flightInfo: res.data.pd
        })
      },
      fail: function(){
        app.openAlert();
      
      }
    })
  }
})
