import React from "react";
import TimeSelector from "../../../general/TimeSelector";

const WeekdayInterval = (props) => {
  return (
    <div>
      <span onClick={() => props.removeInterval(props.id)}>&times;</span>
      <TimeSelector
        id={props.id}
        time={props.start}
        timeHandler={props.setTime}
        startOrEnd={"start"}
      />{" "}
      -{" "}
      <TimeSelector
        id={props.id}
        time={props.end}
        timeHandler={props.setTime}
        startOrEnd={"end"}
      />
    </div>
  );
};

export default WeekdayInterval;
