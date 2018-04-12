
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
		// if(eval(`/^.{${min},${max}}$/`).test(data)){
      if(data.length > min && data.length <= max){

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
      handleflightInfo(item);
    });
}

function handleflightInfo(item){
      //出发，到达城市
      let citys = item.route_c.split("-");
      if(citys.length == 0){
        return
      }
      let start = citys[0];
      let end = citys[citys.length-1];
      item.startCity = start;
      item.endCity = end;

      //值机区，柜台
      var islandarr = item.counters.split(",");
      var realisland = [];
      for(var i=0 ; i<islandarr.length;i++){
        realisland.push(islandarr[i].slice(0,1));
      }
      item.realisland =realisland.join(",");

      //出发时间，到达时间
      var startTime = "";
      var reachTime = "";
      var startDate = "";
      var endDate = "";
      if(item.dp_time){
      	startTime = item.dp_time.split(" ")[1];
      	startDate = item.dp_time.split(" ")[0];
      }else if(item.de_time){
      	startTime = item.de_time.split(" ")[1];
      	startDate = item.de_time.split(" ")[0];
      }else if(item.da_time){
      	startTime = item.da_time.split(" ")[1];
      	startDate = item.da_time.split(" ")[0];
      }

      if(item.ap_time){
        reachTime = item.ap_time.split(" ")[1];
        endDate = item.ap_time.split(" ")[0];
      }else if(item.ae_time){
        reachTime = item.ae_time.split(" ")[1];
        endDate = item.ae_time.split(" ")[0];
      }else if(item.aa_time){
        reachTime = item.aa_time.split(" ")[1];
        endDate = item.aa_time.split(" ")[0];
      }

      if(endDate.length == 0){
        endDate = startDate;
      }
      item.startTime = startTime;
      item.reachTime = reachTime;
      item.startDate = startDate;
      item.endDate = endDate;
      return item
    }

    module.exports = {
     commonCheck:commonCheck,
     json2Form:json2Form,
     handleFlightList:handleFlightList,
     handleflightInfo:handleflightInfo
   }