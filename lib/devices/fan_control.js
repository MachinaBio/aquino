
FanControl = new Mongo.Collection('FanControl');

FanControl.setRPM = function (id, data) {

  Meteor.call('fan:setRPM', {
    id: id,
    data: data
  });
};

