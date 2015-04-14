Aquino
==========

The Meteor app running on the Raspberry Pi.

## Setting up the Pi

1. After imaging the hard disk the Pi will use (SD card or internal compute module storage), boot into the Pi locally, rather than over the network.  You're likely to encounter the `raspi-config` screen, but if not go ahead and `sudo raspi-config`.
2. In the setup menu, set the internationalization options to en-US.UTF8, set the right keyboard layout, enable I2C, overclock the device to "Turbo", and finally expand the filesystem.  When all that is done, choose "Finish" and reboot the pi.
3. Login with the default credentials: "pi", and "raspberry".  Go ahead and create a common user account here.  Using "machina" as an example: `sudo adduser machina`.  Choose sensible defaults.
4. Add your new user to the /etc/sudoers file with `sudo visudo`, and then give your new user the appropriate permissions (copying what root has and changing the name usually suffices).
5. Logout of the current user, and login to your newly create user.
6. Remove the default user: `sudo deluser pi`.
7. Change the locale and keyboard settings to be whichever are relevant to you in the config: `sudo raspi-config`
8. Add your Pi to a wifi network if appropriate.  You can find instructions on how to do this elsewhere online.
13. If you're not already running Debian Jessie or newer, go ahead and add the repos by creating a `/etc/apt/sources.list.d/jessie.list` file and adding the following line to it: `deb http://mirrordirector.raspbian.org/raspbian/ jessie main contrib non-free rpi`
14. Update the packages: `sudo apt-get update`.
15. Install relevant packages: `sudo apt-get install build-essential debian-keyring autoconf automake libtool flex bison mongodb`
16. Make sure `gcc --version` reports at least 4.9.x or newer.  If not, you'll need to get it.
17. Change up to the root user: `sudo su -`
19. Pull down and compile node.js.  We've tested against 0.10.36 so far.  This'll take some time.
```
cd /tmp
git clone https://github.com/joyent/node.git
cd node
git checkout v0.10.36
./configure --without-snapshot
make
make install
```
20. Make sure the versions of node and npm installed correctly: `node --version` and `npm --version`
21. Pull down Meteor, and build it:
```
cd /usr/local/lib
git clone https://github.com/4commerce-technologies-AG/meteor.git
cd meteor
./scripts/generate-dev-bundle.sh
ln -s /usr/local/lib/meteor/meteor /usr/local/bin/meteor
chmod -R a+wx .
```
24. Fire up meteor initially to finish setting it up: `./meteor --version`
27. Change the owner and group of /opt and children to your user, e.g. `sudo chown -R machina:machina /opt`
26. Clone this repo into /opt/aquino: `git clone https://github.com/MachinaBio/aquino.git`
29. Meteor needs to know what url from which to serve itself.  [This code will set with the $ROOT_URL shell variable.](https://github.com/StrictlySkyler/utility_scripts/blob/master/linux/export_address.sh)  It's usually worth putting the code which does this into a script in ~/bin, and then sourcing it, but it could also just go right into your .zshrc or .bashrc.
