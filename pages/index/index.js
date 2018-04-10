var app = getApp()

Page({
  data: {
    currentIndex:0,
    startCity:'西安咸阳',
    endCity:'请输入目的地',
    cityCode:'',
    hotelCity:'上海',
    adultNum: 1,
    childNum: 1,
    rotate: -180,
    showInputPanel: true,
    warnFlightLst:[],
    flightNo:"",
    ifShowErrmsg: true,
    hiddenLoading:true
  },
  onLoad: function(){
    this.getAllRemidFlightList();
  },
  onReady: function(){
    this.animation = wx.createAnimation({
      timingFunction: "ease",
      duration: 400
    })
  },
  selectCity:function(){//选择城市
    console.log('跳转城市选择页面');
    wx.navigateTo({
      // url: '../selectcity/selectcity'
      url: '../switchcity/switchcity'
    })
  },
  seatchFlight:function(){
    if(this.data.currentIndex == 0){
      if(app.util.commonCheck.isNull(this.data.flightNo)){
        return;
      }
      this.searchFlightByNo();
    }else{
      if(app.util.commonCheck.isNull(this.data.cityCode)){
        return;
      }
      wx.navigateTo({
        url: './flightList/flightList?dest='+this.data.cityCode
      })
    }

  },
  flightNoInput:function(e){
    this.setData({
      flightNo:e.detail.value,
      ifShowErrmsg:true
    })
  },
  changeBtn: function(ev) {//单程，往返切换
    var tag = false;
    if(ev.target.dataset.index == 0){
      tag = true;
    }else{
      tag = false;
    }
    this.setData({
      showInputPanel: tag,
      currentIndex: ev.target.dataset.index,
      ifShowErrmsg:true
    })
  },
  searchFlightByNo:function(){
    var that = this;
    that.setData({
      hiddenLoading:false
    })  
    wx.request({
      url: app.appConfig.config.getAllFlightList,
      data: {
        FLIGHT_NO:that.data.flightNo,
        openId:wx.getStorageSync('openId'),
        sign: app.appConfig.getSign(app.appConfig.config.getAllFlightList,[{key:"FLIGHT_NO",value:that.data.flightNo}])
      },
      success: function(res){
        that.setData({
          hiddenLoading:true
        })
        console.log("航班详情");
        console.log(res.data.pd);
        if(!res.data.pd || !res.data.pd.FLIGHT_NO){
          that.setData({
            ifShowErrmsg:false,
            hiddenLoading:true
          }) 
          return;
        }
        var flightInfo = JSON.stringify(res.data.pd); 
        wx.navigateTo({
          url: './flightDetail/flightDetail?flightInfo='+flightInfo
        })
      },
      fail: function(){
        console.log("failed");
        app.openAlert();
        that.setData({
          ifShowErrmsg:false,
          hiddenLoading:true
        })        
      }
    })
  },
  getAllRemidFlightList:function(){
    var that = this;
    wx.request({
      url: app.appConfig.config.getAllRemidFlightList,
      data: {
        openId:wx.getStorageSync('openId'),
        sign: app.appConfig.getSign(app.appConfig.config.getAllRemidFlightList,[])
      },
      success: function(res){
        if(!res.data.pd){
          return;
        }
        app.util.handleFlightList(res.data.pd);
        that.setData({
          warnFlightLst: res.data.pd
        })
      },
      fail: function(){
        console.log("failed");
        app.openAlert();
     
      }
    })
  },
  goDetail: function(e){
    var flightInfo = JSON.stringify(e.currentTarget.dataset.detail);
    wx.navigateTo({
      url: './flightDetail/flightDetail?flightInfo='+flightInfo
    })
  }

})
