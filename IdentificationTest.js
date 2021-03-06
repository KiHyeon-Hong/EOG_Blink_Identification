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

fs.writeFileSync('./LogFile/identificationTest.log', "", 'utf8');

var sucSuc = 0;
var sucFail = 0;
var fail = 0;
var failFail = 0;

for(let i = 0; i < 1; i++){
  let j = parseInt((Math.random()*50));

  let regFile0 = fs.readFileSync('./EOGSampleFile/user' + (i+1) + '/file' + j + '-1.txt', 'utf8');
  let regFile1 = fs.readFileSync('./EOGSampleFile/user' + (i+1) + '/file' + j + '-2.txt', 'utf8');

  register.register(regFile0, regFile1);
  fs.appendFileSync("./LogFile/identificationTest.log", '사용자 등록 성공(피험자 ' + (i+1) + '번) \n', 'utf8',);

  for(let k = 0; k < 2; k++) {
    for(let l = 0; l < 50; l++) {
      let fp1 = fs.readFileSync('./EOGSampleFile/user' + (k+1) + '/file' + l + '-1.txt', 'utf8');
      let fp2 = fs.readFileSync('./EOGSampleFile/user' + (k+1) + '/file' + l + '-2.txt', 'utf8');

      let result1 = identification.identification(fp1, fp2);

      if((i == k) && (result1 == true)) {
        //사용자를 해딩 사용자로 올바르게 판단한 경우
        sucSuc++;
        console.log('피험자' + (k+1) + '번 식별 결과 : 성공(등록된 사용자로 인식) \n');
        fs.appendFileSync("./LogFile/identificationTest.log", '피험자' + (k+1) + '번 식별 결과 : 성공(등록된 사용자로 인식) \n', 'utf8',);
      }
      else if((i != k) && (result1 != true)) {
        //비 사용자를 비 사용자로 올바르게 판단한 경우
        sucFail++;
        console.log('피험자' + (k+1) + '번 식별 결과 : 성공(등록된 사용자가 아님) \n');
        fs.appendFileSync("./LogFile/identificationTest.log", '피험자' + (k+1) + '번 식별 결과 : 성공(등록된 사용자가 아님) \n', 'utf8',);
      }
      else if((i == k) && (result1 != true)) {
        //사용자를 비 사용자로 판단한경우
        fail++;
        console.log('피험자' + (k+1) + '번 식별 결과 : 오류 발생(등록된 사용자를 식별하지 못함) \n');
        fs.appendFileSync("./LogFile/identificationTest.log", '피험자' + (k+1) + '번 식별 결과 : 오류 발생(등록된 사용자를 식별하지 못함) \n', 'utf8',);
      }
      else if((i != k) && (result1 == true)) {
        //비 사용자를 사용자로 판단한 경우
        failFail++;
        console.log('피험자' + (k+1) + '번 식별 결과 : 오류 발생(등록되지 않은 사용자를 오인함) \n');
        fs.appendFileSync("./LogFile/identificationTest.log", '피험자' + (k+1) + '번 식별 결과 : 오류 발생(등록되지 않은 사용자를 오인함) \n', 'utf8',);
      }
    }
  }
}

console.log("sucSuc : " + sucSuc);
console.log("sucFail : " + sucFail);
console.log("fail : " + fail);
console.log("failFail : " + failFail);

console.log('정확도 : ' + (sucSuc + sucFail) + '%');
