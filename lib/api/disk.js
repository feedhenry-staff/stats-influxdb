"use strict";
var disk = require("diskspace");
var send = require("../send");

module.exports = function (session) {
  return function (mount, cb) {
    if (!mount) {
      mount = "/";
    }
    if (typeof mount === "function") {
      cb = mount;
      mount = "/";
    }
    disk.check(mount, function (err, total, free, status) {
      if (err) {
        console.error("Disk stats with error:", err);
      } else {
        var use = total - free;
        var useRatio = Math.round(use / total * 100);
        send(session, "disk", "used=" + (Math.round((use / 1024 / 1024))) + ",used_percent=" + useRatio);
      }
      if (cb) {
        cb(err);
      }

    });
  };
};
