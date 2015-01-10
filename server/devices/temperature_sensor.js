
Meteor.publish('TemperatureSensor', function () {
  return TemperatureSensor.find();
});

Meteor.methods({

  'temperature:readSensor': function () {

    // var i2c = require('i2c');
    var address = 0x48;
    // var wire = new i2c(address, { device: '/dev/i2c-1' });
    var startByte = 0;
    var endByte = 2;

    // var readBytes = Meteor.wrapAsync(wire.readBytes);

    // var temperatureBuffer = readBytes(startByte, endByte);

    var tens = temperatureBuffer[0];
    var decimal = temperatureBuffer[1] / 256;

    var result = tens + decimal;

    return result;
  }
});
