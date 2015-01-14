
LCDScreenControl = new Mongo.Collection('LCDScreenControl');

LCDScreenControl.setText = function (id, data) {

  Meteor.call('lcd:setText', {
    id: id,
    data: data
  });
};
