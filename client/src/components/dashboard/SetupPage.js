import React, { Component } from "react";
import TimeSelector from "../general/TimeSelector";
import DayConfig from "../general/DayConfig";

class SetupPage extends Component {
  constructor(props) {
    super(props);
    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    var initState = {
      Monday: { available: false },
      Tuesday: { available: false },
      Wednesday: { available: false },
      Thursday: { available: false },
      Friday: { available: false },
      Saturday: { available: false },
      Sunday: { available: false },
    };
    const start = {
      hour: 9,
      minute: 0,
      amPm: "AM",
    };
    const end = {
      hour: 9,
      minute: 0,
      amPm: "AM",
    };
    weekdays.map((day) => {
      initState[day].start = start;
      initState[day].end = end;
    });
    this.state = initState;
    this.toggleDay = this.toggleDay.bind(this);
    this.setSchedule = this.setSchedule.bind(this);
    this.saveSchedule = this.saveSchedule.bind(this);
  }

  setSchedule(weekday, startEnd, hour, minute, amPm) {
    console.log(weekday, startEnd, hour, minute, amPm);
    var update = null;
    if (startEnd === "start") {
      update = {
        start: {
          hour,
          minute,
          amPm,
        },
        end: this.state[weekday].end,
      };
    } else {
      update = {
        end: {
          hour,
          minute,
          amPm,
        },
        start: this.state[weekday].start,
      };
    }

    this.setState({
      [weekday]: update,
    });
    console.log(this.state);
  }

  saveSchedule() {
    console.log(this.state);
  }

  toggleDay(weekday, checked) {
    var day = this.state[weekday];
    day.available = checked;
    this.setState({
      [weekday]: day,
    });
  }

  render() {
    return (
      <div>
        <DayConfig
          day="Monday"
          setSchedule={this.setSchedule}
          toggleDay={this.toggleDay}
        />
        <DayConfig
          day="Tuesday"
          setSchedule={this.setSchedule}
          toggleDay={this.toggleDay}
        />
        <DayConfig
          day="Wednesday"
          setSchedule={this.setSchedule}
          toggleDay={this.toggleDay}
        />
        <DayConfig
          day="Thursday"
          setSchedule={this.setSchedule}
          toggleDay={this.toggleDay}
        />
        <DayConfig
          day="Friday"
          setSchedule={this.setSchedule}
          toggleDay={this.toggleDay}
        />
        <DayConfig
          day="Saturday"
          setSchedule={this.setSchedule}
          toggleDay={this.toggleDay}
        />
        <DayConfig
          day="Sunday"
          setSchedule={this.setSchedule}
          toggleDay={this.toggleDay}
        />
        <button onClick={this.saveSchedule}>Save</button>
      </div>
    );
  }
}

export default SetupPage;
