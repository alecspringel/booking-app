import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getAllSchedules } from "../../../actions/scheduleActions";
import { BrowserRouter as Router, Link } from "react-router-dom";
import SecondaryButton from "../../general/SecondaryButton";
import LinkButton from "../../general/LinkButton";

class AvailabilityMenu extends Component {
  constructor(props) {
    super(props);
    this.props.getAllSchedules();
  }

  editSchedule(title) {
    const path = "/dashboard/schedule/edit/" + title;
    this.props.history.push({
      pathname: path,
      state: { title },
    });
  }

  render() {
    return (
      <div>
        <TopBar>
          <h2>Availability</h2>
          <NewScheduleButton
            path={`/dashboard/schedule/create`}
            label={"+ New Schedule"}
          />
        </TopBar>
        {this.props.scheduleList &&
          this.props.scheduleList.map((schedule) => (
            <ScheduleItem onClick={() => this.editSchedule(schedule)}>
              <h3>{schedule}</h3>
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

const TopBar = styled.div`
  position: relative;
  margin: 20px 0;
`;

const ScheduleItem = styled.div`
  cursor: pointer;
  border: 1px solid #d5d5d5;
  padding: 10px;
  border-radius: ${(props) => props.theme.border};
`;

const NewScheduleButton = styled(LinkButton)`
  position: absolute;
  right: 0;
  top: 0;
`;
