var send=require("../send");
/**
count("login_endpoint")
count("login_endpoint",1,["user=userA"])
*/

module.exports={
  time:time,
  timeEnd:timeEnd
}

var allTime={};
function time(label){
  allTime[label]=new Date().getTime();
}
function timeEnd(label){
  if (allTime[label]){
    var elapsed=new Date().getTime()-allTime[label];
    var tag="timeElapsed,"+"label="+label;
    var value="value="+elapsed;
    send(this,tag,value);
  }
}
