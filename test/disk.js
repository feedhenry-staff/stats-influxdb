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
var assert=require("assert");
describe("disk probe",function(){
  it ("should retrieve current disk informatino",function(done){
    var proxy={
      "../send":sinon.spy()
    };
    var disk=proxyquire("../lib/api/disk",proxy)(session);
    disk("/",function(err){
      assert(!err);
      sinon.assert.calledOnce(proxy["../send"]);
      sinon.assert.calledWith(proxy["../send"],session,"disk");
      done();
    });
  });
});
