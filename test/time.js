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
describe("time probe", function () {
  it("should retrieve current time information", function (done) {
    var proxy = {
      "../send": sinon.spy()
    };
    var time = proxyquire("../lib/api/time", proxy);
    var start = time.time()("hello");
    setTimeout(function () {
      time.timeEnd(session)(start);
      sinon.assert.calledOnce(proxy["../send"]);
      sinon.assert.calledWith(proxy["../send"], session, "timeElapsed,label=hello");
      done();
    }, 1000);
  });

  it("should handle mutiple timings with the same label", function (done) {
    var proxy = {
      "../send": sinon.spy()
    };
    var time = proxyquire("../lib/api/time", proxy);

    // First Timer - (i = 0)
    var start1 = time.time()("hello", sinon.spy());
    proxy["../send"].returned({
      label: "hello",
      i: 0
    });
    setTimeout(function () {
      time.timeEnd(session)(start1);
      sinon.assert.calledWith(proxy["../send"], session, "timeElapsed,label=hello");
    }, 200);

    // Second Timer - (i = 1)
    var start2 = time.time()("hello");
    proxy["../send"].returned({
      label: "hello",
      i: 1
    });
    setTimeout(function () {
      time.timeEnd(session)(start2);
      sinon.assert.calledWith(proxy["../send"], session, "timeElapsed,label=hello");
    }, 400);

    // Third Timer - (i = 0) - As its been reset
    setTimeout(function () {
      var start3 = time.time()("hello");
      proxy["../send"].returned({
        label: "hello",
        i: 0
      });
      time.timeEnd(session)(start3);
      sinon.assert.calledWith(proxy["../send"], session, "timeElapsed,label=hello");
      sinon.assert.calledThrice(proxy["../send"]);
      done();
    }, 600);
  });
  it("should handle concurrent request", function () {
    var proxy = {
      "../send": sinon.spy()
    };
    var time = proxyquire("../lib/api/time", proxy);
    var timers = [];
    for (var i = 0; i < 2; i++) {
      timers.push(time.time()("hello"));
    }
    time.timeEnd(session)(timers[0]);
    time.timeEnd(session)(timers[1]);
    sinon.assert.calledTwice(proxy["../send"]);
  });
});
