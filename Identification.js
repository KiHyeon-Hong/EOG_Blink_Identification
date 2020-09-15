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

  var fp1Start = [];
  var fp1Middle = [];
  var fp1Finish = [];

  var fp2Start = [];
  var fp2Middle = [];
  var fp2Finish = [];

  var temp = 0;
  var index = 0;

  for(var i = 0; i < fp1Array.length; i++) {
    if(temp + 150 < i && fp1Array[i] > BLINKPOINT) {
      for(var j = i; j >= 0; j--) {
        if(fp1Array[j] <= 0) {
          fp1Start[index] = j;
          break;
        }
      }

      for(var j = fp1Start[index] + 1; j < fp1Array.length; j++) {
        if(fp1Array[j] <= 0) {
          fp1Middle[index] = j;
          break;
        }
      }

      for(var j = fp1Middle[index] + 1; j < fp1Array.length; j++) {
        if(fp1Array[j] >= 0) {
          fp1Finish[index] = j;
          break;
        }
      }

      i = fp1Finish[index];
      index++;
      temp = i;
    }
  }

  index = 0;
  temp = 0;

  for(var i = 0; i < fp2Array.length; i++) {
    if(temp + 150 < i && fp2Array[i] > BLINKPOINT) {
      for(var j = i; j >= 0; j--) {
        if(fp2Array[j] <= 0) {
          fp2Start[index] = j;
          break;
        }
      }

      for(var j = fp2Start[index] + 1; j < fp2Array.length; j++) {
        if(fp2Array[j] <= 0) {
          fp2Middle[index] = j;
          break;
        }
      }

      for(var j = fp2Middle[index] + 1; j < fp2Array.length; j++) {
        if(fp2Array[j] >= 0) {
          fp2Finish[index] = j;
          break;
        }
      }

      i = fp2Finish[index];
      index++;
      temp = i;
    }
  }

  //test
  var fp1HP = [];
  var fp1LP = [];
  var fp1LHPL = [];
  var fp1LLPL = [];
  var fp1HPL = [];
  var fp1LPL = [];
  var fp1LHPG = [];
  var fp1LLPG = [];
  var fp1RHPG = [];
  var fp1RLPG = [];

  index = 0;

  for(var i = fp1Start[0]; i < fp1Finish[fp1Finish.length - 1];) {
    fp1HP[index] = fp1Array[fp1Start[0]];
    fp1LP[index] = fp1Array[fp1Start[0]];

    for(var j = fp1Start[index]; j < fp1Finish[index]; j++) {
      if(fp1HP[index] < fp1Array[j]) {
        fp1HP[index] = fp1Array[j];
        fp1LHPL[index] = j - fp1Start[index];
      }
    }

    for(var j = fp1Start[index]; j < fp1Finish[index]; j++) {
      if(fp1LP[index] > fp1Array[j]) {
        fp1LP[index] = fp1Array[j];
        fp1LLPL[index] = j - fp1Middle[index];
      }
    }

    fp1HPL[index] = fp1Middle[index] - fp1Start[index];
    fp1LPL[index] = fp1Finish[index] - fp1Middle[index];

    fp1LHPG[index] = fp1HP[index] / fp1LHPL[index];
    fp1LLPG[index] = fp1LP[index] / fp1LLPL[index];
    fp1RHPG[index] = fp1HP[index] / (fp1HPL[index] - fp1LHPL[index]);
    fp1RLPG[index] = fp1LP[index] / (fp1LPL[index] - fp1LLPL[index]);

    index++;

    if(fp1Start.length == index) {
      break;
    }

    i = fp1Start[index];
  }


  




  //console.log('start : ' + fp1Start.length);
  //console.log('middle : ' + fp1Middle.length);
  //console.log('finish : ' + fp1Finish.length);

  //console.log();

  //console.log('start : ' + fp2Start.length);
  //console.log('middle : ' + fp2Middle.length);
  //console.log('finish : ' + fp2Finish.length);


}

exports.identification = identification;
