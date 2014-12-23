
TemperatureSensor = new Mongo.Collection('TemperatureSensor');

Meteor.publish('TemperatureSensor', function () {
  return TemperatureSensor.find();
});
