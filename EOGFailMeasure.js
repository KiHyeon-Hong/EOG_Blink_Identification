const gpio = require('node-wiring-pi');
const LED = 29;
gpio.setup('wpi');
gpio.pinMode(LED, gpio.OUTPUT);

const {
    Ganglion
} = require('openbci-observable');

const eegPipes = require('@neurosity/pipes');
const fs = require("fs");

const EOGBlink = 600;

var count = 0;

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
    count++;

  })
}

init();

setInterval(() => {
  if(count > 15) {
    gpio.digitalWrite(LED, 0)
    process.exit();
  }
}, 1000);

process.on('exit', () => {
  gpio.digitalWrite(LED, 0)
  process.exit();
});
