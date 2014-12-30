
Meteor.subscribe('LCDScreenControl');

Template.lcd_screen.helpers({
  text: function getText () {

    var last = LCDScreenControl.findOne({}, { sort: { date: -1 }});
    var NONE_FOUND = '(None)';

    return last ? last.text : NONE_FOUND;
  }
});

Template.lcd_screen.events({
  'click button': function (e) {
    e.preventDefault();

    var $field = $(e.target).siblings('.new-text');

    var newText = $field.val();

    $field.val('');

    LCDScreenControl.setText(this._id, createData('text', newText));
  }
});
