import React, { Component } from "react";
import styled, { css } from "styled-components";
import ClickAway from "./ClickAway";

const Header = styled.div`
  padding: 5px;
`;

const DateContainer = styled.div`
  cursor: pointer;
  height: auto;
  width: auto;
  background: none;
  display: inline-block;
  position: relative;
`;

const CalendarContainer = styled.div`
  text-align: center;
  width: auto;
  box-shadow: 1px 1px 4px 2px #00000026;
  border-radius: 8px;
  top: 100%;
  z-index: 1;
  padding: 15px;
`;

const MonthTitle = styled.h4`
  display: inline;
`;

const DayGrid = styled.div`
  height: 300px;
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  grid-template-rows: auto auto auto auto auto auto auto;
`;

const Day = styled.div`
  padding: 15px 17.5px;
  ${(props) =>
    props.selected &&
    css`
      background: #4285f4;
      color: white;
      border-radius: 21px;
    `};
`;

const Weekday = styled.div`
  padding: 9.5px 7px;
  color: grey;
  ${(props) =>
    props.selected &&
    css`
      background: #4285f4;
      color: white;
    `};
`;

const Display = styled.input`
  height: 28px;
  width: 124px;
  padding: 0px;
  border-radius: 3px;
  border: 1px solid #c5c5c5;
  background: #f2f2f2;
`;

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

Date.prototype.monthName = function () {
  const month = this.getMonth();
  var names = new Array();
  names[0] = "January";
  names[1] = "February";
  names[2] = "March";
  names[3] = "April";
  names[4] = "May";
  names[5] = "June";
  names[6] = "July";
  names[7] = "August";
  names[8] = "September";
  names[9] = "October";
  names[10] = "November";
  names[11] = "December";
  return names[month];
};

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
      display: "Today",
      currentDate: Date(),
      lastPicked: new Date(),
    };
    this.hide = this.hide.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.returnDate = this.returnDate.bind(this);
  }

  toggleCalendar(e, show) {
    this.setState({
      showDropdown: show,
    });
    console.log("toggle");
    e.stopPropagation();
  }

  hide() {
    this.setState({
      showDropdown: false,
    });
  }

  shiftMonth(shift) {
    var updated = new Date(this.state.currentDate);
    updated = updated.setMonth(updated.getMonth() + shift);
    console.log(updated);
    this.setState({
      currentDate: updated,
    });
  }

  returnDate(e) {
    var selected = e.target.getAttribute("value");
    selected = new Date(selected);
    this.setState({
      lastPicked: selected,
    });
    this.props.consumer(selected);
    this.hide();
  }

  render() {
    var calendar = [
      <>
        <Weekday>S</Weekday>
        <Weekday>M</Weekday>
        <Weekday>T</Weekday>
        <Weekday>W</Weekday>
        <Weekday>T</Weekday>
        <Weekday>F</Weekday>
        <Weekday>S</Weekday>
      </>,
    ];
    var today = new Date(this.state.currentDate);
    var monthName = today.monthName();
    var month = today.getMonth();
    var year = today.getFullYear();
    var numDays = daysInMonth(month, year);

    // Start at beginning of month
    var current = new Date(year, month, 1);
    var lastPicked = new Date(
      this.state.lastPicked.getFullYear(),
      this.state.lastPicked.getMonth(),
      this.state.lastPicked.getDate()
    );
    console.log(selected);
    for (var day = 1; day < numDays; day++) {
      var selected = false;
      if (current.toString() === lastPicked.toString()) {
        console.log(current.toString(), selected.toString());
        selected = true;
      }
      calendar.push(
        <Day value={current} onClick={this.returnDate} selected={selected}>
          {day}
        </Day>
      );
      current = current.addDays(1);
    }
    return (
      <DateContainer onClick={(e) => this.toggleCalendar(e, true)}>
        <CalendarContainer>
          <Header>
            <button
              onClick={() => this.shiftMonth(-1)}
              style={{ float: "left" }}
            >
              -
            </button>
            <MonthTitle>{monthName}</MonthTitle>
            <button
              onClick={() => this.shiftMonth(1)}
              style={{ float: "right" }}
            >
              +
            </button>
          </Header>
          <DayGrid>{calendar}</DayGrid>
        </CalendarContainer>
      </DateContainer>
    );
  }
}

export default DatePicker;
