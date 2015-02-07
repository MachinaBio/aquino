
TemperatureSensor = new Mongo.Collection('TemperatureSensor');

TemperatureSensor.getTemperature = function () {

  Meteor.call('temperature:readSensor');

};
