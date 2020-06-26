import React from "react";
import styled from "styled-components";

const ScheduleContainer = styled.div`
  display: inline-block;
  width: 90%;
`;

const Schedule = styled.button`
  width: 100%;
  height: 30px;
  display: block;
`;

const ScheduleSelector = (props) => {
  return (
    <ScheduleContainer>
      {props.options &&
        props.options.map((option) => {
          return (
            <Schedule value={option.title} onClick={props.scheduleHandler}>
              {option.title} {option.interval}
            </Schedule>
          );
        })}
    </ScheduleContainer>
  );
};

export default ScheduleSelector;
