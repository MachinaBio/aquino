
Meteor.publish('FanControl', function () {
  return FanControl.find();
});

Meteor.methods({

  'fan:setRPM': function (data) {

    var newRPM = data.rpm;
    // var i2c = Meteor.npmRequire('i2c');
    var address = 0x74;
    // var wire = new i2c(address, { device: '/dev/i2c-1' });

    // var readByte = Meteor.wrapAsync(wire.readByte);
    // var writeByte = Meteor.wrapAsync(wire.writeByte);

    // var currentRPM = readByte();
    // console.log('Current RPM:', currentRPM);

    // writeByte(newRPM);
    console.log('New RPM:', newRPM);

  }
});
