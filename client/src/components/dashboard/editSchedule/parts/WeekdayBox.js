import React from "react";
import styled, { css } from "styled-components";
import WeekdayTimes from "./WeekdayTimes";

const WeekdayBox = (props) => {
  return (
    <Weekday
      active={props.weekdaySchedule[props.weekday].length !== 0}
      onClick={() => props.toggleModal(props.weekday, props.weekdayName)}
    >
      <Label active={props.weekdaySchedule[props.weekday].length !== 0}>
        <p>{props.weekdayName}</p>
      </Label>
      <WeekdayTimes weekdaySchedule={props.weekdaySchedule[props.weekday]} />
    </Weekday>
  );
};

const Weekday = styled.div`
  height: 100px;
  border: 1px solid #d5d5d5;
  position: relative;

  &:hover {
    outline: 1px solid ${(props) => props.theme.primary};
  }

  ${(props) =>
    props.active &&
    css`
      border: 1px solid ${props.theme.primary};
    `}
`;

const Label = styled.div`
  width: 100%;
  background: #d5d5d5;
  color: white;
  padding: 2px 0;
  ${(props) =>
    props.active &&
    css`
      background: ${props.theme.primary};
    `}
`;

export default WeekdayBox;
