import React from "react";
import styled from "styled-components";

const Selector = styled.select`
  width: 80px;
  height: 30px;
`;

const ScheduleSelector = (props) => {
  return (
    <div>
      {props.options &&
        props.options.map((option) => {
          return <button value={option}>{option}</button>;
        })}
    </div>
  );
};

export default ScheduleSelector;
