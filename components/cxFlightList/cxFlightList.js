//cxFlightList.js
var app = getApp()
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    flightList:{
      type : Array ,
      value : ''
    }
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    // 弹窗显示控制
    hiddenmodalput:false,
    verticode:"",
    isDisabled: false,
    phoneNo:"",
    wait:60,
    sendCount:"获取验证码",
    ifPhoneErr:true,
    isUp:false,
    ifVericodeErr:true

  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
   methods: {
     modalinput:function(){  
        this.setData({  
         hiddenmodalput: !this.data.hiddenmodalput  
       })  
    },
    resetData: function(){
      this.setData({  
        hiddenmodalput:false,
        verticode:"",
        isDisabled: false,
        phoneNo:"",
        wait:0,
        sendCount:"获取验证码",
        ifPhoneErr:true,
        isUp:false,
        ifVericodeErr:true
      }) 


    },  
    //取消按钮  
    cancel: function(){  
      this.resetData();
    },  
    //确认  
    confirm: function(){  
      if(this.data.isDisabled == true){
        return;
      }
      if(app.util.commonCheck.isNull(this.data.phoneNo) || !app.util.commonCheck.isPhone(this.data.phoneNo)){
        console.log("不能为空");
        this.setData({
          ifPhoneErr:false
        })
        return;
      }
      if(app.util.commonCheck.isNull(this.data.verticode)){
        this.setData({
          ifVericodeErr:false
        })
        return;
      }
      this.saveRemindFlightInfo();
      // this.resetData(); 
    },
    getVertiCode: function(){
      if(this.data.isDisabled == true){
        return;
      }
      if(app.util.commonCheck.isNull(this.data.phoneNo) || !app.util.commonCheck.isPhone(this.data.phoneNo)){
        console.log("不能为空");
        this.setData({
          ifPhoneErr:false
        })
        return;
      }
      // if(!this.commonCheck.isPhone(this.formData.LoginName)){
      //   this.ifShowMsg = true;
      //   this.msg = "电话号码不正确";
      //   return;
      // }
      this.time();
      // this.data.isDisabled = true;
      // this.homeService.getSMSCodeSend({
      //   ReguserID: '',
      //   PhoneNumber: this.formData.LoginName
      // }).subscribe((data:any) => {
      //   let alert = this.alertCtrl.create({
      //     title: '验证码获取成功',
      //     buttons: [
      //     {
      //       text: data
      //     }
      //     ]
      //   });
      //   alert.present();
      //   this.time();
      // },err =>{
      //   let toast = this.toastCtrl.create({
      //     message: '获取验证码失败',
      //     duration: 1000,
      //     position: 'top'
      //   });
      //   toast.present();
      // });
    },
    time: function() {
      if (this.data.wait == 0) {
        this.setData({
          sendCount: "获取验证码"
        })
        this.data.wait = 60;
        this.data.isDisabled = false;
      } else { 
        var showcount =this.data.wait+"s";
        this.setData({
          sendCount: showcount
        })
        this.data.wait--;
        setTimeout(()=>{
          this.time();
        },1000);
        this.data.isDisabled = true;
      }
    },
    inputChange: function(e){
      var key = e.currentTarget.id;
      var value = e.detail.value;
      console.log(e);
      this.setData({
        [key]:value,
        ifPhoneErr:true,
        ifVericodeErr:true
      })
    },
    onFocus: function(){
      this.setData({
        isUp:true
      })
    },
    onBlur: function(){
     this.setData({
      isUp:false
    })   
    },
    saveRemindFlightInfo: function(){
      var that = this;
      wx.request({
        url: app.appConfig.config.saveRemindFlightInfo,
        data: {
          passenger_phone:that.data.phoneNo,
          verticode:that.data.verticode,
          flight_no:that.data.flightNo,
          flight_date:that.data.flight_date,
          openId:wx.getStorageSync('openId'),
          sign: app.appConfig.getSign(app.appConfig.config.saveRemindFlightInfo,[{key:"passenger_phone",value:that.data.phoneNo},{key:"verticode",value:that.data.verticode},{key:"flight_no",value:that.data.flightNo},{key:"flight_date",value:that.data.flight_date}])
        },
        success: function(res){
          app.openToast('添加提醒成功');
          that._refreshFlight();
          that.resetData();
        },
        fail: function(){
          app.openAlert();
        }
      })
    },
    _refreshFlight: function(){
      this.triggerEvent("refreshFlight");
    }
  }
})
