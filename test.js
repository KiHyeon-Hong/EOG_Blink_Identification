// var exec = require('child_process').exec;
//
// const test = () => {
//   exec('sudo node EOGMeasurement.js', function callback(error, stdout, stderr){
//     console.log('good')
//   });
// }
//
// test();

// if(((token1.HP / originToken1.HP) > 0.6 && (token1.HP / originToken1.HP) < 1.4) && ((token1.LP / originToken1.LP) > 0.6 && (token1.LP / originToken1.LP) < 1.4) && ((token1.LHPL / originToken1.LHPL) > 0.6 && (token1.LHPL / originToken1.LHPL) < 1.4) && ((token1.LLPL / originToken1.LLPL) > 0.6 && (token1.LLPL / originToken1.LLPL) < 1.4) && ((token1.HPL / originToken1.HPL) > 0.6 && (token1.HPL / originToken1.HPL) < 1.4) && ((token1.LPL / originToken1.LPL) > 0.6 && (token1.LPL / originToken1.LPL) < 1.4) && ((token1.LHPG / originToken1.LHPG) > 0.6 && (token1.LHPG / originToken1.LHPG) < 1.4) && ((token1.LLPG / originToken1.LLPG) > 0.6 && (token1.LLPG / originToken1.LLPG) < 1.4) && ((token1.RHPG / originToken1.RHPG) > 0.6 && (token1.RHPG / originToken1.RHPG) < 1.4) && ((token1.RLPG / originToken1.RLPG) > 0.6 && (token1.RLPG / originToken1.RLPG) < 1.4)) {
//   console.log('fp1 중복으로 개인식별');
// }
// else if(((token2.HP / originToken2.HP) > 0.6 && (token2.HP / originToken2.HP) < 1.4) && ((token2.LP / originToken2.LP) > 0.6 && (token2.LP / originToken2.LP) < 1.4) && ((token2.LHPL / originToken2.LHPL) > 0.6 && (token2.LHPL / originToken2.LHPL) < 1.4) && ((token2.LLPL / originToken2.LLPL) > 0.6 && (token2.LLPL / originToken2.LLPL) < 1.4) && ((token2.HPL / originToken2.HPL) > 0.6 && (token2.HPL / originToken2.HPL) < 1.4) && ((token2.LPL / originToken2.LPL) > 0.6 && (token2.LPL / originToken2.LPL) < 1.4) && ((token2.LHPG / originToken2.LHPG) > 0.6 && (token2.LHPG / originToken2.LHPG) < 1.4) && ((token2.LLPG / originToken2.LLPG) > 0.6 && (token2.LLPG / originToken2.LLPG) < 1.4) && ((token2.RHPG / originToken2.RHPG) > 0.6 && (token2.RHPG / originToken2.RHPG) < 1.4) && ((token2.RLPG / originToken2.RLPG) > 0.6 && (token2.RLPG / originToken2.RLPG) < 1.4)) {
//   console.log('fp2 중복으로 개인식별');
// }
// else {
//   console.log('개인식별 실패');
// }

// var test = [30 , 10, 20, 30, 40, 50, 10, 20];
// var min = test.indexOf(Math.min.apply(null, test));
// test.splice(min, 1);

const fs = require('fs');
const identification = require('./Identification.js');
const register = require('./Register.js');

var sucSuc = 0;
var sucFail = 0;
var fail = 0;

for(let i = 0; i < 2; i++){
  for(let j = 0; j < 10; j++){
    let regFile0 = fs.readFileSync('./EOGSampleFile/user' + (i+1) + '/file' + j + '-1.txt', 'utf8');
    let regFile1 = fs.readFileSync('./EOGSampleFile/user' + (i+1) + '/file' + j + '-2.txt', 'utf8');

    register.register(regFile0, regFile1);

    for(let k = 0; k < 2; k++){
      for(let l = 0; l < 10; l++){
        console.log('user' + (i+1) + '과 user' + (k+1) + ' 비교');
        let fp1 = fs.readFileSync('./EOGSampleFile/user' + (k+1) + '/file' + l + '-1.txt', 'utf8');
        let fp2 = fs.readFileSync('./EOGSampleFile/user' + (k+1) + '/file' + l + '-2.txt', 'utf8');

        let result1 = identification.identification(fp1, fp2);

        if((i == k) && (result1 == true)) {
          sucSuc++;
        }
        else if((i != k) && (result1 != true)) {
          sucFail++;
        }
        else {
          fail++;
        }
      }
    }
  }
}

console.log("sucSuc : " + sucSuc);
console.log("sucFail : " + sucFail);
console.log("fail : " + fail);
