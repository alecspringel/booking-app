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
