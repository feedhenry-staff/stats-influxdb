var send = require("influxdbudp");
module.exports = function (session, tags, values, timestamp) {
  "use strict";
  var params = {
    host: session.params.host,
    port: session.params.port,
    tags: (tags ? tags + "," : "") + session.tags,
    values: values,
    timestamp: timestamp
  };
  return send(params);
};
