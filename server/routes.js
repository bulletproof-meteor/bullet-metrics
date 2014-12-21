Picker.route('/data/', function(params, req, res) {
  var query = params.query || {};
  var heartBeat = parseInt(query.heartBeat);
  var user = query.user;

  var now = new Date();
  var hourTime = GetHour(now);
  
  var selector = {
    hour: hourTime,
    user: user
  };

  var minute = now.getUTCMinutes();
  var modifier = {
    $inc: {
      hourSum: heartBeat,
      hourSamples: 1
    }
  };
  modifier["$inc"]["perMinSum." + minute] = heartBeat;
  modifier["$inc"]["perMinSamples." + minute] = 1;

  Metrics.update(selector, modifier, {upsert: true});
  res.end("okay");
});

// var query = params.query || {};
// var doc = {
//   time: new Date(),
//   user: query.user,
//   heartBeat: parseInt(query.heartBeat)
// };

// Metrics.insert(doc);