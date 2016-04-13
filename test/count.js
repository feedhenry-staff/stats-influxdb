var proxyquire=require("proxyquire");
var sinon=require("sinon");
var session={
  params:{
    host:"myhost",
    port:3305
  },
  tags:"unit=unit3b"
};
describe("count probe",function(){
  it ("should retrieve current count informatino",function(){
    var proxy={
      "../send":sinon.spy()
    }
    var count=proxyquire("../lib/api/count",proxy).bind(session);
    count("hello",2,["aa=bb"]);
    sinon.assert.calledOnce(proxy["../send"]);
    sinon.assert.calledWith(proxy["../send"],session,"count,label=hello,aa=bb");
  });
})
