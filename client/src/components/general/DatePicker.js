import React, { Component } from "react";
import styled, { css } from "styled-components";
import ClickAway from "./ClickAway";
import { daysInMonth } from "../../helpers/dateTime";

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

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      showDropdown: false,
      display: "Today",
      currentMonth: new Date(),
      lastPicked: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      ),
    };
    this.returnDate = this.returnDate.bind(this);
  }

  shiftMonth(shift) {
    var updated = this.state.currentMonth;
    updated = updated.setMonth(updated.getMonth() + shift);
    this.setState({
      currentMonth: new Date(updated),
    });
  }

  returnDate(e) {
    var selected = e.target.getAttribute("value");
    selected = new Date(selected);
    this.setState({
      lastPicked: selected,
    });
    this.props.consumer(selected);
  }

  render() {
    var calendar = [
      <>
        <Weekday key={"Sat"}>S</Weekday>
        <Weekday key={"Mon"}>M</Weekday>
        <Weekday key={"Tue"}>T</Weekday>
        <Weekday key={"Wed"}>W</Weekday>
        <Weekday key={"Thu"}>T</Weekday>
        <Weekday key={"F"}>F</Weekday>
        <Weekday key={"Sun"}>S</Weekday>
      </>,
    ];
    // Calendar should only rerender if the month is changed
    var monthName = this.state.currentMonth.monthName();
    var month = this.state.currentMonth.getMonth();
    var year = this.state.currentMonth.getFullYear();
    var numDays = daysInMonth(month, year);

    // Start at beginning of month and create each day
    var dayIterator = new Date(year, month, 1);

    // Get weekday and shift calendar
    var firstDayOfMonth = dayIterator.getDay();
    if (firstDayOfMonth !== 0) {
      for (var i = 0; i < firstDayOfMonth; i++) {
        calendar.push(<Day key={i}></Day>);
      }
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (var day = 1; day < numDays; day++) {
      // Day is == to today's date
      if (new Date(dayIterator) < today) {
        var props = {
          onClick: null,
        };
        // Days beyond today's date
      } else {
        var props = {
          onClick: this.returnDate,
        };
      }
      props.key = props.value = dayIterator;
      props.lastPicked = this.state.lastPicked;
      calendar.push(<Day {...props}>{day}</Day>);
      dayIterator = dayIterator.addDays(1);
    }
    return (
      <DateContainer>
        <CalendarContainer>
          <Header>
            <button
              onClick={() => this.shiftMonth(-1)}
              style={{ float: "left" }}
            >
              <Arrow src={require("../../assets/imgs/arrow-left-black.png")} />
            </button>
            <MonthTitle>{monthName}</MonthTitle>
            <button
              onClick={() => this.shiftMonth(1)}
              style={{ float: "right" }}
            >
              <Arrow src={require("../../assets/imgs/arrow-right-black.png")} />
            </button>
          </Header>
          <DayGrid>{calendar}</DayGrid>
        </CalendarContainer>
      </DateContainer>
    );
  }
}

/*===================== Styles =====================*/
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
  height: 378px;
  width: auto;
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
    props.value &&
    props.lastPicked &&
    props.value.toString() === props.lastPicked.toString() &&
    css`
      background: #1a56ff;
      color: white;
      border-radius: 21px;
    `}
  ${(props) =>
    props.onClick === null &&
    css`
      color: lightgrey;
    `}
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

const Arrow = styled.img`
  padding-top: 3px;
  height: 19px;
`;
