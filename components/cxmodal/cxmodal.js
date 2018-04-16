//cxmodal.js
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
    // // 弹窗标题
    // title: {            // 属性名
    //   type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
    //   value: '标题'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    // },
    // // 弹窗内容
    // content :{
    //   type : String ,
    //   value : '弹窗内容'
    // },
    // // 弹窗取消按钮文字
    // cancelText :{
    //   type : String ,
    //   value : '取消'
    // },
    // 弹窗确认按钮文字
    confirmText :{
      type : String ,
      value : '确定'
    } ,
    flightNo :{
      type : String ,
      value : ''
    } ,
    flight_date:{
      type : String ,
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
    confirm: function(formId){  
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
      if(app.util.commonCheck.isNull(this.data.verticode) || !app.util.commonCheck.isNNum(this.data.verticode,4)){
        this.setData({
          ifVericodeErr:false
        })
        return;
      }
      this.setData({
        isDisabled: true
      })
      this.saveRemindFlightInfo(formId);
      // this.resetData(); 
    },
    getVertiCode: function(){
      var that = this;
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
      this.time();

      wx.request({
        url: app.appConfig.config.sendPhoneVerificationCode,
        data: {
          passenger_phone:that.data.phoneNo,
          openId:wx.getStorageSync('openId'),
          sign: app.appConfig.getSign(app.appConfig.config.sendPhoneVerificationCode,[{key:"passenger_phone",value:that.data.phoneNo}])
        },
        success: function(res){
          app.openToast('验证码发送成功');
        },
        fail: function(){
          app.openAlert();
        }
      })
      
    },
    time: function() {
      if (this.data.wait == 0) {
        this.setData({
          sendCount: "获取验证码",
          wait:60
        })
      } else { 
        var showcount =this.data.wait+"s";
        this.setData({
          sendCount: showcount
        })
        this.data.wait--;
        setTimeout(()=>{
          this.time();
        },1000);
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
    saveRemindFlightInfo: function(formId){
      var that = this;
      wx.request({
        url: app.appConfig.config.saveRemindFlightInfo,
        data: {
          passenger_phone:that.data.phoneNo,
          verticode:that.data.verticode,
          flight_no:that.data.flightNo,
          flight_date:that.data.flight_date,
          form_id:formId,
          openId:wx.getStorageSync('openId'),
          sign: app.appConfig.getSign(app.appConfig.config.saveRemindFlightInfo,[{key:"passenger_phone",value:that.data.phoneNo},{key:"verticode",value:that.data.verticode},{key:"flight_no",value:that.data.flightNo},{key:"flight_date",value:that.data.flight_date},{key:"form_id",value:that.data.form_id}])
        },
        success: function(res){
          if(res.statusCode == "404"){
            app.openAlert('添加提醒失败');
            that.resetData();
            return;
          }
          app.openToast('添加提醒成功');
          that._refreshFlight();
          that.resetData();
        },
        fail: function(){
          that.resetData();
          app.openAlert();
        }
      })
    },
    formSubmit: function(e) {
      console.log('form发生了submit事件，fromId为：', e.detail.formId);
      this.confirm(e.detail.formId);
    },
    _refreshFlight: function(){
      this.triggerEvent("refreshFlight");
    }
  }
})
