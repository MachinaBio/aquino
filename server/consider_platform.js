Meteor.methods({

  considerPlatform: function () {
    var os = Meteor.npmRequire('os');

    console.log('Platform "' + os.platform() + '" determined');

    return os.platform();
  }
});
