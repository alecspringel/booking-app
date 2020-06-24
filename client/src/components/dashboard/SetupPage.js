import React, { Component } from "react";
import { connect } from "react-redux";
import TimeSelector from "../general/TimeSelector";
import DayConfig from "../general/DayConfig";
import { createSchedule } from "../../actions/scheduleActions";

const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];

class SetupPage extends Component {
  constructor(props) {
    super(props);

    var initState = {
      0: {},
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
    };
    const start = 540;
    const end = 1260;

    WEEKDAYS.map((day) => {
      initState[day].active = false;
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
    //Convert time into minutes past midnight
    var totalMin = hour * 60 + minute;
    if (amPm === "PM") {
      totalMin += 60 * 12;
    } else {
      // 12 AM should === 0:00
      if (hour === 12) {
        totalMin -= 60 * 12;
      }
    }
    //Update start/end
    if (startEnd === "start") {
      update = {
        active: this.state[weekday].active,
        start: totalMin,
        end: this.state[weekday].end,
      };
    } else {
      update = {
        active: this.state[weekday].active,
        end: totalMin,
        start: this.state[weekday].start,
      };
    }
    this.setState({
      [weekday]: update,
    });
    console.log(this.state);
  }

  saveSchedule() {
    var newSchedule = [];
    WEEKDAYS.forEach((weekday) => {
      var day = this.state[weekday];
      if (day.active) {
        const newDay = {
          weekday,
          start: day.start,
          end: day.end,
        };
        newSchedule.push(newDay);
      }
    });
    if (newSchedule.length !== 0) {
      this.props.createSchedule(newSchedule);
    }
  }

  toggleDay(weekday, checked) {
    var day = this.state[weekday];
    day.active = checked;
    this.setState({
      [weekday]: day,
    });
  }

  render() {
    return (
      <div>
        <DayConfig
          day="Monday"
          value="0"
          setSchedule={this.setSchedule}
          toggleDay={this.toggleDay}
        />
        <DayConfig
          day="Tuesday"
          value="1"
          setSchedule={this.setSchedule}
          toggleDay={this.toggleDay}
        />
        <DayConfig
          day="Wednesday"
          value="2"
          setSchedule={this.setSchedule}
          toggleDay={this.toggleDay}
        />
        <DayConfig
          day="Thursday"
          value="3"
          setSchedule={this.setSchedule}
          toggleDay={this.toggleDay}
        />
        <DayConfig
          day="Friday"
          value="4"
          setSchedule={this.setSchedule}
          toggleDay={this.toggleDay}
        />
        <DayConfig
          day="Saturday"
          value="5"
          setSchedule={this.setSchedule}
          toggleDay={this.toggleDay}
        />
        <DayConfig
          day="Sunday"
          value="6"
          setSchedule={this.setSchedule}
          toggleDay={this.toggleDay}
        />
        <button onClick={this.saveSchedule}>Save</button>
      </div>
    );
  }
}

export default connect(null, { createSchedule })(SetupPage);
