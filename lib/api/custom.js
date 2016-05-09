"use strict";
var send = require("../send");


module.exports = function (session) {
  return function (measurement, tags, values, timestamp) {
    var value = values.join(",");
    var tag = measurement + (tags.length > 0 ? "," + tags.join(",") : "");
    send(session, tag, value, timestamp);
  };
};
