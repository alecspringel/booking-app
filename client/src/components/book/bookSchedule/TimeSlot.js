import React from "react";
import styled, { css } from "styled-components";
import { formatTime } from "../../../helpers/dateTime";

const Slot = styled.button`
  cursor: pointer;
  margin: 5px auto;
  display: block;
  font-size: 16px;
  text-align: center;
  border: 2px solid #b9b9b9;
  border-radius: 4px;
  width: 110px;
  height: 50px;
  background: transparent;

  &:hover {
    background: #b9b9b9;
  }

  ${(props) =>
    !props.available &&
    css`
      cursor: default;
      opacity: 0.2;
      &:hover {
        background: transparent;
      }
    `}
`;

const TimeSlot = (props) => {
  return (
    <Slot
      onClick={() => props.bookMeeting(props.slot.start, props.slot.end)}
      available={props.slot.available}
    >
      {props.slot.startTime}
    </Slot>
  );
};

export default TimeSlot;
