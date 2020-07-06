import React from "react";
import styled from "styled-components";
import { addMinutes, getUTCDayName } from "../../../../helpers/dateTime";
import WeekdayTimes from "./WeekdayTimes";

// Takes in a true date (in UTC form) and renders out the entire week starting from Monday
const CustomWeek = (props) => {
  var renderWeek = [];
  var startDate = props.date;
  var offset = parseInt(props.offset);
  console.log(startDate.toUTCString());

  var weekday = startDate.getUTCDay();
  console.log(weekday);
  // Start at beginning of week (Monday)
  while (weekday != 1) {
    startDate = addMinutes(startDate, -1440);
    weekday = startDate.getUTCDay();
  }
  // Count back up to Saturday, and push into array for rendering
  while (weekday != 0) {
    renderWeek.push(startDate);
    startDate = addMinutes(startDate, 1440);
    weekday = startDate.getUTCDay();
  }
  // Push the last day (Sunday === 0)
  renderWeek.push(startDate);

  console.log(props.customDays);
  console.log(props.weekdaySchedule[2]);
  return (
    <>
      {renderWeek.map((day) => {
        var trueDate = new Date(
          Date.UTC(
            day.getUTCFullYear(),
            day.getUTCMonth(),
            day.getUTCDate(),
            0,
            0,
            0,
            0
          )
        );

        var custom = props.customDays.find(
          (day) => day.start.toISOString() === trueDate.toISOString()
        );
        if (custom) {
          custom = custom.intervals;
        } else {
          custom = props.weekdaySchedule[day.getUTCDay()];
        }
        console.log(custom);

        return (
          <Day onClick={() => props.toggleCustomModal(trueDate)}>
            <Header>
              <Weekday>{getUTCDayName(day)}</Weekday>
              <DateNum>{day.getUTCDate()}</DateNum>
            </Header>
            <WeekdayTimes weekdaySchedule={custom} />
          </Day>
        );
      })}
    </>
  );
};
export default CustomWeek;

const Day = styled.div`
  border: 1px solid #707070;
`;

const Header = styled.div`
  position: relative;
`;

const Weekday = styled.p`
  display: inline;
`;

const DateNum = styled.p`
  display: inline;
  position: absolute;
  right: 5px;
`;
