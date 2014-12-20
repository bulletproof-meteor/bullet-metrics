var http = require('http');
var format = require('util').format;

var PORT = parseInt(process.argv[2]) || 3000;
var RPS = parseInt(process.argv[3]) || 50;
var currentRequests = 0;

sendRequest();
function sendRequest () {
  if(RPS - currentRequests > 0) {
    var path = format("/data?user=%s&heartBeat=%s", genUser(), getHeartBeat());
    var options = {
      hostname: "localhost",
      port: PORT,
      path: path,
      agent: false
    };
    currentRequests++;
    http.get(options, function(res) {
      if(res.statusCode == 200) {
        sendRequest();      
      } else {
        throw new Error("invalida status code: " + res.statusCode);
      }
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
      throw e;
    });
  } else {
    setTimeout(sendRequest, 100);
  }
}

function genUser() {
  var userId = Math.ceil(Math.random() * RPS);
  if(userId == Math.ceil(RPS/2) + 2) {
    return 'john@smith.com';
  } else {
    return 'user_' + userId + '@email.com';
  }
}

function getHeartBeat() {
  var low = 80;
  var high = 120;
  return low + Math.floor(Math.random() * (high - low));
}

setInterval(function() {
  console.log("sent:", currentRequests, "requests/sec");
  currentRequests = 0;
}, 1000);