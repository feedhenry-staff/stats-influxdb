var pusage = require('pidusage')
var send = require("../send");
module.exports = function(pid, cb) {
  if (typeof pid === "undefined") {
    pid = process.pid;
  }
  if (typeof pid === "function") {
    cb = pid;
    pid = process.pid;
  }
  var session = this;
  pusage.stat(pid, function(err, stat) {
    pusage.unmonitor(pid);
    if (!err){
      send(session, "process,pid=" + pid, "mem=" + stat.memory + ",cpu=" + stat.cpu);
    }
    if (cb) {
      cb(err);
    }
  })
}
