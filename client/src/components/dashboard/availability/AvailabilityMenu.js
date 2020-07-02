import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getAllSchedules } from "../../../actions/scheduleActions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

class AvailabilityMenu extends Component {
  constructor(props) {
    super(props);
    this.props.getAllSchedules();
  }
  render() {
    return (
      <div>
        <Link to={`/dashboard/newSchedule`}>+ New Appointment Type</Link>
        {this.props.scheduleList &&
          this.props.scheduleList.map((schedule) => (
            <ScheduleItem>
              <h6>{schedule}</h6>
            </ScheduleItem>
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  scheduleList: state.schedule.all,
});

export default connect(mapStateToProps, { getAllSchedules })(AvailabilityMenu);

const ScheduleItem = styled.div`
  border: 1px solid grey;
`;
