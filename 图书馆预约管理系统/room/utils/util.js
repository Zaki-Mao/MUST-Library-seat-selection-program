//日期转换格式
function formatTime(date) {
  // date为当前时间
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':') + ' ' + hour + ' ' + minute
}
//计算明天的日期
function nextDate(date) { 
  //当前时间转为时间戳+24小时（24*60*60*1000）
  var nextdate = Date.parse(date) + 86400000
  //将处理过后的时间戳转为日期
  var nextdate = new Date(nextdate)
  var nextDay_year = nextdate.getFullYear()
  var nextDay_month = nextdate.getMonth() + 1
  var nextDay_day = nextdate.getDate()

  return [nextDay_year, nextDay_month, nextDay_day].map(formatNumber).join('-')
}
//判断用户是否被管理员拉黑
function choose_time_index(date) {
  var now = new Date();//当前日期
  var pass = new Date(date)//传来的日期
  var subtract = now - pass;
  if(subtract>=0){
    subtract = 1;
  }else{
    subtract = 0;
  }
  return subtract
}
//获取当前时间是在哪个时间段
function get_time_index() {
  var now = new Date();
  var hour = now.getHours();
  var time_index = -1;
  if(hour >= 8 && hour < 12){
    time_index = 0;
  }else if(hour >= 12 && hour < 18){
    time_index = 1;
  }else if(hour >= 18 && hour < 22){
    time_index = 2;
  }
  return time_index
}
//计算拉黑7天后的日期
function limit_date() {
  var now = new Date();
  var week = 24 * 60 * 60 * 1000;
  var limit = Date.parse(now) + week;
  limit = new Date(limit)
  var year = limit.getFullYear()
  var month = limit.getMonth() + 1
  var day = limit.getDate()
  var hour = limit.getHours()
  var minute = limit.getMinutes()
  var second = limit.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// function emoji(date, roomIdx, floorIdx, timeHour) {
//   var count = loop(date, roomIdx, floorIdx, timeHour, "count");
//   console.log(count)
//   switch (true) {
//     case count < 0.25:
//       return 3;
//       break;
//     case count < 0.5:

//       return 2;
//       break;
//     case count < 0.75:

//       return 1;
//       break;
//     case count <= 1:
//       return 0;
//       break;
//   }
// }

module.exports = {
  formatTime: formatTime,
  // emoji,
  nextDate,
  choose_time_index,
  get_time_index,
  limit_date
}

