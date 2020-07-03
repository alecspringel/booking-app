import React from "react";
import { formatMinutesToTime } from "../../../../helpers/dateTime";

const WeekdayTimes = (props) => {
  var times = [];
  props.weekdaySchedule.forEach((element) => {
    times.push(
      <h6>
        {formatMinutesToTime(element.start)} -{" "}
        {formatMinutesToTime(element.end)}
      </h6>
    );
  });
  return <div>{times}</div>;
};

export default WeekdayTimes;
