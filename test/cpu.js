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
describe("cpu probe", function() {
  it("should retrieve current cpu informatino", function(done) {
    var cpuStub = sinon.stub();
    cpuStub.onCall(0).returns([{
      times: {
        idle: 1000,
        user: 1000
      }
    }]);
    cpuStub.onCall(1).returns([{
      times: {
        idle: 1200,
        user: 1200
      }
    }]);
    var proxy = {
      "../send": sinon.spy(),
      "os": {
        cpus: cpuStub
      }
    };
    var cpu = proxyquire("../lib/api/cpu", proxy)(session);
    cpu(function() {
      sinon.assert.calledOnce(proxy["../send"]);
      sinon.assert.calledWith(proxy["../send"], session, "cpu","name=core1,core=50");
      done();
    });
  });
});
