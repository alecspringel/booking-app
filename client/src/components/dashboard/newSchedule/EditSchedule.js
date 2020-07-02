import React, { Component } from "react";
import styled from "styled-components";

export default class EditSchedule extends Component {
  render() {
    return (
      <WeekGrid>
        <Weekday></Weekday>
        <Weekday></Weekday>
        <Weekday></Weekday>
        <Weekday></Weekday>
        <Weekday></Weekday>
        <Weekday></Weekday>
        <Weekday></Weekday>
      </WeekGrid>
    );
  }
}

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 30px;
`;

const Weekday = styled.div`
  height: 100px;
  border: 1px solid black;
`;
