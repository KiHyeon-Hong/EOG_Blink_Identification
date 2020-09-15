const fs = require('fs');
const identification = require('./Identification.js');

var fp1 = fs.readFileSync('./data/dataCh2.txt', 'utf8');
var fp2 = fs.readFileSync('./data/dataCh3.txt', 'utf8');

var fp1Array = fp1.split(',').map(function(item) {
    return parseFloat(item, 10);
});
var fp2Array = fp2.split(',').map(function(item) {
    return parseFloat(item, 10);
});
