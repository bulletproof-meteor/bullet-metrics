Meteor.methods({
  getChartData: function(user) {
    this.unblock();
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

    //convert _id to a time
    result.forEach(function(item) {
      var dateString = item._id.month + "/" + item._id.date + "/" + item._id.year;
      dateString += " " + item._id.hour + ":" + item._id.minute + " UTC";
      var date = new Date(dateString);

      delete item._id;
      item.time = date.getTime();
    });

    return result;
  }
});