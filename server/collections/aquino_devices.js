Meteor.methods({

  subscribeToControlData: function () {

    function startControllerPolling () {

      // Get most recent temperature measurement
      //var temperature = Meteor.call('getLatestTemperature');

      // Update controller with current temp
      //var correction = controller.update(temperature);

      //TODO: Move this into the voltage updating function
      // Set controller results within bounds of 0-4
      //if (correction < 0) { correction = 0; }
      //if (correction > 4) { correction = 4; }

      // Update voltage
      //Meteor.call('setVoltage', correction);

      // Recurse
      if (pollingTimer) { Meteor.clearTimeout(pollingTimer); }

      pollingTimer = Meteor.setTimeout(startControllerPolling, 1000);
      console.log(pollingTimer);
      return pollingTimer;
    }

    function setInitialTarget (fields) {
      var latest = fields.controls.Temperature.Setpoints.length - 1;
      console.log(fields.controls.Temperature.Setpoints[latest].value);

      controller.setTarget(latest);

      pollingTimer = startControllerPolling();
    }

    var PIDController = Meteor.npmRequire('node-pid-controller');
    var controller = new PIDController(0.0025, 0.01, 0.01);
    var pollingTimer;

    boss.subscribe('SingleDevice', serial_number);
    AquinoDevices = new Mongo.Collection('AquinoDevices', {
      connection: boss
    });

    AquinoDevices.find().observeChanges({
      changed: function (id, fields) {
        setInitialTarget(fields);
      },

      added: function (id, fields) {
        setInitialTarget(fields);
      }
    });

  }
});

