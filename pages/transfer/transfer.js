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
    isShowLF: true,
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
    reachflDate:'',
    reachtrDate:'',
    leaveflDate:'',
    leavetrDate:'',
    start:'',
    end:'2019-12-30',
    leavefiles: [],
    reachfiles: [],
    transferInfo:{}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  resetData: function(){
    var currentdate =  app.appConfig.dateFormatter(new Date(), 'yyyy-MM-dd');
    this.setData({
     reachflDate:currentdate,
     reachtrDate:currentdate,
     leaveflDate:currentdate,
     leavetrDate:currentdate,
     start:currentdate  
   })
  },
  onLoad: function () {
    this.resetData();
  },
  showFrom: function(e){
    var param = e.currentTarget.dataset.param; 
    var key = "isShowFrom"+param;
    this.setData({ 
      [key]: !this.data[key]
    });
  },
  bindDateChange: function(e) {
    var key = e.currentTarget.dataset.dateType;
    this.setData({
      [key]: e.detail.value
    })
  },
  reachRdoChange: function(e){
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
  },
  leaveRdoChange: function(e){
    if(e.detail.value == "plane"){
      this.setData({ 
        isShowLF: true,
        isShowLT: false
      });      
    }else{
      this.setData({ 
        isShowLF: false,
        isShowLT: true
      });       
    }    
  },
  chooseImage: function (e) {
    var that = this;
    var key = e.currentTarget.dataset.key;
    wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                  [key]: that.data[key].concat(res.tempFilePaths)
                });
              }
            })
    console.log(this.data.leavefiles);
    console.log(this.data.reachfiles);
  },
  previewImage: function(e){
    var key = e.currentTarget.dataset.key;
    wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data[key] // 需要预览的图片http链接列表
          })
  },
  goPickService: function(){
    wx.navigateTo({
      url: './pickService/pickService?transferInfo='+this.data.transferInfo
    })
  }
})
