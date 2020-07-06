export function formatTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export function formatMinutesToTime(minutes) {
  var hours = Math.floor(minutes / 60);
  if (hours > 12) {
    hours = hours - 12;
  }
  // If minutes are in between 12AM - 1AM (0 - 60 minutes)
  if (minutes < 60) {
    hours = 12;
  }
  hours = hours.toString();
  var minutes = padMinutes(minutes % 60).toString();
  var AmPm = minutes > 720 ? "PM" : "AM";
  return hours + ":" + minutes + " " + AmPm;
}

export function padMinutes(timeInt) {
  var time = timeInt.toString();
  if (time.length < 2) {
    return "0" + time;
  } else {
    return time;
  }
}

export function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

export function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

export function firstOfMonthUTC(year, month) {
  const offset = new Date().getTimezoneOffset();

  var start = new Date(year, month, 1, 0, 0, 0, 0);
  start = addMinutes(start, offset * -1);
  return start;
}

export function getUTCDayName(date) {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  return weekday[date.getUTCDay()];
}

export function getDayName(date) {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  return weekday[date.getDay()];
}
