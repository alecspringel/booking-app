import React, { Component } from "react";
import styled from "styled-components";
import TimeSlot from "./TimeSlot";
import Spinner from "../../general/spinner/Spinner";

const ScheduleContainer = styled.div`
  margin: 0 20px;
  overflow: hidden;
  width: 200px;
`;

const Schedule = styled.div`
  overflow-y: auto;
  height: 80%;
`;

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
        <p>
          {this.props.lastPicked
            ? this.props.lastPicked.toLocaleDateString("en-US", options)
            : "Select a date"}
        </p>
        <Schedule>
          {!this.props.loading &&
            this.props.lastPicked &&
            this.props.schedule.map((slot) => (
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
