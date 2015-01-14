
Meteor.publish('FanControl', function () {
  return FanControl.find();
});

Meteor.methods({

  'fan:setRPM': function (options) {

    function setRPM (callback) {
      wire.writeByte(newRPM, callback);
    }

    var newRPM = options.data.rpm;
    var i2c = Meteor.npmRequire('i2c');
    var address = 0x74;
    var wire = new i2c(address, { device: '/dev/i2c-1' });
    var async = Meteor.npmRequire('async');

    async.series([setRPM, Meteor.bindEnvironment(function saveData () {

      FanControl.upsert(options.id, options.data);
    })]);

  }
});
