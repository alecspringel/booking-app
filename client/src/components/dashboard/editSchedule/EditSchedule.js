import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import WeekdaySchedule from "./WeekdaySchedule";
import ScheduleDescription from "./ScheduleDescription";
import { getEditSchedule } from "../../../actions/scheduleActions";
import Spinner from "../../general/spinner/Spinner";

class EditSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekdaySchedule: [[], [], [], [], [], [], []],
    };
    this.saveWeekday = this.saveWeekday.bind(this);
    this.props.getEditSchedule(this.props.match.params.title);
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
            <WeekdaySchedule
              saveWeekday={this.saveWeekday}
              weekdaySchedule={this.state.weekdaySchedule}
            />
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

export default connect(mapStateToProps, { getEditSchedule })(EditSchedule);
