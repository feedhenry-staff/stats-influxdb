"use strict";
var send = require("../send");
/**
count("login_endpoint")
count("login_endpoint",1,["user=userA"])
*/

module.exports = {
  time: time,
  timeEnd: timeEnd
};

var allTime = {};

function time() {
  return function (label, tags) {
    var additonalTags = tags?tags:[];

    // If the object doesn't exist - Create it and return index of 0
    if (!allTime.hasOwnProperty(label)) {
      allTime[label] = [];
      allTime[label].push(new Date().getTime());
      return {
        label: label,
        i: 0,
        tags:additonalTags
      };
    }

    // If any null values
    if (allTime[label].indexOf(null) !== -1) {
      //Get POS of null value. Increment it and save it back.
      var nullPos = allTime[label].indexOf(null);
      allTime[label][nullPos] = new Date().getTime();
      return {
        label: label,
        i: nullPos,
        tags:additonalTags
      };
    }

    // No null values. Push into array
    allTime[label].push(new Date().getTime());
    return {
      label: label,
      i: allTime[label].length - 1,
      tags:additonalTags
    };
  };
}


function timeEnd(session) {
  return function (timeObj) {
    if (allTime[timeObj.label][timeObj.i]) {
      var elapsed = new Date().getTime() - allTime[timeObj.label][timeObj.i];
      var tags = timeObj.tags;
      var tag="timeElapsed,"+"label="+timeObj.label+(tags.length>0?","+tags.join(","):"");
      var value = "value=" + elapsed;
      send(session, tag, value);

      //Clear down the record in the array
      allTime[timeObj.label][timeObj.i] = null;
    }
  };
}
