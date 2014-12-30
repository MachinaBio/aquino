
FanControl = new Mongo.Collection('FanControl');

FanControl.setRPM = function (id, data) {

  FanControl.upsert(id, data);

  Meteor.call('fan:setRPM', data);
};

