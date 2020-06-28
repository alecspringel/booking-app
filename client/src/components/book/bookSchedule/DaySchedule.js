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
      timezone: "UTC",
    };

    if (this.props.lastPicked !== null) {
      var lastPicked = this.props.lastPicked;
      lastPicked = lastPicked.toUTCString();
      // Remove last 13 characters (the time)
      lastPicked = lastPicked.substring(0, lastPicked.length - 13);
    }

    return (
      <ScheduleContainer>
        <p>{this.props.lastPicked ? lastPicked : "Select a date"}</p>
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
