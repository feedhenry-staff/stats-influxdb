"use strict";
module.exports = function (session) {
  return function (tagsObj) {
    var tags = [];
    for (var key in tagsObj) {
      if (tagsObj.hasOwnProperty(key)) {
        var val = tagsObj[key];
        val = val.replace(/ /g, "\\" + " ");
        val = val.replace(/,/g, "\\,");
        tags.push(key + "=" + val);
      }
    }
    session.tags = tags.join(",");
  };
};
