import React from "react";

const timeZones = [
  { short: "HST", location: "Honolulu", offset: 540 },
  { short: "AKDT", location: "Anchorage", offset: 480 },
  { short: "PDT", location: "Los Angeles", offset: 420 },
  { short: "MDT", location: "Denver", offset: 360 },
  { short: "CDT", location: "Chicago", offset: 300 },
  { short: "EDT", location: "New York", offset: 240 },
];

const TimeZoneSelector = (props) => {
  var options = [];
  var localOffset = new Date().getTimezoneOffset();

  timeZones.forEach((tz) => {
    options.push(
      <option key={tz.short} value={tz.offset}>
        {tz.short} - {tz.location}
      </option>
    );
  });

  return (
    <select defaultValue={localOffset} {...props}>
      {options}
    </select>
  );
};

export default TimeZoneSelector;
