//cxFolder.js
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
    folderTitle :{
      type : String ,
      value : ''
    } ,
    folderKey:{
      type : String ,
      value : ''
    },
    complaintType: {
      type : Object,
      value: {}
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
    ifVericodeErr:true,
    keyName:'',
    arrowClass:'',
    panelClass:'tui-hide'

  },
  attached: function(){
    var folderKey = "isShowFrom"+this.data.folderKey;
    this.setData({ 
      [folderKey]: false
    });
    console.log(this.data);
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
   methods: {
    showFrom: function(e){
      var param = e.currentTarget.dataset.param; 
      var key = "isShowFrom"+param;
      if(this.data.arrowClass == 'arrow-turn'){
        this.setData({ 
          arrowClass: ''
        });
      }else{
        this.setData({ 
          arrowClass: 'arrow-turn'
        });
      }
      if(this.data.panelClass == 'tui-hide'){
        this.setData({ 
          panelClass: ''
        });
      }else{
        this.setData({ 
          panelClass: 'tui-hide'
        });
      }     
      this.setData({ 
        [key]: !this.data[key],
      });
    },
    chooseType: function(e){
      var param = e.currentTarget.dataset.param.complaint_type_code;
      var changed = this.data.complaintType.complaint_typemx.map((item)=>{
          if(item.complaint_type_code == param){
              item.checked = true;
              
          }else{
            item.checked = false;
          }
          return item;
      })
      var newData = this.data.complaintType;
      newData.complaint_typemx = changed;
      this.setData({
        complaintType:newData
      });
    }

  }
})
