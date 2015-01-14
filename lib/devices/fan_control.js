
FanControl = new Mongo.Collection('FanControl');

FanControl.setRPM = function (id, data) {

  Meteor.call('fan:setSpeed', {
    id: id,
    data: data
  });
};

