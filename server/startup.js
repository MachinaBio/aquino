Meteor.startup(function () {
  var aquinoConfig = JSON.parse(Assets.getText('aquino_config.json'));

  // Globals
  rasp2c = Meteor.npmRequire('rasp2c');
  boss = DDP.connect(aquinoConfig.boss);

  var versions = Meteor.call('loadVersions');
  var serial_number = Meteor.call('loadDeviceSerial');

  Meteor.call('considerPlatform');
  boss.call('deviceReport', serial_number, versions);
  console.log('Connected to boss', aquinoConfig.boss, 'successfully');

});

