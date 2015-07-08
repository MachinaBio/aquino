Meteor.methods({

  'temperature:read_sensor': function read_sensor (format) {
    var READ_TEMPERATURE_COMMAND = 'python '
      + '../../../../../external/read_temperature_sensor.py '
      + format
      ;

    var execSync = Meteor.wrapAsync(Meteor.npmRequire('child_process').exec);
    var temperature;

    try {
      temperature = execSync(READ_TEMPERATURE_COMMAND);

    } catch (error) {
      temperature = 0;
    }

    TemperatureSensor.upsert('last_read_temperature', {
      $set: {
        date: Date.now(),
        temperature: temperature,
        unit: format
      }
    });

    return temperature;

  }
});
