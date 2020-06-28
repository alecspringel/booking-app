import React, { Component } from "react";
import { connect } from "react-redux";
import TimeSelector from "../general/TimeSelector";
import DayConfig from "../general/DayConfig";
import { createSchedule } from "../../actions/scheduleActions";
import { addMinutes } from "../../helpers/dateTime";

class ScheduleMaker extends Component {
  constructor(props) {
    super(props);
    this.send = this.send.bind(this);
  }
  send() {
    this.props.createSchedule("test", [
      {
        available: true,
        start: new Date(),
        end: addMinutes(new Date(), 60),
      },
    ]);
  }
  render() {
    return (
      <div>
        <button onClick={this.send}>test</button>
      </div>
    );
  }
}
export default connect(null, { createSchedule })(ScheduleMaker);
