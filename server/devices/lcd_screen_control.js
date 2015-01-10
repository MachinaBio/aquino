
Meteor.publish('LCDScreenControl', function () {
  return LCDScreenControl.find();
});

Meteor.methods({

  'lcd:setText': function (data) {

    // TODO: add this when we get the LCD working properly.
  }
});
