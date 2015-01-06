
MultiplexerControl = new Mongo.Collection('MultiplexerControl');

MultiplexerControl.setChannel = function (id, data) {

  MultiplexerControl.upsert(id, data);

  Meteor.call('multiplexer:setChannel', data);
};
