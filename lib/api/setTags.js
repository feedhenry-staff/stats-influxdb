module.exports=function(tagsObj){
  var tags=[];
  for (var key in tagsObj){
      if (tagsObj.hasOwnProperty(key)){
          tags.push(key+"="+tagsObj[key]);
      }
  }
  this.tags=tags.join(",");
}
