Picker.route('/data/', function(params, req, res) {
  var query = params.query || {};
  var doc = {
    time: new Date(),
    user: query.user,
    heartBeat: parseInt(query.heartBeat)
  };

  Metrics.insert(doc);
  res.end("okay");
});