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
    this.props.getEditSchedule(this.props.match.params.title);
  }
  render() {
    return (
      <div className={this.props.loading ? "fade-in hide" : "fade-in"}>
        {this.props.schedule && this.props.schedule.length !== 0 ? (
          <>
            <ScheduleDescription title={this.props.schedule.title} />
            <WeekdaySchedule />
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
