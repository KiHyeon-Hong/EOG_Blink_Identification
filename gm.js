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

        fs.appendFile("./data/dataCh2.txt", data.data[1].toString(), 'utf8', function (error) {
            if (error) {
                console.log(error)
            }
            console.log("append ------  ./data/dataCh2.txt")
        })
        fs.appendFile("./data/dataCh3.txt", data.data[2].toString(), 'utf8', function (error) {
            if (error) {
                console.log(error)
            }
            console.log("append ------  ./data/dataCh3.txt")
        })


    })
}

init();
