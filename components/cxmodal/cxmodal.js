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
    sendCount:"获取验证码"

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
    //取消按钮  
    cancel: function(){  
      this.setData({  
        hiddenmodalput: false  
      });  
    },  
    //确认  
    confirm: function(){  
      this.setData({  
        hiddenmodalput: false  
      })  
    },
    getVertiCode: function(){
      if(this.data.isDisabled == true){
        return;
      }
      if(app.util.commonCheck.isPhone(this.data.phoneNo)){
        console.log("不是电话号码");
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
        [key]:value
      })
    },
    onFocus: function(e){

    }
  }
})
