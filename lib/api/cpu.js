var os=require("os");
var send=require("../send");
module.exports=function(){
  var cpus=os.cpus();
  var values=[];
  var idx=1;
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
    var value=Math.round(used/idle*100);
    values.push(name+"="+value);
  });
  send(this,"cpu",values.join(","));
}
