
Meteor.subscribe('FanControl');

Template.fan.helpers({
  rpm: function getRPM () {

    var last = FanControl.findOne({}, { sort: { date: -1 }});
    var NONE_FOUND = 'N/A';

    return last ? last.rpm : NONE_FOUND;
  }
});

Template.fan.events({
  'change input': function (e) {

    var rpm = parseInt(e.target.value, 10);

    FanControl.setRPM(this._id, createData('rpm', rpm));
  }
});
