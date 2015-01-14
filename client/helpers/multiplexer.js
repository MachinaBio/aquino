
Meteor.subscribe('MultiplexerControl');

Template.multiplexer.helpers({
  channels: function getChannel () {

    var last = MultiplexerControl.findOne({}, { sort: { date: -1 }});
    var NONE_FOUND = [
      { channel: 1, checked: false },
      { channel: 2, checked: false }
    ];

    return last ? last.channels : NONE_FOUND;
  }
});

Template.multiplexer.events({
  'change input': function (e) {

    var $target = $(e.target);
    var $inputs = $target.parents('fieldset').find('input');
    var channels = new Array($inputs.length);

    _.each($inputs, function parseChannelInput (input, index) {

      channels[index] = {
        channel: input.value,
        checked: input.checked
      };
    });

    MultiplexerControl.setChannel(this._id, createData('channels', channels));
  }
});
