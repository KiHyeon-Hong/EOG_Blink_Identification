const fs = require('fs');
const identification = require('./Identification.js');
const register = require('./Register.js');

//측정한 뇌파 데이터 불러오기
var fp1 = fs.readFileSync('./data/dataCh2.txt', 'utf8');
var fp2 = fs.readFileSync('./data/dataCh3.txt', 'utf8');


/*
  개인식별 서비스 호출

  @param var fp1 : fp1에서 측정한 뇌파 데이터, var fp2 : fp2에서 측정한 뇌파 데이터
  @return 개인식별 서비스 실행 결과 (true : 개인식별 결과 서비스 사용자, false : 개인식별 결과 서비스 사용자가 아님)
  @exception 없음
*/
//var result = register.register(fp1, fp2);
var result = identification.identification(fp1, fp2);
//var result = config.count(15);

//개인식별 서비스 결과 확인
console.log(result);
