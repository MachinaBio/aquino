Meteor.methods({

  'heater:set_voltage': function (voltage) {
    var SET_VOLTAGE_COMMAND;
    var execSync = Meteor.wrapAsync(Meteor.npmRequire('child_process').exec);

    // Set controller results within bounds of 0-4
    if (voltage < 0) { voltage = 0; }
    if (voltage > 4) { voltage = 4; }

    SET_VOLTAGE_COMMAND = 'python '
      + '../../../../../external/set_heater_voltage.py '
      + voltage
      ;

    try {
      execSync(SET_VOLTAGE_COMMAND);
    } catch (error) {
      voltage = 0;
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
