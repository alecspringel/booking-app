import React, { Component } from "react";
import styled from "styled-components";

const HourInput = styled.input`
  width: 40px;
  font-size: 20px;
`;

const AMPM = styled.select`
  width: 60px;
  height: 28px;
  font-size: 20px;
`;

class TimeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: "9",
      minute: "00",
      AmPm: "AM",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAmPm = this.handleAmPm.bind(this);
  }

  padMinutes(timeInt) {
    var time = timeInt.toString();
    if (time.length < 2) {
      return "0" + time;
    } else {
      return time;
    }
  }

  handleChange(e) {
    var time = e.target.value;
    time = parseInt(time);
    if (!Number.isInteger(time)) {
      return;
    }
    if (e.target.name === "hour") {
      if (time > 12 || time < 1) {
        return;
      } else {
        this.setState({ hour: time });
      }
    } else {
      if (time > 60 || time < 0) {
        return;
      } else {
        this.setState({ minute: this.padMinutes(time) });
      }
    }
  }

  handleAmPm(e) {
    this.setState({ AmPm: e.target.value });
    console.log(this.state);
  }

  timeHandler() {
    this.props.timeHandler(this.state.hour, this.state.minute, this.state.AmPm);
  }

  render() {
    return (
      <div>
        <HourInput
          name="hour"
          type="text"
          step="1"
          onChange={this.handleChange}
          value={this.state.hour}
        />
        <HourInput
          name="minute"
          type="text"
          onChange={this.handleChange}
          value={this.state.minute}
        />
        <AMPM onChange={this.handleAmPm}>
          <option value="AM" selected="selected">
            AM
          </option>
          <option value="PM">PM</option>
        </AMPM>
      </div>
    );
  }
}

export default TimeSelector;
