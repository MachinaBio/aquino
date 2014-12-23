
FanControl = new Mongo.Collection('FanControl');

Meteor.publish('FanControl', function () {
  return FanControl.find();
});
