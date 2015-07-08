Meteor.methods({

  'temperature:get_temperature': function get_temperature () {
    var FORMAT = 'f';

    var temperature = Meteor.call('temperature:read_sensor', FORMAT);

    return temperature;
  }
});
