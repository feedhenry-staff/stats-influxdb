var proxyquire = require("proxyquire");
var sinon = require("sinon");
var session = {
  params: {
    host: "myhost",
    port: 3305
  },
  tags: "unit=unit3b"
};
describe("time probe", function() {
  it("should retrieve current time informatino", function(done) {
    var proxy = {
      "../send": sinon.spy()
    }
    var time = proxyquire("../lib/api/time", proxy);
    time.time("hello");
    setTimeout(function() {
      time.timeEnd.call(session,"hello");
      sinon.assert.calledOnce(proxy["../send"]);
      sinon.assert.calledWith(proxy["../send"], session, "timeElapsed,label=hello");
      done();
    }, 1000);
  });
})
