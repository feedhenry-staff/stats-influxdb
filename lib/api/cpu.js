var os=require("os");
var send=require("../send");
module.exports=function(cb){
  var prevTotal=getTotal();
  var session=this;
  setTimeout(function(){
    var curTotal=getTotal();
    var values=[];
    for (var core in curTotal){
        var prev=prevTotal[core];
        var cur=curTotal[core];
        var deltaTotal=cur.total-prev.total;
        var deltaUsed=cur.used-prev.used;
        values.push(core+"="+Math.round(deltaUsed/deltaTotal*100));
    }
    send(session,"cpu",values.join(","));
    if (cb){
      cb();
    }
  },100);
}

function getTotal(){
  var cpus=os.cpus();
  var idx=1;
  var result={};
  cpus.forEach(function(cpu){
    var name="core"+idx;
    idx++;
    var times=cpu.times;
    var total=0;
    for (var key in times){
      if (times.hasOwnProperty(key)){
          total+=times[key];
      }
    }
    var idle=times.idle;
    var used=total-idle;
    result[name]={
      total:total,
      used:used
    }
  });
  return result;
}
