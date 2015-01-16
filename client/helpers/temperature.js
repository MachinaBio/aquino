
Meteor.subscribe('TemperatureSensor');
Meteor.subscribe('HeaterControl');

Template.temperature.helpers({
  current: function getTemperature () {

    var last = TemperatureSensor.findOne({}, { sort: { date: -1 }});
    var NONE_FOUND = 'N/A';

    return last ? last.temp : NONE_FOUND;

  },

  target: function getTarget () {

    var last = HeaterControl.findOne({}, { sort: { date: -1 }});
    var NONE_FOUND = '(Not set)';

    return last ? last.target : NONE_FOUND;
  }
});

Template.temperature.events({

  'click .set-temperature': function (e) {
    e.preventDefault();

    var $button = $(e.target);
    var $input = $button.siblings('.temperature-control');
    var newTemperature = $input.val();

    $input.val('');

    HeaterControl.setTemperature(
      this._id,
      createData('target', newTemperature)
    );
  }
});

Meteor.setInterval(TemperatureSensor.getTemperature, 1000);
