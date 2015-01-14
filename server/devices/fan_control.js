
Meteor.publish('FanControl', function () {
  return FanControl.find();
});

Meteor.methods({

  'fan:setSpeed': function (options) {

    function setSpeed (callback) {
      wire.writeByte(newSpeed, callback);
    }

    var newSpeed = options.data.speed;
    var i2c = Meteor.npmRequire('i2c');
    var address = 0x74;
    var wire = new i2c(address, { device: '/dev/i2c-1' });
    var async = Meteor.npmRequire('async');

    async.series([setSpeed, Meteor.bindEnvironment(function saveData () {

      FanControl.upsert(options.id, options.data);
    })]);

  }
});
