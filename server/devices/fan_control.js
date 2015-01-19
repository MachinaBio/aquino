
Meteor.publish('FanControl', function () {
  return FanControl.find();
});

Meteor.methods({

  'fan:setSpeed': function (options) {

    function setSpeed (callback) {
        rasp2c.set(address, newSpeed, value, callback);
    }

    var newSpeed = options.data.speed;
    var address = 0x74;
    var value = '';
    var async = Meteor.npmRequire('async');

    async.series([setSpeed, Meteor.bindEnvironment(function saveData () {

      FanControl.upsert(options.id, options.data);
    })]);

  }
});
