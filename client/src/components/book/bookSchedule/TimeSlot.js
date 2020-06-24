import React from "react";
import styled from "styled-components";
import { formatTime } from "../../../helpers/dateTime";

const Slot = styled.button`
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  border: 1px solid #b9b9b9;
  padding: 5px;

  &:hover {
    background: #b9b9b9;
  }
`;

const TimeSlot = (props) => {
  return (
    <Slot>
      {formatTime(new Date(props.slot.start))} -{" "}
      {formatTime(new Date(props.slot.end))}
    </Slot>
  );
};

export default TimeSlot;
