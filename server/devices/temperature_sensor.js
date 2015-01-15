
Meteor.publish('TemperatureSensor', function () {
  return TemperatureSensor.find();
});

Meteor.methods({

  'temperature:readSensor': function () {

    function readTemperature (callback) {

      wire.readBytes(startByte, endByte, function readBytes (error, response) {

        tens = response[0];
        decimal = response[1] / 256;

        callback();
      });
    }

    var i2c = Meteor.npmRequire('i2c');
    var address = 0x48;
    var wire = new i2c(address, { device: '/dev/i2c-1' });
    var async = Meteor.npmRequire('async');
    var startByte = 0;
    var endByte = 2;
    var tens;
    var decimal;

    async.series([readTemperature, Meteor.bindEnvironment(function setData () {

      var currentTemperature = tens + decimal;
      var id = Date.now();

      TemperatureSensor.upsert(id, currentTemperature);
    })]);
  }
});
