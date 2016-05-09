"use strict";
var send = require("../send");
/**
count("login_endpoint")
count("login_endpoint",1,["user=userA"])
*/

module.exports = function (session) {
  return function (label /*,number=1,tags=[],timestamp=undefined*/ ) {
    var number = arguments[1] ? arguments[1] : 1;
    var tags = arguments[2] ? arguments[2] : [];
    var timestamp = arguments[3] ? arguments[3] : undefined;
    var value = "value=" + number;
    var tag = "count" + ",label=" + label + (tags.length > 0 ? "," + tags.join(",") : "");
    send(session, tag, value, timestamp);
  };
};
