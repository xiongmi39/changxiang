//complainDetail.js
//获取应用实例
var app = getApp()
Page({
  data: {
    star: "0",
    complaintDetail:{}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    this.setData({    
      complaintDetail: JSON.parse(options.complaintDetail)
    })
    console.log(this.data.complaintDetail);   

  },
  onReady: function () {
    //获得dialog组件
    this.cxRate = this.selectComponent("#cxRate");
  },
  previewImage: function(e){
    wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
          })
  },
  sendStar: function(){
    console.log(this.data.star);
  },
  handleChange: function(e) {
    this.setData({
      star: e.detail.value
    })
  },
  saveComplaintEvaluate: function(){
    var that = this;
    wx.request({
      url: app.appConfig.config.saveComplaintEvaluate,
      data: {
        complaint_code: that.data.complaintDetail.complaint_code,
        score: that.data.star,
        openId:wx.getStorageSync('openId'),
        sign: app.appConfig.getSign(app.appConfig.config.saveComplaintEvaluate,[{key:"complaint_code",value:that.data.complaintDetail.complaint_code},{key:"score",value:that.data.star}])
      },
      success: function(res){
        
      },
      fail: function(){

      }
    })
  }
})
