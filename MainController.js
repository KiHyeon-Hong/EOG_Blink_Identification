
const fs = require('fs');
const identification = require('./Identification.js');
const register = require('./Register.js');

var fp1 = fs.readFileSync('./data/dataCh2.txt', 'utf8');
var fp2 = fs.readFileSync('./data/dataCh3.txt', 'utf8');

var result = register.register(fp1, fp2);

console.log(result);
