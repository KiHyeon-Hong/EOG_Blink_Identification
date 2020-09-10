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

        console.log(data.data[1]);


    })
}

init();
