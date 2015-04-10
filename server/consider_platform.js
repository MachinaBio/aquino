Meteor.methods({

  considerPlatform: function () {
    var os = Meteor.npmRequire('os');

    console.log('Platform "' + os.platform() + '" determined');

    if (os.platform() === 'darwin') {
      rasp2c = {
        set: function (device, address, value, mode, callback) {
          // No writing to do, no devices!
          callback();
        },
        dump: function (address, range, callback) {
          // Some dummy data stub to not break things.
          callback(null, []);
        }
      };
    }

    return os.platform();
  }
});
