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
    var hours = Math.floor(this.props.time / 60);
    if (hours > 12) {
      hours = hours - 12;
    }
    this.state = {
      hour: hours,
      minute: this.padMinutes(this.props.time % 60),
      AmPm: this.props.time > 720 ? "PM" : "AM",
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
    var minutes = this.state.hour * 60;
    minutes += parseInt(this.state.minute);
    if (this.state.AmPm === "PM") {
      minutes += 12 * 60;
    }
    this.props.timeHandler(this.props.id, this.props.startOrEnd, minutes);
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
          {this.state.AmPm === "AM" ? (
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
