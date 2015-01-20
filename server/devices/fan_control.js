
Meteor.publish('FanControl', function () {
  return FanControl.find({}, {
    sort: { date: -1 },
    limit: 1
  });
});

Meteor.methods({

  'fan:setSpeed': function (options) {

    function setSpeed (callback) {
        rasp2c.set(address, newSpeed, value, mode, callback);
    }

    var newSpeed = options.data.speed;
    var address = 0x74;
    var value = '';
    var mode = 'i';
    var async = Meteor.npmRequire('async');

    async.series([setSpeed, Meteor.bindEnvironment(function saveData () {

      FanControl.upsert(options.id, options.data);
    })]);

  }
});
