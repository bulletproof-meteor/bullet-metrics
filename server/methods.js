Meteor.methods({
  getChartData: function(user) {
    this.unblock();
    var hourMillis = 1000 * 60 * 60;
    var thisHour = GetHour(new Date());
    var lastHour = new Date(thisHour.getTime() - hourMillis);
    
    var results = [];

    var thisHourDoc = Metrics.findOne({user: user, hour: thisHour});
    var lastHourDoc = Metrics.findOne({user: user, hour: lastHour});
    fillIntoResults(results, thisHourDoc, thisHour);
    fillIntoResults(results, lastHourDoc, lastHour);

    results.sort(function(a, b) {
      return a.time - b.time;
    });

    return _.last(results, 60);
  }
});


function fillIntoResults (results, doc, hour) {
  if(doc && doc.perMinSum) {
    _.each(doc.perMinSum, function(sum, minute) {
      var samples = doc.perMinSamples[minute];
      var avg = sum/samples;
      results.push({
        time: hour.getTime() + (minute * 1000 * 60),
        heartBeat: avg
      });
    });
  }
}