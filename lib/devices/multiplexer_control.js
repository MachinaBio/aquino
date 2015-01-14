
MultiplexerControl = new Mongo.Collection('MultiplexerControl');

MultiplexerControl.setChannel = function (id, data) {

  Meteor.call('multiplexer:setChannel', {
    id: id,
    data: data
  });
};
