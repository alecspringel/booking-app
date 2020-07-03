import React, { Component } from "react";
import styled from "styled-components";
import Modal from "../../general/Modal";
import WeekdayInterval from "./parts/WeekdayInterval";

class WeekdayModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervals: [],
      id: 0,
    };
    this.addInterval = this.addInterval.bind(this);
    this.removeInterval = this.removeInterval.bind(this);
    this.setTime = this.setTime.bind(this);
  }

  addInterval() {
    var current = this.state.intervals;
    const interval = {
      id: this.state.id,
      start: 540,
      end: 1020,
    };
    current.push(interval);
    this.setState({ intervals: current, id: this.state.id + 1 });
    console.log(this.state);
  }

  removeInterval(id) {
    console.log("removing", id);
    var update = this.state.intervals;
    var update = update.filter((interval) => interval.id !== id);
    var shifted = [];
    this.setState({ intervals: update }, console.log(this.state));
  }

  setTime(id, startOrEnd, time) {
    var update = this.state.intervals.filter((interval) => interval.id !== id);
    var index = 0;
    const selected = this.state.intervals.find((interval, i) => {
      if (interval.id === id) {
        index = i;
        return interval;
      }
    });
    if (startOrEnd === "start") {
      selected.start = time;
    } else {
      selected.end = time;
    }
    update.splice(index, 0, selected);
    this.setState({ intervals: update });
  }

  render() {
    var timeSelectors = [];
    this.state.intervals.forEach((interval) => {
      timeSelectors.push(
        <WeekdayInterval
          id={interval.id}
          key={interval.id}
          removeInterval={this.removeInterval}
          start={interval.start}
          end={interval.end}
          setTime={this.setTime}
        />
      );
    });
    return (
      <Modal
        content={
          <>
            <h3>{this.props.weekday}</h3>
            <Exit onClick={this.props.close}>&times;</Exit>
            {timeSelectors}
            <button onClick={this.addInterval}>+ Availability</button>
          </>
        }
      />
    );
  }
}

export default WeekdayModal;

const Exit = styled.span`
  position: absolute;
  cursor: pointer;
  top: 8px;
  right: 27px;
  font-size: 36px;
  font-weight: 500;
  opacity: 0.6;
  &:hover {
    opacity: 0.9;
  }
`;
