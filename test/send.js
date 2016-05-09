"use strict";
var proxyquire = require("proxyquire");
var sinon = require("sinon");
var session = {
  params: {
    host: "myhost",
    port: 3305
  },
  tags: "unit=unit3b"
};
describe("send module", function() {
  it("should send tags and values", function() {
    var proxy = {
      influxdbudp: sinon.spy()
    };
    var send = proxyquire("../lib/send", proxy);
    send(session, "cpu", "core1=25,core2=40");
    sinon.assert.calledOnce(proxy.influxdbudp);
    sinon.assert.calledWith(proxy.influxdbudp, {
      host: "myhost",
      port: 3305,
      tags: "cpu,unit=unit3b",
      timestamp: undefined,
      values: "core1=25,core2=40"
    });
  });
});
