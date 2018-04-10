
var commonCheck = {
	isNull: function(data){
		if(!data || data.trim().length == 0){
			return true;
		}else {
			return false;
		}		
	},
	isPhone: function(data){
		if(data.length === 11 || /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(data)){
			return true;
		}else{
			return false;
		}
	},
	isMinAndMax: function(data,min,max){
		if(eval(`/^[a-zA-Z0-9]{${min},${max}}$/`).test(data)){
			return true;
		}else {
			return false;
		}
	},
	isMinAndMaxStr: function(data,min,max){
		if(eval(`/^.{${min},${max}}$/`).test(data)){
		 
			return true;
		}else {
			return false;
		}
	},	
	isEqual: function(val1,val2){
		if(val1 === val2){
			return true;
		}else {
			return false;
		}
	},
	isNoLetter: function(data){
		if(/^[0-9a-zA-Z]*$/g.test(data)){
			return true;
		}else{
			return false;
		}
	},
	isID: function(id){
		if(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(id)){
			return true;
		}else {
			return false;
		}
	},
	isRealName:function(data){
	 	if(/[\u4e00-\u9fa5]+/.test(data)){
	 		return true;
	 	}else {
	 		return false;
	 	}
	}
}

function json2Form(json) { 
  var str = []; 
  for(var p in json){ 
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p])); 
  } 
  return str.join("&"); 
} 

function  handleFlightList(list){
    list.forEach((item)=> {
      //出发，到达城市
      let citys = item.ROUTE_C.split("-");
      if(citys.length == 0){
        return
      }
      let start = citys[0];
      let end = citys[1];
      item.startCity = start;
      item.endCity = end;

      //出发时间，到达时间
      var startTime = "";
      var reachTime = "";
      var startDate = "";
      var endDate = "";
      if(item.DA_TIME){
        startTime = item.DA_TIME.split(" ")[1];
        startDate = item.DA_TIME.split(" ")[0];
      }else if(item.DE_TIME){
        startTime = item.DE_TIME.split(" ")[1];
        startDate = item.DE_TIME.split(" ")[0];
      }else if(item.DP_TIME){
        startTime = item.DP_TIME.split(" ")[1];
        startDate = item.DP_TIME.split(" ")[0];
      }

      if(item.AP_TIME){
        startTime = item.AP_TIME.split(" ")[1];
        endDate = item.AP_TIME.split(" ")[0];
      }else if(item.AE_TIME){
        startTime = item.AE_TIME.split(" ")[1];
        endDate = item.AE_TIME.split(" ")[0];
      }else if(item.AA_TIME){
        startTime = item.AA_TIME.split(" ")[1];
        endDate = item.AA_TIME.split(" ")[0];
      }

      if(endDate.length == 0){
        endDate = startDate;
      }
      item.startTime = startTime;
      item.reachTime = reachTime;
      item.startDate = startDate;
      item.endDate = endDate;

    });
  }

module.exports = {
	commonCheck:commonCheck,
	json2Form:json2Form,
	handleFlightList:handleFlightList
}