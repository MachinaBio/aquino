Meteor.methods({

  'temperature:read_sensor': function read_sensor (format) {
    var fs = Meteor.npmRequire('fs')
    var temperature;

    try {
      fs.writeFileSync('/opt/aquino/external/format', format);
      temperature = fs.readFileSync('/opt/aquino/external/temperature', 'utf8');
      temperature = temperature.split(',');

    } catch (error) {
      console.log(error);
      temperature = [0, 'N/A', Date.now()];
    }

    console.log('Temperature:', temperature);

    TemperatureSensor.upsert('last_read_temperature', {
      $set: {
        date: temperature[2],
        temperature: temperature[0],
        unit: temperature[1]
      }
    });

    return temperature[0];

  }
});
