function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function subMinutes(date, minutes) {
  return new Date(date.getTime() - minutes * 60000);
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

module.exports = { addMinutes, daysInMonth, Date };
