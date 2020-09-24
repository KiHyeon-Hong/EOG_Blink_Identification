// var obj = {'HP':tempHP, 'LP':tempLP, 'LHPL':tempLHPL:tempBlink};
// obj = JSON.stringify(obj);
//
// fs.writeFileSync('./files/data1.json', token1, 'utf8');
//
// var originToken2 = fs.readFileSync('./files/data2.json', 'utf8');
//
// originToken1 = JSON.parse(originToken1);

const fs = require('fs');

var json = fs.readFileSync('./config/config.json', 'utf8');
json = JSON.parse(json);

console.log(json.identificationUp);

var obj = {'HP':tempHP, 'LP':tempLP, 'LHPL':tempLHPL:tempBlink};
obj = JSON.stringify(obj);

fs.writeFileSync('./files/data1.json', token1, 'utf8');
