// var exec = require('child_process').exec;
//
// const test = () => {
//   exec('./EOGMeasurement.js', function callback(error, stdout, stderr){
//     console.log(error);
//   });
// }
// test();
//
// if(((token1.HP / originToken1.HP) > 0.8 && (token1.HP / originToken1.HP) < 1.2) && ((token1.LP / originToken1.LP) > 0.8 && (token1.LP / originToken1.LP) < 1.2) && ((token1.LHPL / originToken1.LHPL) > 0.8 && (token1.LHPL / originToken1.LHPL) < 1.2) && ((token1.LLPL / originToken1.LLPL) > 0.8 && (token1.LLPL / originToken1.LLPL) < 1.2) && ((token1.HPL / originToken1.HPL) > 0.8 && (token1.HPL / originToken1.HPL) < 1.2) && ((token1.LPL / originToken1.LPL) > 0.8 && (token1.LPL / originToken1.LPL) < 1.2) && ((token1.LHPG / originToken1.LHPG) > 0.8 && (token1.LHPG / originToken1.LHPG) < 1.2) && ((token1.LLPG / originToken1.LLPG) > 0.8 && (token1.LLPG / originToken1.LLPG) < 1.2) && ((token1.RHPG / originToken1.RHPG) > 0.8 && (token1.RHPG / originToken1.RHPG) < 1.2) && ((token1.RLPG / originToken1.RLPG) > 0.8 && (token1.RLPG / originToken1.RLPG) < 1.2)) {
//   console.log('fp1 중복으로 개인식별');
// }
// else if(((token2.HP / originToken2.HP) > 0.8 && (token2.HP / originToken2.HP) < 1.2) && ((token2.LP / originToken2.LP) > 0.8 && (token2.LP / originToken2.LP) < 1.2) && ((token2.LHPL / originToken2.LHPL) > 0.8 && (token2.LHPL / originToken2.LHPL) < 1.2) && ((token2.LLPL / originToken2.LLPL) > 0.8 && (token2.LLPL / originToken2.LLPL) < 1.2) && ((token2.HPL / originToken2.HPL) > 0.8 && (token2.HPL / originToken2.HPL) < 1.2) && ((token2.LPL / originToken2.LPL) > 0.8 && (token2.LPL / originToken2.LPL) < 1.2) && ((token2.LHPG / originToken2.LHPG) > 0.8 && (token2.LHPG / originToken2.LHPG) < 1.2) && ((token2.LLPG / originToken2.LLPG) > 0.8 && (token2.LLPG / originToken2.LLPG) < 1.2) && ((token2.RHPG / originToken2.RHPG) > 0.8 && (token2.RHPG / originToken2.RHPG) < 1.2) && ((token2.RLPG / originToken2.RLPG) > 0.8 && (token2.RLPG / originToken2.RLPG) < 1.2)) {
//   console.log('fp2 중복으로 개인식별');
// }
// else {
//   console.log('개인식별 실패');
// }

var test = [30 , 10, 20, 30, 40, 50, 10, 20];
var min = test.indexOf(Math.min.apply(null, test));
test.splice(min, 1);
