
Meteor.publish('HeaterControl', function () {
  return HeaterControl.find({}, {
    sort: { date: -1 },
    limit: 1
  });
});

Meteor.methods({

  'heater:setTemperature': function (data) {

    // TODO: add this when we get the LCD working properly.
  }
});
