Meteor.methods({

  'heater:set_voltage': function (voltage) {
    var fs = Meteor.npmRequire('fs')

    // Set controller results within bounds of 0-4
    if (voltage <= 0) { voltage = '0.0'; }
    if (voltage >= 4) { voltage = '4.0'; }

    try {
      fs.writeFileSync('/opt/aquino/external/voltage', voltage)
      console.log('Voltage set:', voltage);
    } catch (error) {
      voltage = '0.0';
    }

    HeaterVoltage.upsert('last_set_voltage', {
      $set: {
        date: Date.now(),
        voltage: voltage
      }
    });

    return voltage;
  }
});
