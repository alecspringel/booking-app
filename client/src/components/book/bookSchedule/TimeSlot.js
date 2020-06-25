import React from "react";
import styled, { css } from "styled-components";
import { formatTime } from "../../../helpers/dateTime";

const Slot = styled.button`
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  border: 1px solid #b9b9b9;
  width: 80px;
  height: 50px;

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
      {formatTime(new Date(props.slot.start))}
    </Slot>
  );
};

export default TimeSlot;
