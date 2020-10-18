/*
  개인식별 성능 평가 모듈

  @author Gachon University, NAYUNTECH
  @version 1.0
  @개인식별 성능 평가를 위한 코드 작성
*/

/*
  user1와 user2를 이용한 개인식별 성능 평가
*/
const fs = require('fs');
const identification = require('./Identification.js');
const register = require('./Register.js');

var sucSuc = 0;
var sucFail = 0;
var fail = 0;

for(let i = 0; i < 2; i++){
  let j = parseInt((Math.random()*50));

  let regFile0 = fs.readFileSync('./EOGSampleFile/user' + (i+1) + '/file' + j + '-1.txt', 'utf8');
  let regFile1 = fs.readFileSync('./EOGSampleFile/user' + (i+1) + '/file' + j + '-2.txt', 'utf8');

  register.register(regFile0, regFile1);

  for(let k = 0; k < 2; k++){
    for(let l = 0; l < 25; l++){

      let num = parseInt((Math.random()*50));

      let fp1 = fs.readFileSync('./EOGSampleFile/user' + (k+1) + '/file' + num + '-1.txt', 'utf8');
      let fp2 = fs.readFileSync('./EOGSampleFile/user' + (k+1) + '/file' + num + '-2.txt', 'utf8');

      let result1 = identification.identification(fp1, fp2);

      //console.log('user' + (i+1) + '의 ' + j + '번 째 파일과 user' + (k+1) + '의 ' + num + '번 째 파일 비교');

      if((i == k) && (result1 == true)) {
        //사용자를 해딩 사용자로 올바르게 판단한 경우
        sucSuc++;
      }
      else if((i != k) && (result1 != true)) {
        //비 사용자를 비 사용자로 올바르게 판단한 경우
        sucFail++;
      }
      else {
        //사용자를 비 사용자로 판단하거나, 비 사용자를 사용자로 판단한 경우
        fail++;
      }
    }
  }
}

console.log("sucSuc : " + sucSuc);
console.log("sucFail : " + sucFail);
console.log("fail : " + fail);
