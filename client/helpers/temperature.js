
var timeout;

function pollTemperature () {

  Meteor.clearTimeout(timeout);

  TemperatureSensor.getTemperature();

  timeout = Meteor.setTimeout(pollTemperature, 30000);
}

Meteor.subscribe('TemperatureSensor');
Meteor.subscribe('HeaterControl');

pollTemperature();

Template.temperature.helpers({
  current: function getTemperature () {

    var last = TemperatureSensor.findOne({}, { sort: { time: -1 }});
    var NONE_FOUND = 'N/A';

    return last ? last.temp : NONE_FOUND;

  },

  time: function getTime () {

    var last = TemperatureSensor.findOne({}, { sort: { time: -1 }});
    var NONE_FOUND = 'N/A';

    var time = last ?
      new Date(last.time).toLocaleTimeString() :
      NONE_FOUND
      ;
    var date = last ?
      new Date(last.time).toLocaleDateString() :
      NONE_FOUND
      ;
    var when = time + ', ' + date;

    return when;
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
