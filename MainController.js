
const fs = require('fs');
const identification = require('./Identification.js');

var fp1 = fs.readFileSync('./data/dataCh2.txt', 'utf8');
var fp2 = fs.readFileSync('./data/dataCh3.txt', 'utf8');

var result = identification.identification(fp1, fp2);

console.log(result);
