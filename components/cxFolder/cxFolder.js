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
      type : Array,
      value: []
    }
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    complaint_type_code: "",
    complaint_typemx_code:""

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
      var newItem = this.data.complaintType.map((item) =>{
        if(item.complaint_type_id == param){
          item.isExpanded = !item.isExpanded;
        }
        return item;
      })
      this.setData({
        complaintType:newItem
      })
    },
    chooseType: function(e){
      var param = e.currentTarget.dataset.param.complaint_type_code;
      var tmplist = this.data.complaintType;
      var that = this;
      tmplist.map((item)=>{
        item.complaint_typemx.map((i) =>{
          if(i.complaint_type_code == param){
            i.checked = true;
            that.setData({
              complaint_type_code: item.complaint_type_code,
              complaint_typemx_code:i.complaint_type_code
            })
          }else{
            i.checked = false;
          }
        })
      })
      console.log(this.data.complaint_type_code);
      console.log(this.data.complaint_typemx_code);
      this.setData({
        complaintType: tmplist
      })
    }

  }
})
