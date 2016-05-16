#Influxdb Stats lib
The lib creates high level apis for system resource stats and general statistics functions based on influxdbudp module.

#Install
```
npm install --save stats-influxdb
```
#Usage
```js
var session=require("stats-influxdb").newSession({
    host:"127.0.0.1",
    port:4444,
    tags:{
      unit:"unit1",
      project:"myProject"
    }
});

session.cpu();  //collect current cpu usage (during next 500ms) and send to influxdb as 'cpu,unit=unit1,project=myProject,name=core1,core=40'. Each core is sent separately so data can be aggregated easily.
session.mem();  //collect current mem usage 'mem,unit=unit1,project=myProject used=2000,used_ratio=70'
session.disk("/"); //collect current disk usage 'disk,unit=unit1,project=myProject used=123456,used_ration=20'
session.pidusage(); //collect current pid usage 'process,pid=<pid> mem=<mem in byte>,cpu=<cpu percent>'
session.count("myLabel"); //add a value to a label 'count,label=myLabel,unit=unit1,project=myProject value=1'
session.count("login_endpoint",1,["user=userName"]);  //calculate the amount of login attempts for a user.  'count,label=login_endpoint,user="userName",unit=unit1,project=myProject value=1'
var time = session.time("ftp_upload"); //same as console.time(), start to count time elapsed for a label.
var time = session.time("ftp_upload",["name=ftp1"]); //Allows for additional tags also.`timeElapsed,label=ftp_upload,name=ftp1`
session.timeEnd(time); //Like console.timeEnd() but you must pass the object returned by .time(), end counting the time elpased. 'timeElapsed,label=ftp_upload,unit=unit1,project=myProject value=<timeElapsed>'
session.custom("process",["name=nodeProc1"],["mem=400,cpu=43"]); //customised measurement. 'process,name=nodeProc1,,unit=unit1,project=myProject mem=400,cpu=43'
```

#Test
```
npm test
```


#License

```
MIT
```
