GetData = function() {
  Meteor.call('getChartData', 'jhon@smith.com', function(err, data) {
    if(err) throw err;
    console.log("data: ", data);
  });
};