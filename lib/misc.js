GetHour = function(date) {
  var srcTime = date.getTime();
  var hourMillis = 1000 * 60 * 60;
  var diffFromNow = srcTime % hourMillis;
  var hourTime = new Date(srcTime - diffFromNow);

  return hourTime;
}