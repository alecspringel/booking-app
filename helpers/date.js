function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function subMinutes(date, minutes) {
  return new Date(date.getTime() - minutes * 60000);
}

module.exports = { addMinutes };
