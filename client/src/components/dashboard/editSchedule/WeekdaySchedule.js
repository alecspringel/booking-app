import React, { Component } from "react";
import styled from "styled-components";
import WeekdayModal from "./WeekdayModal";

export default class WeekdaySchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekdayModal: false,
      weekday: null,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(weekday) {
    console.log("toggle");
    this.setState({
      weekdayModal: !this.state.weekdayModal,
      selected: weekday,
    });
  }

  render() {
    return (
      <>
        <h3>Typically Available</h3>
        <WeekGrid>
          <Weekday onClick={() => this.toggleModal("Monday")}>
            <Label>
              <p>Monday</p>
            </Label>
          </Weekday>
          <Weekday>
            <Label>
              <p>Tuesday</p>
            </Label>
          </Weekday>
          <Weekday>
            <Label>
              <p>Wednesday</p>
            </Label>
          </Weekday>
          <Weekday>
            <Label>
              <p>Thursday</p>
            </Label>
          </Weekday>
          <Weekday>
            <Label>
              <p>Friday</p>
            </Label>
          </Weekday>
          <Weekday>
            <Label>
              <p>Saturday</p>
            </Label>
          </Weekday>
          <Weekday>
            <Label>
              <p>Sunday</p>
            </Label>
          </Weekday>
        </WeekGrid>
        {this.state.weekdayModal && (
          <WeekdayModal
            weekday={this.state.selected}
            close={this.toggleModal}
          />
        )}
      </>
    );
  }
}

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: 15px;
`;

const Weekday = styled.div`
  height: 100px;
  border: 1px solid #d5d5d5;
  position: relative;

  &:hover {
    outline: 1px solid ${(props) => props.theme.primary};
  }
`;

const Label = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  background: #d5d5d5;
  color: white;
  padding: 2px 0;
`;
