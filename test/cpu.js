var proxyquire=require("proxyquire");
var sinon=require("sinon");
var proxy={
  influxdbudp:function(params){
    console.log(params);
  }
}
var session={
  params:{
    host:"myhost",
    port:3305
  },
  tags:"unit=unit3b"
};
describe("cpu probe",function(){
  it ("should retrieve current cpu informatino",function(){
    var proxy={
      "../send":sinon.spy()
    }
    var cpu=proxyquire("../lib/api/cpu",proxy).bind(session);
    cpu();
    sinon.assert.calledOnce(proxy["../send"]);
    sinon.assert.calledWith(proxy["../send"],session,"cpu");
  });
})
