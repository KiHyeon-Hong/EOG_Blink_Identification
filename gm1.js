const {
    Ganglion
} = require('openbci-observable');
const eegPipes = require('@neurosity/pipes');
const fs = require("fs");

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
      let flag = 0;
      for(let i = 0; i < data.data[1].length; i++) {
        if(data.data[1][i] > 400 || data.data[1][i] < -400)
          flag = 1;
      }
        if(flag == 0)
          console.log('good');
        else
          console.log('bad');


    })
}

init();
