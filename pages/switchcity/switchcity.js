var city = require('../../utils/city.js');
var app = getApp()
Page({
  data: {
    currentIndex:0,
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    // tHeight: 0,
    // bHeight: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    city: "上海市",
    cityCode:"",
    hotcityList: [],
    hiddenLoading:true
  },
  onLoad: function () {
    // 生命周期函数--监听页面加载
    var searchLetter = city.searchLetter;
    this.getChinaCities();
    // var cityList = city.cityList();
    // console.log(cityList);
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp)
    }
    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj
    })

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    if(this.data.currentIndex == 0){
      this.getChinaCities();
    }else{
      this.getAllInternationDestCityinfo();
    }

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  clickLetter: function (e) {
    console.log(e.currentTarget.dataset.letter)
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  //选择城市
  bindCity: function (e) {
    console.log("bindCity")
    this.setData({
     city: e.currentTarget.dataset.city,
     cityCode: e.currentTarget.dataset.citycode
    })
    this.navigateBackFunc();
  },
  //选择热门城市
  bindHotCity: function (e) {
    console.log("bindHotCity")
    this.setData({
      city: e.currentTarget.dataset.city,
      cityCode: e.currentTarget.dataset.citycode
    })
    this.navigateBackFunc();
  },
  //点击热门城市回到顶部
  hotCity: function () {
    this.setData({
      scrollTop: 0,
    })
  },
  handleTapEvent:function(ev){
    this.setData({
      currentIndex:ev.target.dataset.index
    })
    if(ev.target.dataset.index == 0){
      this.getChinaCities();
    }else{
      this.getAllInternationDestCityinfo();
    }
  },
  navigateBackFunc: function(){
    var pages = getCurrentPages()
    var prevPage = pages[pages.length-1]  //当前界面
    var prevPage = pages[pages.length-2]  //上一个页面
    var that = this
    prevPage.setData({
      endCity: that.data.city,
      cityCode: that.data.cityCode
    })
    wx.navigateBack(prevPage);
  },
  getChinaCities: function(){
    var that = this;
    wx.showNavigationBarLoading();
    that.setData({
      hiddenLoading:false,
      cityList: [],
      hotcityList: []
    }) 
        wx.request({
          url: app.appConfig.config.getAllInlandDestCityinfo,
          data: {
            openId:wx.getStorageSync('openId'),
            sign: app.appConfig.getSign(app.appConfig.config.getAllInlandDestCityinfo,[])
          },
          success: function(res){

            // if(!res.data.pd.inlandDestCityList){
            //   that.setData({
            //     hiddenLoading:true
            //   })
            //   return;
            // }
            var cityList = [];
            var hotcityList = [];
            if(res.data.pd.inlandDestCityList && res.data.pd.inlandDestCityList.length> 0){
              cityList = city.cityList(res.data.pd.inlandDestCityList);
            }
            if(res.data.pd.inlandHotCityList && res.data.pd.inlandHotCityList.length> 0){
              hotcityList = res.data.pd.inlandHotCityList;
            }

            that.setData({
              cityList: cityList,
              hotcityList: hotcityList
            })
            that.setData({
              hiddenLoading:true
            })
           // 隐藏导航栏加载框  
           wx.hideNavigationBarLoading();  
           // 停止下拉动作  
           wx.stopPullDownRefresh(); 
          },
          fail: function(){
            app.openAlert();
          }
        })
  },
  getAllInternationDestCityinfo: function(){
    var that = this;
    wx.showNavigationBarLoading();
    that.setData({
      hiddenLoading:false,
      cityList: [],
      hotcityList: []
    }) 
        wx.request({
          url: app.appConfig.config.getAllInternationDestCityinfo,
          data: {
            openId:wx.getStorageSync('openId'),
            sign: app.appConfig.getSign(app.appConfig.config.getAllInternationDestCityinfo,[])
          },
          success: function(res){

            // if(!res.data.pd.internationDestCityList || res.data.pd.internationDestCityList.length == 0){
            //   that.setData({
            //     hiddenLoading:true
            //   })
            //   return;
            // }
            var cityList = [];
            var hotcityList = [];
            if(res.data.pd.internationDestCityList && res.data.pd.internationDestCityList.length> 0){
              cityList = city.cityList(res.data.pd.internationDestCityList);
            }
            if(res.data.pd.internationHotCityList && res.data.pd.internationHotCityList.length> 0){
              hotcityList = res.data.pd.internationHotCityList;
            }
            that.setData({
              cityList: cityList,
              hotcityList: res.data.pd.hotcityList
            })
            that.setData({
              hiddenLoading:true
            })
            // 隐藏导航栏加载框  
           wx.hideNavigationBarLoading();  
           // 停止下拉动作  
           wx.stopPullDownRefresh(); 
          },
          fail: function(){
            app.openAlert();
          }
        })
  }
})