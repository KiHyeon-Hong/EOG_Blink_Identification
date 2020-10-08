/*
  개인식별 성능 평가 모듈

  @author Gachon University, NAYUNTECH
  @version 1.0
  @개인식별 성능 평가를 위한 코드 작성
*/

/*
  user1와 user2를 이용한 개인식별 성능 평가
*/
// const fs = require('fs');
// const identification = require('./Identification.js');
// const register = require('./Register.js');
//
// var sucSuc = 0;
// var sucFail = 0;
// var fail = 0;
//
// for(let i = 0; i < 2; i++){
//   for(let j = 0; j < 50; j++){
//     let regFile0 = fs.readFileSync('./EOGSampleFile/user' + (i+1) + '/file' + j + '-1.txt', 'utf8');
//     let regFile1 = fs.readFileSync('./EOGSampleFile/user' + (i+1) + '/file' + j + '-2.txt', 'utf8');
//
//     register.register(regFile0, regFile1);
//
//     for(let k = 0; k < 2; k++){
//       for(let l = 0; l < 50; l++){
//         //console.log('user' + (i+1) + '과 user' + (k+1) + ' 비교');
//         let fp1 = fs.readFileSync('./EOGSampleFile/user' + (k+1) + '/file' + l + '-1.txt', 'utf8');
//         let fp2 = fs.readFileSync('./EOGSampleFile/user' + (k+1) + '/file' + l + '-2.txt', 'utf8');
//
//         let result1 = identification.identification(fp1, fp2);
//
//         if((i == k) && (result1 == true)) {
//           sucSuc++;
//         }
//         else if((i != k) && (result1 != true)) {
//           sucFail++;
//         }
//         else {
//           fail++;
//         }
//       }
//     }
//   }
// }



/*
  user1과 user1의 데이터를 이용한 개인식별 성능 평가
*/
const fs = require('fs');
const identification = require('./Identification.js');
const register = require('./Register.js');

var sucSuc = 0;
var sucFail = 0;
var fail = 0;

var check = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

for(let i = 0; i < 1; i++){
  for(let j = 0; j < 50; j++){
    let regFile0 = fs.readFileSync('./EOGSampleFile/user' + (i+2) + '/file' + j + '-1.txt', 'utf8');
    let regFile1 = fs.readFileSync('./EOGSampleFile/user' + (i+2) + '/file' + j + '-2.txt', 'utf8');

    register.register(regFile0, regFile1);

    for(let k = 0; k < 1; k++){
      for(let l = 0; l < 50; l++){
        //console.log('user' + (i+1) + '과 user' + (k+1) + ' 비교');
        let fp1 = fs.readFileSync('./EOGSampleFile/user' + (k+2) + '/file' + l + '-1.txt', 'utf8');
        let fp2 = fs.readFileSync('./EOGSampleFile/user' + (k+2) + '/file' + l + '-2.txt', 'utf8');

        let result1 = identification.identification(fp1, fp2);

        if((i == k) && (result1 == true)) {
          sucSuc++;
          check[j]++;
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
// for(let i = 0; i < 10; i++) {
//   console.log((i + 1) + " : " + check[i]);
// }
