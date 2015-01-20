
Meteor.subscribe('FanControl');

Template.main.helpers({
  device_id: function getDeviceID () {
    // TODO: bind this to which device we're on.  Stored in Mongo, probably.
    return '0001';
  }
});
