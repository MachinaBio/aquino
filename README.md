machina-pi
==========

The Meteor app running on the Raspberry Pi.

## Setting up the Pi

Follow these opinionated steps to get a fully functional environment up and running on your Pi.  This covers everything from Meteor to diagnositcs such as Splunk and NewRelic, and local things that make life easier, such as .vimrc, ohmyzsh, and environment.

1. After imaging the hard disk the Pi will use (SD card or internal compute module storage), boot into the Pi locally, rather than over the network.  You're likely to encounter the `raspi-config` screen, but if not go ahead and `sudo raspi-config`.
2. Choose "Expand Filesystem", then "Finish", and reboot.
3. Login with the default credentials: "pi", and "raspberry".  Go ahead and create a common user account here.  Using "machina" as an example: `sudo adduser machina`.  Choose sensible defaults.
4. Add your new user to the /etc/sudoers file with `sudo visudo`, and then give your new user the appropriate permissions (copying what root has and changing the name usually suffices).
5. Logout of the current user, and login to your newly create user.
6. Remove the default user: `sudo deluser pi`.
7. Change the locale and keyboard settings to be whichever are relevant to you in the config: `sudo raspi-config`
8. Add your Pi to a wifi network if appropriate.  You can find instructions on how to do this elsewhere online.
9. _[Optional]_ Login to the Pi via ssh, and install mosh: `sudo apt-get install mosh`.  Once it's installed, logout, and log back in using mosh instead, e.g.: `mosh machina@192.168.1.115`.
10. _[Optional]_ Install zsh, and then ohmyzsh: `sudo apt-get install zsh`, and then `curl -L http://install.ohmyz.sh | sh`.  If ohmyzsh doesn't succeed at setting zsh as the default, do it yourself: `chsh -s /usr/bin/zsh`.
11. _[Optional]_ Install SCM Breeze: `git clone git://github.com/ndbroadbent/scm_breeze.git ~/.scm_breeze` and then `~/.scm_breeze/install.sh`. You may also need hub for this: https://hub.github.com/
12. _[Optional]_ Add any appropriate dotfiles to your home folder, along with any utility apps you commonly use.  Vim 7.4 is a good one.  Set your default editor, also, if you prefer.  Some dotfile suggestions: https://github.com/StrictlySkyler/dotfiles (You'll need to modify them to suit your username, desired plugins, etc.  These may require you to install some things, such as vimogen plugins, antigen, etc.  All good stuff, and will make your life easier.)
13. You may need to set the proper locales, as it's often wrong: http://www.ardupi.com/2013/01/raspberry-pi-raspbian-locale-settings.html
14. Log out and back in.
15. Download precompiled mongodb binaries for your Pi: `wget http://www.widriksson.com/wp-content/uploads/2014/02/mongodb-rpi_20140207.zip`
16. Extract it `unzip mongodb-rpi_20140207.zip` and go to where the binaries live `cd mongodb-rpi/mongo/bin`
17. Move the mongodb binaries to a more sensible place: `sudo mkdir -p /opt/mongo` and `sudo cp * /opt/mongo` then `sudo chmod -R 755 /opt/mongo`
18. Add /opt/mongo to your $PATH if they aren't already.
19. Pull down the latest node.js source: `wget http://nodejs.org/dist/v0.10.36/node-v0.10.36.tar.gz` and extract it `tar xvf node-v0.10.36.tar.gz`
20. Go into the node directory extracted, and then `./configure`, then `make`, and `sudo make install`.  This will take some time, so go get a beverage.
21. Pull down Meteor for your Pi: `git clone https://github.com/4commerce-technologies-AG/meteor.git`
22. Right now, only Meteor 1.0.0 has been verified as working on a Pi, so checkout the appropriate branch in the repo: `git checkout release-1.0-universal`
23. Generate the requisite bundle for Meteor from within the repo root: `./scripts/generate-dev-bundle.sh`
24. Fire up meteor initially to finish setting it up: `./meteor --help`
25. Move the meteor repo to /opt/meteor, and make sure it's in your path.
26. Clone this repo into /opt/machina-pi.
27. Change the owner and group of /opt and children to your user, e.g. `sudo chown -R machina:machina /opt`
28. Add a symlink in /usr/bin for meteor: `sudo ln -s /opt/meteor/meteor /usr/bin/meteor`.  Do the same for mongo, mongod, mongodump, and bsondump.
29. Meteor needs to know what url from which to serve itself.  [This code will set with the $ROOT_URL shell variable.](https://github.com/StrictlySkyler/utility_scripts/blob/master/linux/export_address.sh)  It's usually worth putting the code which does this into a script in ~/bin, and then sourcing it, but it could also just go right into your .zshrc or .bashrc.
