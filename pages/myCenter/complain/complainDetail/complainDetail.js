//complainDetail.js
//获取应用实例
var app = getApp()
Page({
  data: {
    star: "0"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

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
  }
})
