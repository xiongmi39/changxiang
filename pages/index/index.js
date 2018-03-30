Page({
  data: {
    currentIndex:0,
    startCity:'西安咸阳',
    endCity:'北京首都',
    hotelCity:'上海',
    adultNum: 1,
    childNum: 1,
    rotate: -180,
    showInputPanel: false
  },
  onLoad: function(){
    console.log('页面加载成功');
  },
  onReady: function(){
    this.animation = wx.createAnimation({
      timingFunction: "ease",
      duration: 400
    })
  },

  minusAdultNum: function(){//减少成人的数量
    if(this.data.adultNum > 0){
      this.data.adultNum--;
      this.setData({
        adultNum: this.data.adultNum
      })
    }
  },
  plusAdultNum: function(){//增加成人的数量
    this.data.adultNum++
    this.setData({
      adultNum: this.data.adultNum
    })
  },

  minusChildNum: function(){//减少儿童的数量
    if(this.data.childNum > 0){
      this.data.childNum--;
      this.setData({
        childNum: this.data.childNum
      })
    }
  },
  plusChildNum: function(){//增加儿童的数量
    this.data.childNum++
    this.setData({
      childNum: this.data.childNum
    })
  },

  rotate_img: function() {//旋转飞机图片
    this.animation.rotateZ(this.data.rotate).step()
    this.setData({
      rotate: -1*this.data.rotate,
      startCity: this.data.endCity,
      endCity: this.data.startCity,
      animation: this.animation.export()
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
  },

  seatchProduct: function(){
    wx.navigateTo({
      url:'../productDetail/productDetail'
    })
  },



  selectCity:function(){//选择城市
    console.log('跳转城市选择页面');
    wx.navigateTo({
      url: '../selectcity/selectcity'
    })
  }

})
