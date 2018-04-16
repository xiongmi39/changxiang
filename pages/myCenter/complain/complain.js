//complain.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    files: [],
    complain:"",
    count:"0/500",
    isOver:false,
    isShow:true,
    phoneNo:"",
    ifPhoneErr:true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                  files: that.data.files.concat(res.tempFilePaths)
                });
                console.log(that.data.files);
              }
            })
    if(this.data.files.length == 3){
      this.setData({
        isShow:false
      })
    }else{
      this.setData({
        isShow:true
      })
    }
  },
  previewImage: function(e){
    wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
          })
  },
  complainInput: function(e){
    var count = "";
    if(e.detail.value.length <500){
      count = e.detail.value.length+"/500";
      this.setData({
        isOver:false
      })
    }else{
      count = 500 - e.detail.value.length;
      this.setData({
        isOver:true
      })
    }
   
    this.setData({
      complain:e.detail.value,
      count:count
    })
  },
  phoneInput: function(e){
    this.setData({
      phoneNo:e.detail.value,
      ifPhoneErr:true
    })
    console.log(this.data.phoneNo);
  },
  confirm: function(){
    if(app.util.commonCheck.isNull(this.data.complain) || !app.util.commonCheck.isMinAndMaxStr(this.data.complain,0,500)){
      return;
    }
    if(app.util.commonCheck.isNull(this.data.phoneNo)){
      return;
    }
    if(!app.util.commonCheck.isPhone(this.data.phoneNo)){
      this.setData({
        ifPhoneErr: false
      })
      return;
    }
  }
})
