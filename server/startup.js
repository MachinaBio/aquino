Meteor.startup(function () {
  function setReconnectTimestamp () {
    console.log('Reconnecting to boss', aquinoConfig.boss);
    boss.call('deviceUpdateTimestamp', serial_number);
  }

  var aquinoConfig = JSON.parse(Assets.getText('aquino_config.json'));

  // Globals
  rasp2c = Meteor.npmRequire('rasp2c');
  boss = DDP.connect(aquinoConfig.boss);
  serial_number = Meteor.call('loadDeviceSerial');

  var versions = Meteor.call('loadVersions');
  var status = Meteor.call('determineStatus');
  var jobs = Jobs.find().fetch();
  var devices = Devices.find().fetch();

  Meteor.call('considerPlatform');
  boss.call('deviceReport', serial_number, versions, jobs, devices);
  boss.call('deviceStatus', serial_number, status);
  boss.call('deviceUpdateTimestamp', serial_number);
  console.log('Connected to boss', aquinoConfig.boss, 'successfully');

  boss.onReconnect = setReconnectTimestamp;

});

