"use strict";
var os = require("os");
var send = require("../send");
module.exports = function (session) {
  return function (cb) {
    var prevTotal = getTotal();
    setTimeout(function () {
      var curTotal = getTotal();
      for (var core in curTotal) {
        var prev = prevTotal[core];
        var cur = curTotal[core];
        var deltaTotal = cur.total - prev.total;
        var deltaUsed = cur.used - prev.used;
        send(session, "cpu,name="+core, "value=" + Math.round(deltaUsed / deltaTotal * 100));
      }

      if (cb) {
        cb();
      }
    }, 500);
  };
};

function getTotal() {
  var cpus = os.cpus();
  var idx = 1;
  var result = {};
  cpus.forEach(function (cpu) {
    var name = "core" + idx;
    idx++;
    var times = cpu.times;
    var total = 0;
    for (var key in times) {
      if (times.hasOwnProperty(key)) {
        total += times[key];
      }
    }
    var idle = times.idle;
    var used = total - idle;
    result[name] = {
      total: total,
      used: used
    };
  });
  return result;
}
