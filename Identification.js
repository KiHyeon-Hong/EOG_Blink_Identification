const fs = require('fs');

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

  //개인식별 특징 추출 test
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
    //fp1HP[index] = fp1Array[fp1Start[0]];
    //fp1LP[index] = fp1Array[fp1Start[0]];
    fp1HP[index] = 0;
    fp1LP[index] = 0;

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


  //=====
  var fp2HP = [];
  var fp2LP = [];
  var fp2LHPL = [];
  var fp2LLPL = [];
  var fp2HPL = [];
  var fp2LPL = [];
  var fp2LHPG = [];
  var fp2LLPG = [];
  var fp2RHPG = [];
  var fp2RLPG = [];

  index = 0;

  for(var i = fp2Start[0]; i < fp2Finish[fp2Finish.length - 1];) {
    //fp2HP[index] = fp2Array[fp2Start[0]];
    //fp2LP[index] = fp2Array[fp2Start[0]];
    fp2HP[index] = 0;
    fp2LP[index] = 0;

    for(var j = fp2Start[index]; j < fp2Finish[index]; j++) {
      if(fp2HP[index] < fp2Array[j]) {
        fp2HP[index] = fp2Array[j];
        fp2LHPL[index] = j - fp2Start[index];
      }
    }

    for(var j = fp2Start[index]; j < fp2Finish[index]; j++) {
      if(fp2LP[index] > fp2Array[j]) {
        fp2LP[index] = fp2Array[j];
        fp2LLPL[index] = j - fp2Middle[index];
      }
    }

    fp2HPL[index] = fp2Middle[index] - fp2Start[index];
    fp2LPL[index] = fp2Finish[index] - fp2Middle[index];

    fp2LHPG[index] = fp2HP[index] / fp2LHPL[index];
    fp2LLPG[index] = fp2LP[index] / fp2LLPL[index];
    fp2RHPG[index] = fp2HP[index] / (fp2HPL[index] - fp2LHPL[index]);
    fp2RLPG[index] = fp2LP[index] / (fp2LPL[index] - fp2LLPL[index]);

    index++;

    if(fp2Start.length == index) {
      break;
    }

    i = fp2Start[index];
  }



  //Blink data 추가
  var fp1Blink = [];
  var fp2Blink = [];
  var fp1NotBlink = [];
  var fp2NotBlink = [];

  var blinkCheck = 0;
  var preBlinkCheck = 0;

  for(let i = 0; i < fp1Finish.length; i++){
    fp1Blink[i] = fp1Finish[i] - fp1Start[i];
  }

  blinkCheck = 0;
  preBlinkCheck = 0;

  for(let i = 0; i < fp1Finish.length - 1; i++){
    fp1NotBlink[i] = fp1Start[i + 1] - fp1Finish[i];
  }

  blinkCheck = 0;
  preBlinkCheck = 0;

  for(let i = 0; i < fp2Finish.length; i++){
    fp2Blink[i] = fp2Finish[i] - fp2Start[i];
  }

  blinkCheck = 0;
  preBlinkCheck = 0;

  for(let i = 0; i < fp2Finish.length - 1; i++){
    fp2NotBlink[i] = fp2Start[i + 1] - fp2Finish[i];
  }

  // console.log('==============================');
  // console.log(fp1Start);
  // console.log('==============================');
  // console.log(fp1Middle);
  // console.log('==============================');
  // console.log(fp1Finish);
  // console.log('==============================');
  // console.log(fp1Blink);
  // console.log('==============================');

  // console.log("fp1HP : ");
  // console.log(fp1HP);
  // console.log("fp1LP : ");
  // console.log(fp1LP);
  // console.log("fp1LHPL : ");
  // console.log(fp1LHPL);
  // console.log("fp1LLPL : ");
  // console.log(fp1LLPL);
  // console.log("fp1HPL : ");
  // console.log(fp1HPL);
  // console.log("fp1LPL : ");
  // console.log(fp1LPL);
  // console.log("fp1LHPG : ");
  // console.log(fp1LHPG);
  // console.log("fp1LLPG : ");
  // console.log(fp1LLPG);
  // console.log("fp1RHPG : ");
  // console.log(fp1RHPG);
  // console.log("fp1RLPG : ");
  // console.log(fp1RLPG);

  //토큰화 test
  var token1 = tokenCreate(fp1HP, fp1LP, fp1LHPL, fp1LLPL, fp1HPL, fp1LPL, fp1LHPG, fp1LLPG, fp1RHPG, fp1RLPG, fp1Blink, fp1NotBlink);
  var token2 = tokenCreate(fp2HP, fp2LP, fp2LHPL, fp2LLPL, fp2HPL, fp2LPL, fp2LHPG, fp2LLPG, fp2RHPG, fp2RLPG, fp2Blink, fp2NotBlink);

  token1 = JSON.parse(token1);
  token2 = JSON.parse(token2);


  console.log('start : ' + fp1Start.length);
  console.log('middle : ' + fp1Middle.length);
  console.log('finish : ' + fp1Finish.length);

  //console.log();

  console.log('start : ' + fp2Start.length);
  console.log('middle : ' + fp2Middle.length);
  console.log('finish : ' + fp2Finish.length);


  var originToken1 = fs.readFileSync('./files/data1.json', 'utf8');
  var originToken2 = fs.readFileSync('./files/data2.json', 'utf8');

  originToken1 = JSON.parse(originToken1);
  originToken2 = JSON.parse(originToken2);

  //console.log(originToken1.HP);
  console.log("==============================");
  console.log("HP : " + (token1.HP / originToken1.HP));
  console.log("LP : " + (token1.LP / originToken1.LP));
  console.log("LHPL : " + (token1.LHPL / originToken1.LHPL));
  console.log("LLPL : " + (token1.LLPL / originToken1.LLPL));
  console.log("HPL : " + (token1.HPL / originToken1.HPL));
  console.log("LPL : " + (token1.LPL / originToken1.LPL));
  console.log("LHPG : " + (token1.LHPG / originToken1.LHPG));
  console.log("LLPG : " + (token1.LLPG / originToken1.LLPG));
  console.log("RHPG : " + (token1.RHPG / originToken1.RHPG));
  console.log("RLPG : " + (token1.RLPG / originToken1.RLPG));

  console.log("blink : " + (token1.blink / originToken1.blink));
  console.log("notBlink : " + (token1.notBlink / originToken1.notBlink));

  console.log("==============================");
  console.log("HP : " + (token2.HP / originToken2.HP));
  console.log("LP : " + (token2.LP / originToken2.LP));
  console.log("LHPL : " + (token2.LHPL / originToken2.LHPL));
  console.log("LLPL : " + (token2.LLPL / originToken2.LLPL));
  console.log("HPL : " + (token2.HPL / originToken2.HPL));
  console.log("LPL : " + (token2.LPL / originToken2.LPL));
  console.log("LHPG : " + (token2.LHPG / originToken2.LHPG));
  console.log("LLPG : " + (token2.LLPG / originToken2.LLPG));
  console.log("RHPG : " + (token2.RHPG / originToken2.RHPG));
  console.log("RLPG : " + (token2.RLPG / originToken2.RLPG));

  console.log("blink : " + (token2.blink / originToken2.blink));
  console.log("notBlink : " + (token2.notBlink / originToken2.notBlink));

  if(((token1.HP / originToken1.HP) > 0.8 && (token1.HP / originToken1.HP) < 1.2) && ((token1.LP / originToken1.LP) > 0.8 && (token1.LP / originToken1.LP) < 1.2) && ((token1.LHPL / originToken1.LHPL) > 0.8 && (token1.LHPL / originToken1.LHPL) < 1.2) && ((token1.LLPL / originToken1.LLPL) > 0.8 && (token1.LLPL / originToken1.LLPL) < 1.2) && ((token1.HPL / originToken1.HPL) > 0.8 && (token1.HPL / originToken1.HPL) < 1.2) && ((token1.LPL / originToken1.LPL) > 0.8 && (token1.LPL / originToken1.LPL) < 1.2) && ((token1.LHPG / originToken1.LHPG) > 0.8 && (token1.LHPG / originToken1.LHPG) < 1.2) && ((token1.LLPG / originToken1.LLPG) > 0.8 && (token1.LLPG / originToken1.LLPG) < 1.2) && ((token1.RHPG / originToken1.RHPG) > 0.8 && (token1.RHPG / originToken1.RHPG) < 1.2) && ((token1.RLPG / originToken1.RLPG) > 0.8 && (token1.RLPG / originToken1.RLPG) < 1.2) && ((token1.blink / originToken1.blink) > 0.8 && (token1.blink / originToken1.blink) < 1.2) && ((token1.notBlink / originToken1.notBlink) > 0.8 && (token1.notBlink / originToken1.notBlink) < 1.2)) {
    console.log('fp1 중복으로 개인식별');
  }
  else if(((token2.HP / originToken2.HP) > 0.8 && (token2.HP / originToken2.HP) < 1.2) && ((token2.LP / originToken2.LP) > 0.8 && (token2.LP / originToken2.LP) < 1.2) && ((token2.LHPL / originToken2.LHPL) > 0.8 && (token2.LHPL / originToken2.LHPL) < 1.2) && ((token2.LLPL / originToken2.LLPL) > 0.8 && (token2.LLPL / originToken2.LLPL) < 1.2) && ((token2.HPL / originToken2.HPL) > 0.8 && (token2.HPL / originToken2.HPL) < 1.2) && ((token2.LPL / originToken2.LPL) > 0.8 && (token2.LPL / originToken2.LPL) < 1.2) && ((token2.LHPG / originToken2.LHPG) > 0.8 && (token2.LHPG / originToken2.LHPG) < 1.2) && ((token2.LLPG / originToken2.LLPG) > 0.8 && (token2.LLPG / originToken2.LLPG) < 1.2) && ((token2.RHPG / originToken2.RHPG) > 0.8 && (token2.RHPG / originToken2.RHPG) < 1.2) && ((token2.RLPG / originToken2.RLPG) > 0.8 && (token2.RLPG / originToken2.RLPG) < 1.2) && ((token2.blink / originToken2.blink) > 0.8 && (token2.blink / originToken2.blink) < 1.2) && ((token2.notBlink / originToken2.notBlink) > 0.8 && (token2.notBlink / originToken2.notBlink) < 1.2)) {
    console.log('fp2 중복으로 개인식별');
  }
  else {
    console.log('개인식별 실패');
  }

}

var minMaxDelete = (data, check, count) => {
  if(check == 0){
    for(var i = 0; i < count; i++){
      var min = data.indexOf(Math.min.apply(null, data));
      data.splice(min, 1);
    }
  }
  else {
    for(var i = 0; i < count; i++){
      var max = data.indexOf(Math.max.apply(null, data));
      data.splice(max, 1);
    }
  }
  return data;
}

var tokenCreate = function(HP, LP, LHPL, LLPL, HPL, LPL, LHPG, LLPG, RHPG, RLPG, blink, notBlink) {
  HP = minMaxDelete(HP, 0, 2);
  LP = minMaxDelete(LP, 0, 2);
  LHPL = minMaxDelete(LHPL, 0, 2);
  LLPL = minMaxDelete(LLPL, 0, 2);
  HPL = minMaxDelete(HPL, 0, 2);
  LPL = minMaxDelete(LPL, 0, 2);
  LHPG = minMaxDelete(LHPG, 0, 2);
  LLPG = minMaxDelete(LLPG, 0, 2);
  RHPG = minMaxDelete(RHPG, 0, 2);
  RLPG = minMaxDelete(RLPG, 0, 2);
  blink = minMaxDelete(blink, 0, 2);
  notBlink = minMaxDelete(notBlink, 0, 2);

  HP = minMaxDelete(HP, 1, 2);
  LP = minMaxDelete(LP, 1, 2);
  LHPL = minMaxDelete(LHPL, 1, 2);
  LLPL = minMaxDelete(LLPL, 1, 2);
  HPL = minMaxDelete(HPL, 1, 2);
  LPL = minMaxDelete(LPL, 1, 2);
  LHPG = minMaxDelete(LHPG, 1, 2);
  LLPG = minMaxDelete(LLPG, 1, 2);
  RHPG = minMaxDelete(RHPG, 1, 2);
  RLPG = minMaxDelete(RLPG, 1, 2);
  blink = minMaxDelete(blink, 1, 2);
  notBlink = minMaxDelete(notBlink, 1, 2);

  var token;

  var tempHP = 0;
  var tempLP = 0;
  var tempLHPL = 0;
  var tempLLPL = 0;
  var tempHPL = 0;
  var tempLPL = 0;
  var tempLHPG = 0;
  var tempLLPG = 0;
  var tempRHPG = 0;
  var tempRLPG = 0;

  var tempBlink = 0;
  var tempNotBlink = 0;

  for(var i = 0; i < HP.length; i++) {
    tempHP += HP[i];
    tempLP += LP[i];
    tempLHPL += LHPL[i];
    tempLLPL += LLPL[i];
    tempHPL += HPL[i];
    tempLPL += LPL[i];
    tempLHPG += LHPG[i];
    tempLLPG += LLPG[i];
    tempRHPG += RHPG[i];
    tempRLPG += RLPG[i];
  }

  for(var i = 0; i < blink.length; i++) {
    tempBlink += blink[i];
  }

  for(var i = 0; i < notBlink.length; i++) {
    tempNotBlink += notBlink[i];
  }

  tempHP = tempHP / HP.length;
  tempLP = tempLP/  LP.length;
  tempLHPL = tempLHPL / LHPL.length;
  tempLLPL = tempLLPL / LLPL.length;
  tempHPL = tempHPL / HPL.length;;
  tempLPL = tempLPL / LPL.length;
  tempLHPG = tempLHPG / LHPG.length;
  tempLLPG = tempLLPG / LLPG.length;
  tempRHPG = tempRHPG / RHPG.length;
  tempRLPG = tempRLPG / RLPG.length;

  tempBlink = tempBlink / blink.length;
  tempNotBlink = tempNotBlink / notBlink.length;

  var obj = {'HP':tempHP, 'LP':tempLP, 'LHPL':tempLHPL, 'LLPL':tempLLPL, 'HPL':tempHPL, 'LPL':tempLPL, 'LHPG':tempLHPG, 'LLPG':tempLLPG, 'RHPG':tempRHPG, 'RLPG':tempRLPG, 'blink':tempBlink, 'notBlink':tempNotBlink};
  obj = JSON.stringify(obj);

  //console.log('개인식별 토큰 생성 완료');
  console.log(obj);

  return obj;
}

exports.identification = identification;
