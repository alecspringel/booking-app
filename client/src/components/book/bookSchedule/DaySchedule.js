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
        <p>{this.props.lastPicked.toLocaleDateString("en-US", options)}</p>
        <Schedule>
          {!this.props.loading ? (
            this.props.schedule.map((slot) => (
              <TimeSlot
                key={slot.start}
                slot={slot}
                bookMeeting={this.props.bookMeeting}
              />
            ))
          ) : (
            <Spinner
              size={20}
              thickness={2}
              duration={"0.5s"}
              color={"#3b73ff"}
            />
          )}
        </Schedule>
      </ScheduleContainer>
    );
  }
}

export default DaySchedule;
