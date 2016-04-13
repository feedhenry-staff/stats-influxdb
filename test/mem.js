var proxyquire=require("proxyquire");
var sinon=require("sinon");
var session={
  params:{
    host:"myhost",
    port:3305
  },
  tags:"unit=unit3b"
};
describe("mem probe",function(){
  it ("should retrieve current mem informatino",function(){
    var proxy={
      "../send":sinon.spy()
    }
    var mem=proxyquire("../lib/api/mem",proxy).bind(session);
    mem();
    sinon.assert.calledOnce(proxy["../send"]);
    sinon.assert.calledWith(proxy["../send"],session,"mem");
  });
})
