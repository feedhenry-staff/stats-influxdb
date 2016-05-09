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
describe("pid probe", function() {
  it("should retrieve current pid informatino", function(done) {
    var proxy = {
      "../send": sinon.spy(),
      "pidusage": {
        stat: function(pid, cb) {
          cb(null, {
            cpu: 20,
            memory: 50000
          });
        }
      }
    };
    var pid = proxyquire("../lib/api/pidusage", proxy)(session);
    var procId=process.pid;
    pid(function() {
      sinon.assert.calledOnce(proxy["../send"]);
      sinon.assert.calledWith(proxy["../send"], session, "process,pid="+procId, "mem=50000,cpu=20");
      done();
    });
  });
});
