Meteor.methods({
  determineStatus: function () {

    var jobs = Jobs.find().fetch().length;
    var READY = 'Ready';

    if (jobs === 0) { return READY; }

    return Jobs.find({}, {
      sort: { date: -1 },
      limit: 1
    });
  }
})
