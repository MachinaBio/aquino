
Meteor.publish('HeaterControl', function () {
  return HeaterControl.find();
});

Meteor.methods({

  'heater:setTemperature': function (data) {

    // TODO: add this when we get the LCD working properly.
  }
});
