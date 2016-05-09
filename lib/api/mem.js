"use strict";
var os = require("os");
var send = require("../send");
module.exports = function (session) {
  return function () {
    var totalMem = os.totalmem();
    var freeMem = os.freemem();
    var use = totalMem - freeMem;
    var useRatio = Math.round(use / totalMem * 100);
    send(session, "mem", "used=" + (Math.round((use / 1024 / 1024))) + ",used_percent=" + useRatio);
  };
};
