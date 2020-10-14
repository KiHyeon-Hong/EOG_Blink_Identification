const gpio = require('node-wiring-pi');
const LED = 29;

const ledOn = () => {
  gpio.digitalWrite(LED, 1);
  setTimeout(ledOff, 1000);
}

const ledOff = () => {
  gpio.digitalWrite(LED, 0);
  setTimeout(ledOn, 1000);
}

process.on('exit', () => {
  gpio.digitalWrite(LED, 0);
  process.exit();
});

gpio.setup('wpi');
gpio.pinMode(LED, gpio.OUTPUT);

setTimeout(ledOn, 1000);
