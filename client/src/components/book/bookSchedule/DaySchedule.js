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
          <TimeSlot
            key={slot.start}
            slot={slot}
            bookMeeting={this.props.bookMeeting}
          />
        ))}
      </Schedule>
    );
  }
}

export default DaySchedule;
