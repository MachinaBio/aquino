
LCDScreenControl = new Mongo.Collection('LCDScreenControl');

LCDScreenControl.setText = function (id, data) {

  LCDScreenControl.upsert(id, data);

  Meteor.call('lcd:setText', data);
};
