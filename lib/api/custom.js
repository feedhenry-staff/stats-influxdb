var send=require("../send");


module.exports=function(measurement,tags,values,timestamp){
  var value=values.join(",");
  var tag=measurement+(tags.length>0?","+tags.join(","):"");
  send(this,tag,value,timestamp);
}
