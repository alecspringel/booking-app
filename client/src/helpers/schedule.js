// Takes list of slot objects (start, end, available) and converts

const { addMinutes, formatTime } = require("./dateTime");

// them to the given timezone
export function createTimes(validSlots, offset) {
  var timeList = [];
  var defaultOffset = new Date().getTimezoneOffset();
  validSlots.forEach((slot) => {
    console.log("test", new Date(slot.start).toUTCString());
    const time = {
      available: slot.available,
      start: formatTime(
        addMinutes(addMinutes(new Date(slot.start), defaultOffset), -1 * offset)
      ),
      end: formatTime(
        addMinutes(addMinutes(new Date(slot.end), defaultOffset), -1 * offset)
      ),
    };
    timeList.push(time);
  });
  return timeList;
}
