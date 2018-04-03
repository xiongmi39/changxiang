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
    flightNo:""
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
    if(this.data.currentIndex === 0){
      if(this.data.flightNo.length == 0){
        return;
      }
      wx.navigateTo({
        url: './flightDetail/flightDetail?flightNo='+this.data.flightNo
      })
    }else{
      if(this.data.cityCode.length == 0){
        return;
      }
      wx.navigateTo({
        url: './flightList/flightList?dest='+this.data.cityCode
      })
    }

  },
  flightNoInput:function(e){
    this.setData({
      flightNo:e.detail.value
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
  }

})
