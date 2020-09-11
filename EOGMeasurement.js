const {
    Ganglion
} = require('openbci-observable');

const eegPipes = require('@neurosity/pipes');
const fs = require("fs");

var flag = 0;
var preFlag = 0;

async function init() {
  const ganglion = new Ganglion({
    verbose: true,
    simulate: true
  });

  await ganglion.connect();
  await ganglion.start();

  ganglion.stream.pipe(

    eegPipes.voltsToMicrovolts(),

    eegPipes.addInfo({
      channels: ["null", "Fp2", "Fp1", "null"]
    }),

    eegPipes.epoch({
      duration: 400,interval:400
    }),

    eegPipes.notchFilter({
      nbChannels: 4,
      cutoffFrequency: 60
    }),

    eegPipes.bandpassFilter({
      nbChannels: 4,
      cutoffFrequencies: [1, 50]
    })

  ).subscribe(data => {

    for(let i = 0; i < data.data[1].length; i++) {
      if(data.data[1][i] > 400 || data.data[1][i] < -400 || data.data[2][i] > 400 || data.data[2][i] < -400) {
        flag = 1;
        break;
      }
      else {
        flag = 0;
      }
    }

    if(flag == 0) {
      if(preFlag == 1) {
        console.log('수면케어 안대 착용이 정상적입니다(데이터를 기록합니다).');
      }
      preFlag = 0;

      fs.appendFile("./data/dataCh2.txt", data.data[1].toString(), 'utf8', function (error) {
        if (error) {
          console.log(error)
        }
        //console.log("append ------  ./data/dataCh2.txt")
      })
      fs.appendFile("./data/dataCh3.txt", data.data[2].toString(), 'utf8', function (error) {
        if (error) {
          console.log(error)
        }
       //console.log("append ------  ./data/dataCh3.txt")
      })

    }
    else {
      if(preFlag == 0) {
        console.log('수면케어 안대 착용이 비 정상적입니다(데이터를 기록하지 않습니다).');
      }
      preFlag = 1;
    }

  })
}

init();
