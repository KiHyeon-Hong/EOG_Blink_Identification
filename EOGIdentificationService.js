const fs = require('fs');
const identification = require('./Identification.js');
const register = require('./Register.js');

var exec = require('child_process').exec;

const measurement = () => {
  exec('sudo node EOGMeasurement.js', function callback(error, stdout, stderr){
    main();
  });
}

const main = () => {
  var fp1 = fs.readFileSync('./data/dataCh2.txt', 'utf8');
  var fp2 = fs.readFileSync('./data/dataCh3.txt', 'utf8');

  //var result = register.register(fp1, fp2);
  var result = identification.identification(fp1, fp2);

  console.log(result);
}

measurement();
