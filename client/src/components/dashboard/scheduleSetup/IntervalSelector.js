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

class IntervalSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: "1",
      minute: "00",
    };
    this.handleChange = this.handleChange.bind(this);
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
      if (time > 12 || time < 0) {
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

  timeHandler() {
    this.props.timeHandler(this.state.hour, parseInt(this.state.minute));
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
      </>
    );
  }
}

export default IntervalSelector;
