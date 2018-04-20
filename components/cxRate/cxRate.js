//cxRate.js
var app = getApp()
var count = 0;
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
   properties: {
    star :{
      type : String ,
      value : '0'
    }
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
   data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../images/no-star.png',
    selectedSrc: '../../images/full-star.png',
    halfSrc:'../../images/half-star.png',
    key: 0,//评分
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
   methods: {
    // selectLeft: function (e) {
    //   var key = e.currentTarget.dataset.key
    //   if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
    //     //只有一颗星的时候,再次点击,变为0颗
    //     key = 0;
    //   }
    //   count = key
    //   this.setData({
    //     key: key
    //   })
    // },
  //点击右边,整颗星
    selectRight: function (e) {
      var key = e.currentTarget.dataset.key
      count = key
      this.setData({
        key: key,
        star: key
      })
      console.log(this.data.star) 
      this.triggerEvent('change', { value: this.data.star }, e);
    },
    startRating:function(e){
      wx.showModal({
        title: '分数',
        content: ""+count,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    },
  _refreshFlight: function(){
    this.triggerEvent("refreshFlight");
  }
}
})
