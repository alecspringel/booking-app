import React, { Component } from "react";
import styled from "styled-components";
import WeekdayModal from "./WeekdayModal";
import WeekdayTimes from "./parts/WeekdayTimes";
import WeekdayBox from "./parts/WeekdayBox";

export default class WeekdaySchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekdayModal: false,
      weekdayName: null,
      weekday: null,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(weekday, weekdayName) {
    console.log("toggle");
    this.setState({
      weekdayModal: !this.state.weekdayModal,
      weekdayName,
      weekday,
    });
  }

  render() {
    return (
      <div>
        {this.props.weekdaySchedule && (
          <>
            <h3>Typically Available</h3>
            <WeekGrid>
              <WeekdayBox
                weekday={1}
                weekdayName={"Monday"}
                weekdaySchedule={this.props.weekdaySchedule}
                toggleModal={this.toggleModal}
              />
              <WeekdayBox
                weekday={2}
                weekdayName={"Tuesday"}
                weekdaySchedule={this.props.weekdaySchedule}
                toggleModal={this.toggleModal}
              />
              <WeekdayBox
                weekday={3}
                weekdayName={"Wednesday"}
                weekdaySchedule={this.props.weekdaySchedule}
                toggleModal={this.toggleModal}
              />
              <WeekdayBox
                weekday={4}
                weekdayName={"Thursday"}
                weekdaySchedule={this.props.weekdaySchedule}
                toggleModal={this.toggleModal}
              />
              <WeekdayBox
                weekday={5}
                weekdayName={"Friday"}
                weekdaySchedule={this.props.weekdaySchedule}
                toggleModal={this.toggleModal}
              />
              <WeekdayBox
                weekday={6}
                weekdayName={"Saturday"}
                weekdaySchedule={this.props.weekdaySchedule}
                toggleModal={this.toggleModal}
              />
              <WeekdayBox
                weekday={0}
                weekdayName={"Sunday"}
                weekdaySchedule={this.props.weekdaySchedule}
                toggleModal={this.toggleModal}
              />
            </WeekGrid>
            {this.state.weekdayModal && (
              <WeekdayModal
                saveWeekday={this.props.saveWeekday}
                weekday={this.state.weekday}
                weekdayName={this.state.weekdayName}
                weekdaySchedule={this.props.weekdaySchedule[this.state.weekday]}
                close={this.toggleModal}
              />
            )}
          </>
        )}
      </div>
    );
  }
}

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: 15px;
`;
