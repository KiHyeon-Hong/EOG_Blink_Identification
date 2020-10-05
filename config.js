const fs = require('fs');

var identificationUp = function(data) {
  var json = fs.readFileSync('./config/config.json', 'utf8');
  json = JSON.parse(json);

  json = {"identificationUp":data,"identificationDown":json.identificationDown,"minMaxCount":json.minMaxCount,"blinkPoint":json.blinkPoint,"delayTime":json.delayTime,"EOGBlink":json.EOGBlink,"count":json.count};
  json = JSON.stringify(json);

  fs.writeFileSync('./config/config.json', json, 'utf8');
}

var identificationDown = function(data) {
  var json = fs.readFileSync('./config/config.json', 'utf8');
  json = JSON.parse(json);

  json = {"identificationUp":json.identificationUp,"identificationDown":data,"minMaxCount":json.minMaxCount,"blinkPoint":json.blinkPoint,"delayTime":json.delayTime,"EOGBlink":json.EOGBlink,"count":json.count};
  json = JSON.stringify(json);

  fs.writeFileSync('./config/config.json', json, 'utf8');
}

var minMaxCount = function(data) {
  var json = fs.readFileSync('./config/config.json', 'utf8');
  json = JSON.parse(json);

  json = {"identificationUp":json.identificationUp,"identificationDown":json.identificationDown,"minMaxCount":data,"blinkPoint":json.blinkPoint,"delayTime":json.delayTime,"EOGBlink":json.EOGBlink,"count":json.count};
  json = JSON.stringify(json);

  fs.writeFileSync('./config/config.json', json, 'utf8');
}

var blinkPoint = function(data) {
  var json = fs.readFileSync('./config/config.json', 'utf8');
  json = JSON.parse(json);

  json = {"identificationUp":json.identificationUp,"identificationDown":json.identificationDown,"minMaxCount":json.minMaxCount,"blinkPoint":data,"delayTime":json.delayTime,"EOGBlink":json.EOGBlink,"count":json.count};
  json = JSON.stringify(json);

  fs.writeFileSync('./config/config.json', json, 'utf8');
}

var delayTime = function(data) {
  var json = fs.readFileSync('./config/config.json', 'utf8');
  json = JSON.parse(json);

  json = {"identificationUp":json.identificationUp,"identificationDown":json.identificationDown,"minMaxCount":json.minMaxCount,"blinkPoint":json.blinkPoint,"delayTime":data,"EOGBlink":json.EOGBlink,"count":json.count};
  json = JSON.stringify(json);

  fs.writeFileSync('./config/config.json', json, 'utf8');
}

var eogBlink = function(data) {
  var json = fs.readFileSync('./config/config.json', 'utf8');
  json = JSON.parse(json);

  json = {"identificationUp":json.identificationUp,"identificationDown":json.identificationDown,"minMaxCount":json.minMaxCount,"blinkPoint":json.blinkPoint,"delayTime":json.delayTime,"EOGBlink":data,"count":json.count};
  json = JSON.stringify(json);

  fs.writeFileSync('./config/config.json', json, 'utf8');
}

var count = function(data) {
  var json = fs.readFileSync('./config/config.json', 'utf8');
  json = JSON.parse(json);

  json = {"identificationUp":json.identificationUp,"identificationDown":json.identificationDown,"minMaxCount":json.minMaxCount,"blinkPoint":json.blinkPoint,"delayTime":json.delayTime,"EOGBlink":json.EOGBlink,"count":data};
  json = JSON.stringify(json);

  fs.writeFileSync('./config/config.json', json, 'utf8');
}


exports.identificationUp = identificationUp;
exports.identificationDown = identificationDown;
exports.minMaxCount = minMaxCount;
exports.blinkPoint = blinkPoint;
exports.delayTime = delayTime;
exports.eogBlink = eogBlink;
exports.count = count;
