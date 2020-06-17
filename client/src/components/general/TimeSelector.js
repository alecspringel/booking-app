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
      AmPm: this.props.default,
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
        this.setState({ hour: time }, this.timeHandler);
      }
    } else {
      if (time > 60 || time < 0) {
        return;
      } else {
        this.setState({ minute: this.padMinutes(time) }, this.timeHandler);
      }
    }
  }

  handleAmPm(e) {
    this.setState({ AmPm: e.target.value }, this.timeHandler);
  }

  timeHandler() {
    this.props.timeHandler(
      this.state.hour,
      parseInt(this.state.minute),
      this.state.AmPm
    );
  }

  render() {
    return (
      <>
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
          {this.props.default === "AM" ? (
            <>
              <option value="AM" selected="selected">
                AM
              </option>
              <option value="PM">PM</option>
            </>
          ) : (
            <>
              <option value="AM">AM</option>
              <option value="PM" selected="selected">
                PM
              </option>
            </>
          )}
        </AMPM>
      </>
    );
  }
}

export default TimeSelector;
