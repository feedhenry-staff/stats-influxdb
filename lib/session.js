/**
{
  host:String,   //influxdb host
  port:Number,  //influxdb udp port
  tags:Object,  //key-value pair tags.e.g.  {project:"myProject",node:"node1"}
}

*/
module.exports = function (params) {
  "use strict";
  var session = {
    params: params,
    tags: ""
  };
  session.setTags = require("./api/setTags")(session);
  session.cpu = require("./api/cpu")(session);
  session.mem = require("./api/mem")(session);
  session.disk = require("./api/disk")(session);
  session.count = require("./api/count")(session);
  session.time = require("./api/time").time(session);
  session.timeEnd = require("./api/time").timeEnd(session);
  session.custom = require("./api/custom")(session);
  session.pidusage = require("./api/pidusage")(session);
  session.setTags(session.params.tags);
  return session;
};
