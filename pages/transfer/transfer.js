//transfer.js
//获取应用实例
var app = getApp()
Page({
  data: {
    isShowFrom1: false,
    isShowFrom2: false,
    isShowFrom3: false,
    isShowRF: true,
    isShowRT: false,
    isShowLF: false,
    isShowLT: false,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 800,
    items: [
    {name: 'plane', value: '飞机', checked: 'true'},
    {name: 'train', value: '高铁'}
    ],
    reachflDate:'2016-09-01',
    reachtrDate:'2016-09-01'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  	//调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    //   that.update()
    // })
  },
  showFrom: function(e){
    var param = e.currentTarget.dataset.param; 
    this.setData({ 
      isShowFrom1: param == 1 ? (!this.data.isShowFrom1) : false,
      isShowFrom2: param == 2 ? (!this.data.isShowFrom2) : false,
      isShowFrom3: param == 3 ? (!this.data.isShowFrom3) : false,
    });
  },
  bindDateChange: function(e) {
    var key = e.currentTarget.dataset.dateType;
    this.setData({
      [key]: e.detail.value
    })
  },
  reachRdoChange: function(e){
    if(!this.data.isShowFrom1){
      return;
    }
    var param = e.currentTarget.dataset.param; 
    if(e.detail.value == "plane"){
      this.setData({ 
        isShowRF: true,
        isShowRT: false
      });      
    }else{
      this.setData({ 
        isShowRF: false,
        isShowRT: true
      });       
    }
    // this.setData({ 
    //   isShowRF: param == 1 ? (!this.data.isShowRF) : false,
    //   isShowRT: param == 2 ? (!this.data.isShowRT) : false,
    //   isShowLF: param == 3 ? (!this.data.isShowLF) : false,
    //   isShowLT: param == 3 ? (!this.data.isShowLT) : false
    // });
  }
})
