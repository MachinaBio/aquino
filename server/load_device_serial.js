Meteor.methods({

  loadDeviceSerial: function () {
    var DEVICE_SERIAL_COMMAND = 'cat /proc/cpuinfo|grep Serial|cut -d ":" -f2';

    var execSync = Meteor.wrapAsync(Meteor.npmRequire('child_process').exec);

    var serial_number = execSync(DEVICE_SERIAL_COMMAND)
      .replace(' ', '')
      .replace('\n', '')
      ;

    return serial_number;
  }
});
