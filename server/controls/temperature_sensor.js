// This file is deprecated. -Skyler, Jul 3 2015
Meteor.publish('TemperatureSensor', function () {
  return TemperatureSensor.find({}, {
    sort: { time: -1 },
    limit: 1
  });
});

Meteor.methods({

  'temperature:readSensor': function () {

    function readTemperature (callback) {

      rasp2c.dump(address, range, function setResults (error, results) {
        if (error) { dumpError = error; }
        else { dumpResults = results; }

        callback();
      });
    }

    var address = 0x48;
    var async = Meteor.npmRequire('async');
    var range = '0-2';
    var tens;
    var decimal;
    var dumpError;
    var dumpResults;

    async.series([
      readTemperature,
      Meteor.bindEnvironment(function setData () {
      if (dumpError) { throw dumpError; };

      tens = dumpResults[0];
      //decimal = results[1] / 256;
      var currentTemperature = '~' + tens; // + decimal;
      var time = Date.now();

      TemperatureSensor.insert({ time: time, temp: currentTemperature });
    })]);
  }
});
