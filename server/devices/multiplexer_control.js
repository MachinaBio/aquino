
Meteor.publish('MultiplexerControl', function () {
  return MultiplexerControl.find();
});

Meteor.methods({

  'multiplexer:setChannel': function (options) {

    function setChannel (callback) {
      rasp2c.set(address, channel, callback);
    }

    var channels = options.data.channels;
    var address = 0x70;
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

    var channel = channelByteMap[newChannel];

    async.series([setChannel, Meteor.bindEnvironment(function setData () {
      MultiplexerControl.upsert(options.id, options.data);
    })]);

  }
});
