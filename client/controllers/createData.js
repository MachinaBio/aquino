
createData = function (name, newData) {

  var date = Date.now();
  var who = Meteor.user().profile.name;

  var data =  {
    date: date,
    who: who
  };
  data[name] = newData;

  return data;
};
