import React, { Component } from "react";
import TimeSelector from "./TimeSelector";
import Checkbox from "./Checkbox";

class DayConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
  }
  handleStart(hour, minute, amPm) {
    this.props.setSchedule(this.props.value, "start", hour, minute, amPm);
  }

  handleEnd(hour, minute, amPm) {
    this.props.setSchedule(this.props.value, "end", hour, minute, amPm);
  }

  check() {
    this.setState({ checked: !this.state.checked }, () =>
      this.props.toggleDay(this.props.value, this.state.checked)
    );
  }

  render() {
    return (
      <div>
        <div>{this.props.day}</div>
        <Checkbox
          checked={this.state.checked}
          onClick={this.check.bind(this)}
        />
        <TimeSelector timeHandler={this.handleStart} default={"AM"} /> -{" "}
        <TimeSelector timeHandler={this.handleEnd} default={"PM"} />
      </div>
    );
  }
}

export default DayConfig;
