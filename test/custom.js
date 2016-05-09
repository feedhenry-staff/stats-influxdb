"use strict";
var proxyquire=require("proxyquire");
var sinon=require("sinon");
var session={
  params:{
    host:"myhost",
    port:3305
  },
  tags:"unit=unit3b"
};
describe("custom probe",function(){
  it ("should retrieve current custom informatino",function(){
    var proxy={
      "../send":sinon.spy()
    };
    var custom=proxyquire("../lib/api/custom",proxy)(session);
    custom("process",["type=cloud"],["memory=200","cpu=84"]);
    sinon.assert.calledOnce(proxy["../send"]);
    sinon.assert.calledWith(proxy["../send"],session,"process,type=cloud");
  });
});
