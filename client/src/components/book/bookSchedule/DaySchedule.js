import React, { Component } from "react";
import styled from "styled-components";
import TimeSlot from "./TimeSlot";

const ScheduleContainer = styled.div`
  margin: 20px;
`;

const Schedule = styled.div``;

class DaySchedule extends Component {
  render() {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return (
      <ScheduleContainer>
        <p>{this.props.lastPicked.toLocaleDateString("en-US", options)}</p>
        <Schedule>
          {this.props.schedule.map((slot) => (
            <TimeSlot
              key={slot.start}
              slot={slot}
              bookMeeting={this.props.bookMeeting}
            />
          ))}
        </Schedule>
      </ScheduleContainer>
    );
  }
}

export default DaySchedule;
