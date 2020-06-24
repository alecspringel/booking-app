import React, { Component } from "react";
import { formatDate } from "../../helpers/dateTime";

class DaySchedule extends Component {
  render() {
    return (
      <div>
        {this.props.schedule.map((slot) => (
          <div>
            {formatDate(new Date(slot.start))} -{" "}
            {formatDate(new Date(slot.end))}
          </div>
        ))}
      </div>
    );
  }
}

export default DaySchedule;
