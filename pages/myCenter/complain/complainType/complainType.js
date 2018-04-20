//sample.js
//获取应用实例
var app = getApp()
Page({
  data: {
    complaintType:[],
    complaint_type_code: "",
    complaint_typemx_code:""
  },
  onLoad: function (options) {
    this.setData({    
      complaint_type_code: options.complaint_type_code,
      complaint_typemx_code: options.complaint_typemx_code    
    })
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
            if(that.data.complaint_typemx_code == i.complaint_type_code){
              i.checked = true;
            }else{
              i.checked = false;
            }
           
          })
          item.isExpanded = true;
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
  },
  handleChange: function(e) {
    this.setData({
      complaint_type_code: e.detail.complaint_type_code,
      complaint_typemx_code: e.detail.complaint_typemx_code
    })
    console.log("back");
    console.log(this.data.complaint_type_code);
    console.log(this.data.complaint_typemx_code);
  },
  navigateBackFunc: function(){
    var pages = getCurrentPages()
    var prevPage = pages[pages.length-1]  //当前界面
    var prevPage = pages[pages.length-2]  //上一个页面
    var that = this
    prevPage.setData({
      complaint_type_code: that.data.complaint_type_code,
      complaint_subtype_code: that.data.complaint_typemx_code
    })
    wx.navigateBack(prevPage);
  },
  sureType: function(){
    this.navigateBackFunc();
  }
})
