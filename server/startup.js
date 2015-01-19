Meteor.startup(function () {

  var os = Meteor.npmRequire('os');
  rasp2c = Meteor.npmRequire('rasp2c');

  if (os.platform() === 'darwin') {
    rasp2c = {
      set: function (device, address, value, callback) {
        // No writing to do, no devices!
        callback();
      },
      dump: function (address, range, callback) {
        callback();
      }
    };
  }

});
