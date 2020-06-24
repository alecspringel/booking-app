import React, { Component } from "react";
import styled from "styled-components";
import TimeSlot from "./TimeSlot";

const Schedule = styled.div`
  width: 100px;
`;

class DaySchedule extends Component {
  render() {
    return (
      <Schedule>
        {this.props.schedule.map((slot) => (
          <TimeSlot slot={slot} />
        ))}
      </Schedule>
    );
  }
}

export default DaySchedule;
