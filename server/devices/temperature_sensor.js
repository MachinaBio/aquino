
Meteor.publish('TemperatureSensor', function () {
  return TemperatureSensor.find();
});

Meteor.methods({

  'temperature:readSensor': function () {

    function readTemperature (callback) {

      rasp2c.dump(address, range, callback);
    }

    var address = 0x48;
    var async = Meteor.npmRequire('async');
    var range = '0-2';
    var tens;
    var decimal;

    async.series([
      readTemperature,
      Meteor.bindEnvironment(function setData (error, results) {

      tens = results[0];
      decimal = results[1] / 256;
      var currentTemperature = '~' + tens; // + decimal;
      var time = Date.now();

      TemperatureSensor.insert({ time: time, temp: currentTemperature });
    })]);
  }
});
