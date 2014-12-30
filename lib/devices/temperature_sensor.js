
TemperatureSensor = new Mongo.Collection('TemperatureSensor');

TemperatureSensor.getTemperature = function () {

  var currentTemperature = Meteor.call('temperature:readSensor');
  var id = Date.now();

  TemperatureSensor.upsert(id, currentTemperature);
};
