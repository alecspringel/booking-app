import React from "react";
import styled from "styled-components";
import Spinner from "../general/spinner/Spinner";

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
        props.options.map((option, i) => {
          return (
            <Schedule
              key={i}
              value={option.title}
              onClick={props.scheduleHandler}
            >
              {option.title}
            </Schedule>
          );
        })}
    </ScheduleContainer>
  );
};

export default ScheduleSelector;
