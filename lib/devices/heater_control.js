
HeaterControl = new Mongo.Collection('HeaterControl');

HeaterControl.setTemperature = function (id, data) {

  HeaterControl.upsert(id, data);

  Meteor.call('heater:setTemperature', data);
};
