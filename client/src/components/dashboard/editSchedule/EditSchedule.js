import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import WeekdaySchedule from "./WeekdaySchedule";
import ScheduleDescription from "./ScheduleDescription";
import { getEditSchedule } from "../../../actions/scheduleActions";
import Spinner from "../../general/spinner/Spinner";
import { setSchedule } from "../../../actions/scheduleActions";
import TimeZoneSelector from "../../general/TimeZoneSelector";

class EditSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekdaySchedule: [[], [], [], [], [], [], []],
      offset: new Date().getTimezoneOffset(),
    };
    this.saveSettings = this.saveSettings.bind(this);
    this.saveWeekday = this.saveWeekday.bind(this);
    this.setTimeZone = this.setTimeZone.bind(this);
    this.props.getEditSchedule(this.props.match.params.title);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.schedule !== this.props.schedule) {
      var weekdays = [[], [], [], [], [], [], []];
      if (this.props.schedule.weekdays) {
        weekdays = this.props.schedule.weekdays;
      }
      this.setState({
        //update the state after checking
        weekdaySchedule: weekdays,
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
      this.state.offset
    );
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
