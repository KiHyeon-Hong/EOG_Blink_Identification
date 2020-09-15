var BLINKPOINT = 100;

var identification = function(fp1, fp2) {

  var fp1Array = fp1.split(',').map(function(item) {
      return parseFloat(item, 10);
  });
  var fp2Array = fp2.split(',').map(function(item) {
      return parseFloat(item, 10);
  });

  //console.log(fp2Array);

  //var max = Math.max.apply(null, fp2Array);
  //var min = Math.min.apply(null, fp2Array);
  //console.log(min)

  var start = [];
  var middle = [];
  var finish = [];
  var index = 0;

  for(var i = 0; i < fp1Array.length; i++) {
    if(fp1Array[i] > BLINKPOINT) {
      for(var j = i; j >= 0; j--) {
        if(fp1Array[j] <= 0) {
          start[index] = j;
          break;
        }
      }

      for(var j = start[index] + 1; j < fp1Array.length; j++) {
        if(fp1Array[j] <= 0) {
          middle[index] = j;
          break;
        }
      }

      for(var j = middle[index] + 1; j < fp1Array.length; j++) {
        if(fp1Array[j] >= 0) {
          finish[index] = j;
          break;
        }
      }

      i = finish[index];
      index++;
    }
  }

  console.log('start : ' + start);
  console.log('middle : ' + middle);
  console.log('finish : ' + finish);


}

exports.identification = identification;
