GetData = function() {
  Meteor.call('getChartData', 'john@smith.com', function(err, data) {
    if(err) throw err;

    var chartData = getChartData();
    _.each(data, function(item) {
      var date = new Date(item.time);

      chartData.labels.push(date.getHours() + ":" + date.getMinutes());
      chartData.datasets[0].data.push(Math.ceil(item.heartBeat));
    });

    var ctx = $("#chart-id").get(0).getContext("2d");
    if(typeof HeartBeatChart != "undefined") {
      HeartBeatChart.destroy();
    }
    HeartBeatChart = new Chart(ctx).Line(chartData, {
      animationSteps: 1,
    });   
  });
};

function getChartData() {
  return {
    labels: [],
    datasets: [
        {
            label: "Heart Beat",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: []
        }
    ]
  };
}

Template.app.rendered = function() {
  GetData();
  setInterval(GetData, 20* 1000);
};