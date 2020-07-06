import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import WeekdaySchedule from "./WeekdaySchedule";
import ScheduleDescription from "./ScheduleDescription";
import { getEditSchedule } from "../../../actions/scheduleActions";
import Spinner from "../../general/spinner/Spinner";
import { setSchedule } from "../../../actions/scheduleActions";
import TimeZoneSelector from "../../general/TimeZoneSelector";
import CustomSchedule from "./CustomSchedule";

class EditSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekdaySchedule: [[], [], [], [], [], [], []],
      offset: new Date().getTimezoneOffset(),
      customDays: [],
    };
    this.saveSettings = this.saveSettings.bind(this);
    this.saveWeekday = this.saveWeekday.bind(this);
    this.saveCustomDay = this.saveCustomDay.bind(this);
    this.setTimeZone = this.setTimeZone.bind(this);
    this.props.getEditSchedule(this.props.match.params.title);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.schedule !== this.props.schedule) {
      var weekdays = [[], [], [], [], [], [], []];
      var custom = [];
      if (this.props.schedule.weekdays) {
        weekdays = this.props.schedule.weekdays;
      }
      if (this.props.schedule.cusom) {
        custom = this.props.schedule.custom;
      }
      this.setState({
        //update the state after checking
        weekdaySchedule: weekdays,
        customDays: custom,
      });
    }
  }

  setTimeZone(e) {
    this.setState({ offset: e.target.value });
  }

  saveSettings() {
    this.props.setSchedule(
      this.props.match.params.title,
      this.state.weekdaySchedule,
      this.state.customDays,
      this.state.offset
    );
  }

  saveCustomDay(customDay) {
    var found = this.state.customDays.find((day, index) => {
      if (day.start.toISOString() === customDay.start.toISOString()) {
        var customList = this.state.customDays;
        // replace with new day
        customList[index] = customDay;
        this.setState({
          customeDays: customList,
        });
        return true;
      }
    });
    if (!found) {
      var customList = this.state.customDays;
      customList.push(customDay);
      this.setState({ customDays: customList });
    }
  }

  saveWeekday(weekday, intervals) {
    console.log(weekday, intervals);
    var schedule = this.state.weekdaySchedule;
    schedule[weekday] = intervals;
    this.setState(
      { weekdaySchedule: schedule },
      console.log("SET:", this.state)
    );
  }

  render() {
    return (
      <div className={this.props.loading ? "fade-in hide" : "fade-in"}>
        {this.props.schedule && this.props.schedule.length !== 0 ? (
          <>
            <ScheduleDescription title={this.props.schedule.title} />
            <TimeZoneSelector onChange={this.setTimeZone} />
            <WeekdaySchedule
              saveWeekday={this.saveWeekday}
              weekdaySchedule={this.state.weekdaySchedule}
            />
            <CustomSchedule
              customDays={this.state.customDays}
              saveCustomDay={this.saveCustomDay}
              offset={this.state.offset}
              weekdaySchedule={this.state.weekdaySchedule}
            />
            <button onClick={this.saveSettings}>Save</button>
          </>
        ) : (
          <h1>Not found</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  schedule: state.schedule.edit,
  loading: state.schedule.loading,
});

export default connect(mapStateToProps, { getEditSchedule, setSchedule })(
  EditSchedule
);
