//sample.js
//获取应用实例
var app = getApp()
Page({
  data: {
    complaintType:[]
  },
  onLoad: function () {
    this.getAllComplaintsType();
  },
  onReady: function () {
    //获得dialog组件
    this.cxType = this.selectComponent("#cxType");
  },
  getAllComplaintsType: function(){
    var that = this;
    wx.request({
      url: app.appConfig.config.getAllComplaintsType,
      data: {
        openId:wx.getStorageSync('openId'),
        sign: app.appConfig.getSign(app.appConfig.config.getAllComplaintsType,[])
      },
      success: function(res){
        res.data.pd.map((item) => {
          item.complaint_typemx.map((i) =>{
            i.checked = false;
          })
        })
        that.setData({
          complaintType: res.data.pd
        })
        console.log(that.data.complaintType);
      },
      fail: function(){
        app.openAlert();

      }
    })
  }
})
