
Meteor.publish('MultiplexerControl', function () {
  return MultiplexerControl.find();
});

Meteor.methods({

  'multiplexer:setChannel': function (data) {

    var channels = data.channels;
    // var i2c = Meteor.npmRequire('i2c');
    var address = 0x70;
    // var wire = new i2c(address, { device: '/dev/i2c-1' });

    // var readByte = Meteor.wrapAsync(wire.readByte);
    // var writeByte = Meteor.wrapAsync(wire.writeByte);

    var OFF = 'OFF';
    var channelByteMap = {
      'OFF': 0,
      '1': 4,
      '2': 5
    };
    var channelByteLookup = {
      0: 'OFF',
      4: '1',
      5: '2'
    };

    var checked = _.find(channels, function findState (channel) {

      return channel.checked;
    });
    var newChannel = checked ? checked.channel : OFF;

    var byte = channelByteMap[newChannel];

    // var currentChannel = channelByteLookup[readByte()];

    // writeByte(byte);

    // console.log('Switching from Channel', currentChannel, 'to', newChannel);

  }
});
