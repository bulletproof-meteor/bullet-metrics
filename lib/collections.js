Metrics = new Mongo.Collection('metrics');
if(Meteor.isServer) {
  Metrics._ensureIndex({user: 1, time: -1});
}