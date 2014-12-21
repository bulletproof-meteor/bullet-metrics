if(Meteor.isServer) {
  // get the node mongodb driver and the connect function
  var connect = MongoInternals.NpmModule.MongoClient.connect;
  // make it fiber aware
  connect = Meteor.wrapAsync(connect);

  // connecting to the our new db
  var db = connect(process.env.MONGO_METRICS_URL);
  // creating the collection
  Metrics = db.collection('metrics');

  // make following methods in the collection fiber aware
  // so, we can use the exisiting codebase
  Metrics.aggregate = Meteor.wrapAsync(Metrics.aggregate, Metrics);
  Metrics.insert = Meteor.wrapAsync(Metrics.insert, Metrics);
  Metrics.ensureIndex = Meteor.wrapAsync(Metrics.ensureIndex, Metrics);
  Metrics.update = Meteor.wrapAsync(Metrics.update, Metrics);
  Metrics.findOne = Meteor.wrapAsync(Metrics.findOne, Metrics);

  // ensure indexing
  Metrics.ensureIndex({user: 1, time: -1})
}

GetHour = function(date) {
  var srcTime = date.getTime();
  var hourMillis = 1000 * 60 * 60;
  var diffFromNow = srcTime % hourMillis;
  var hourTime = new Date(srcTime - diffFromNow);

  return hourTime;
}