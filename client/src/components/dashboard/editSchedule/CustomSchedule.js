import React, { Component } from "react";
import styled from "styled-components";
import CustomWeek from "./parts/CustomWeek";
import { addMinutes } from "../../../helpers/dateTime";
import CustomModal from "./CustomModal";

export default class CustomSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customModal: false,
      customDays: [],
    };
    this.toggleCustomModal = this.toggleCustomModal.bind(this);
  }

  toggleCustomModal(trueDate) {
    this.setState({
      customModal: !this.state.customModal,
      selectedDate: trueDate,
    });
  }

  render() {
    var trueDate = addMinutes(new Date(), this.props.offset * -1);
    return (
      <div>
        <h3>Customize Availability</h3>
        <CalendarTopBar></CalendarTopBar>
        <WeekGrid>
          <CustomWeek
            date={trueDate}
            offset={this.props.offset}
            toggleCustomModal={this.toggleCustomModal}
            weekdaySchedule={this.props.weekdaySchedule}
            customDays={this.props.customDays}
          />
        </WeekGrid>
        {this.state.customModal && (
          <CustomModal
            date={this.state.selectedDate}
            offset={this.props.offset}
            saveCustomDay={this.props.saveCustomDay}
            weekdaySchedule={
              this.props.weekdaySchedule[this.state.selectedDate.getUTCDay()]
            }
            close={this.toggleCustomModal}
          />
        )}
      </div>
    );
  }
}

const CalendarTopBar = styled.div`
  border: 1px solid grey;
  text-align: center;
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
