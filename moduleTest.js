/*
  뇌파 측정 없이 모듈 테스트를 위한 모듈

  @author Gachon University, NAYUNTECH
  @version 1.0
  @테스트 코드 작성
*/

const fs = require('fs');
const identification = require('./Identification.js');
const register = require('./Register.js');
const config = require('./config.js');


var fp1 = fs.readFileSync('./data/dataCh2.txt', 'utf8');
var fp2 = fs.readFileSync('./data/dataCh3.txt', 'utf8');

//var result = register.register(fp1, fp2);
//var result = identification.identification(fp1, fp2);
var result = config.count(15);

console.log(result);
