var disk = require('diskusage');
var send=require("../send");

module.exports=function(mount,cb){
  var session=this;
  disk.check(mount,function(err,info){
    if (err){
      console.error(err)
    }else{
      var free=info.free;
      var total=info.total;
      var use=total-free;
      var useRatio=Math.round(use/total*100);
      send(session,"disk","used="+(Math.round((use/1024/1024)))+",used_percent="+useRatio);
    }
    if (cb){
      cb(err);
    }
  })
}
