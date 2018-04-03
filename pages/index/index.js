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
    warnFlightLst:[1],
    flightNo:"",
    ifShowErrmsg: true,
    hiddenLoading:true
  },
  onLoad: function(){
    console.log('页面加载成功');
    console.log("openid");
        //test
        wx.request({
          url: app.appConfig.config.saveUserInfo,
          data: {
            aaa:'123',
            openid:wx.getStorageSync('openid'),
            sign: app.appConfig.getSign(app.appConfig.config.saveUserInfo,[{key:"aaa",value:"123"}])
          },
          success: function(res){
            console.log(res);
          }
        })
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
      currentIndex: ev.target.dataset.index
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
        openid:wx.getStorageSync('openid'),
        sign: app.appConfig.getSign(app.appConfig.config.saveUserInfo,[{key:"FLIGHT_NO",value:that.data.flightNo}])
      },
      success: function(res){
        that.setData({
          hiddenLoading:true
        }) 
        wx.navigateTo({
          url: './flightDetail/flightDetail?flightNo='+this.data.flightNo
        })
      },
      fail: function(){
        that.setData({
          ifShowErrmsg:false,
          hiddenLoading:true
        })        
      }
    })
  }

})
