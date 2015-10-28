Meteor.methods({

  subscribeToControlData: function () {

    function startControllerPolling () {

      // Get most recent temperature measurement
      var temperature = Meteor.call('temperature:get_temperature');

      // Update controller with current temp
      var correction = controller.update(temperature);
      console.log('Original correction:', correction);

      //TODO: Move this into the voltage updating function
      // Set controller results within bounds of 0-4
      if (correction < 0) { correction = 0; }
      if (correction > 4) { correction = 4; }

      // Update voltage
      Meteor.call('heater:set_voltage', correction);

      // Recurse
      if (pollingTimer) { Meteor.clearTimeout(pollingTimer); }

      pollingTimer = Meteor.setTimeout(startControllerPolling, 1000);

      return pollingTimer;
    }

    function setTarget (setpoints) {
      var newSetpoint =  setpoints.length ? setpoints[setpoints.length - 1].value : 0;

      if (newSetpoint !== lastSetpoint) {

        lastSetpoint = newSetpoint;
        controller.setTarget(parseInt(lastSetpoint, 10));
        startControllerPolling();
      }
    }

    function createTemperatureReadingRecord (id) {
      var sensor = TemperatureSensor.findOne(id);

      return {
        temperature: sensor.temperature,
        unit: sensor.unit,
        date: sensor.date
      }
    }

    function createVoltageRecord (id) {
      var heater = HeaterVoltage.findOne(id);

      return {
        voltage: heater.voltage,
        date: heater.date
      }
    }

    var PIDController = Meteor.npmRequire('node-pid-controller');
    var controller = new PIDController(0.0025, 0.01, 0.01);
    var pollingTimer;
    var lastSetpoint;

    boss.subscribe('SingleDevice', serial_number);
    AquinoDevices = new Mongo.Collection('AquinoDevices', {
      connection: boss
    });

    AquinoDevices.find().observeChanges({
      changed: function (id, fields) {
        if (
          fields.controls &&
          fields.controls.Temperature &&
          fields.controls.Temperature.Setpoints
        ) {
          setTarget(fields.controls.Temperature.Setpoints);
        }
      },

      added: function (id, fields) {
        if (
          fields.controls &&
          fields.controls.Temperature &&
          fields.controls.Temperature.Setpoints
        ) {
          setTarget(fields.controls.Temperature.Setpoints);
        }
      }
    });

    TemperatureSensor.find().observeChanges({
      changed: function (id) {
        AquinoDevices.update({_id: serial_number}, {
          $push: {
            'controls.Temperature.Readings': createTemperatureReadingRecord(id)
          }
        });
      },

      added: function (id) {
        AquinoDevices.update({_id: serial_number}, {
          $push: {
            'controls.Temperature.Readings': createTemperatureReadingRecord(id)
          }
        });
      }
    });

    HeaterVoltage.find().observeChanges({
      changed: function (id, fields) {
        AquinoDevices.update({_id: serial_number}, {
          $push: {
            'controls.Temperature.Voltage': createVoltageRecord(id)
          }
        });
      },

      added: function (id, fields) {
        AquinoDevices.update({_id: serial_number}, {
          $push: {
            'controls.Temperature.Voltage': createVoltageRecord(id)
          }
        });
      }
    })

  }
});

