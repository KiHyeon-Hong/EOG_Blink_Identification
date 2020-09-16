var exec = require('child_process').exec;

const test = () => {
  exec('./EOGMeasurement.js', function callback(error, stdout, stderr){
    console.log(error);
  });
}
test();
