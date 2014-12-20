Meteor.methods({
  getChartData: function(user) {
    var hourMillis = 1000 * 60 * 60;
    var beforeOneHour = new Date(Date.now() - hourMillis);
    var pipes = [
      {$match: {
        user: user,
        time: {$gt: beforeOneHour}
      }},
      {$group: {
        _id: {
          year: {$year: "$time"},
          month: {$month: "$time"},
          date: {$dayOfMonth: "$time"},
          hour: {$hour: "$time"}, 
          minute: {$minute: "$time"}
        },
        heartBeat: {$avg: "$heartBeat"}
      }},
      {$sort: {"_id.hour": 1, "_id.minute": 1}}
    ];

    var result = Metrics.aggregate(pipes);
    return result;
  }
});