
Meteor.publish('MultiplexerControl', function () {
  return MultiplexerControl.find();
});

Meteor.methods({

  'multiplexer:setChannel': function (options) {

    function setChannel (callback) {
      wire.writeByte(byte, callback);
    }

    var channels = options.data.channels;
    var i2c = Meteor.npmRequire('i2c');
    var address = 0x70;
    var wire = new i2c(address, { device: '/dev/i2c-1' });
    var async = Meteor.npmRequire('async');

    var OFF = 'OFF';
    var channelByteMap = {
      'OFF': 0,
      '1': 4,
      '2': 5
    };

    var checked = _.find(channels, function findState (channel) {
      return channel.checked;
    });
    var newChannel = checked ? checked.channel : OFF;

    var byte = channelByteMap[newChannel];

    async.series([setChannel, Meteor.bindEnvironment(function setData () {
      MultiplexerControl.upsert(options.id, options.data);
    })]);

  }
});
