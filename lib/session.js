/**
{
  host:String,   //influxdb host
  port:Number,  //influxdb udp port
  tags:Object,  //key-value pair tags.e.g.  {project:"myProject",node:"node1"}
}

*/
module.exports=function(params){
  var session={
    params:params,
    tags:"",
    setTags:require("./api/setTags"),
    cpu:require("./api/cpu"),
    mem:require("./api/mem"),
    disk:require("./api/disk"),
    count:require("./api/count"),
    time:require("./api/time").time,
    timeEnd:require("./api/time").timeEnd
  }
  session.setTags(session.params.tags);
  return session;
}
