Meteor.methods({

  loadVersions: function () {

    var NODE_PACKAGES = '../../../../../packages.json';
    var METEOR_PACKAGES = '../../../../versions';
    var METEOR_VERSION = '../../../../release';
    var NODE_VERSION_COMMAND = 'node --version';
    var AQUINO_VERSION_COMMAND = 'git describe --abbrev=0 --tags';

    var fs = Meteor.npmRequire('fs');
    var semver = Meteor.npmRequire('semver');
    var execSync = Meteor.wrapAsync(Meteor.npmRequire('child_process').exec);

    var currentNodePackages = fs.readFileSync(NODE_PACKAGES, 'utf8');
    var currentMeteorPackages = fs.readFileSync(METEOR_PACKAGES, 'utf8');
    var currentMeteorVersion = fs.readFileSync(METEOR_VERSION, 'utf8');
    var currentNodeVersion = semver.clean(execSync(NODE_VERSION_COMMAND));
    var currentAquinoVersion = semver.clean(execSync(AQUINO_VERSION_COMMAND));

    currentNodePackages = JSON.parse(currentNodePackages);
    currentMeteorVersion = currentMeteorVersion.replace('\n', '').split('@');
    currentMeteorPackages = currentMeteorPackages.split('\n');
    // Meteor package list requires a little extra massaging
    if (currentMeteorPackages[currentMeteorPackages.length - 1] === '') {
      currentMeteorPackages.pop();
    }

    var versions = {
      'nodePackages': currentNodePackages,
      'meteorPackages': {},
      'meteor': currentMeteorVersion[1],
      'node': currentNodeVersion,
      'aquino': currentAquinoVersion
    };
    _.each(currentMeteorPackages, function splitOnAtSymbol (element) {
      var packageArray = element.split('@');

      versions.meteorPackages[packageArray[0]] = packageArray[1];
    });

    return versions;
  }
});
