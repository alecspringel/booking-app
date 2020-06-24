import React, { Component } from "react";
import styled from "styled-components";
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
  position: absolute;
  height: 250px;
  width: 250px;
  background: lightgrey;
  top: 100%;
  z-index: 1;
`;

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
`;

const Day = styled.div``;

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
    e.stopPropagation();
    var selected = e.target.getAttribute("value");
    selected = new Date(selected);
    console.log(selected);
    console.log(this.props.consumer);
    this.props.consumer(selected);
    this.hide();
  }

  render() {
    var calendar = [
      <>
        <Day>S</Day>
        <Day>M</Day>
        <Day>T</Day>
        <Day>W</Day>
        <Day>T</Day>
        <Day>F</Day>
        <Day>S</Day>
      </>,
    ];
    var today = new Date(this.state.currentDate);
    var monthName = today.monthName();
    var month = today.getMonth();
    var year = today.getFullYear();
    var numDays = daysInMonth(month, year);

    // Start at beginning of month
    var current = new Date(year, month, 1);
    for (var day = 1; day < numDays; day++) {
      // calendar.push(<Day value={year+'/'+(month+1)+'/'+day} onClick={this.returnDate}>{day}</Day>)
      calendar.push(
        <Day value={current} onClick={this.returnDate}>
          {day}
        </Day>
      );
      current = current.addDays(1);
    }
    return (
      <DateContainer onClick={(e) => this.toggleCalendar(e, true)}>
        <ClickAway
          onClickAway={this.hide}
          contents={
            <>
              <Display
                type="text"
                placeholder={this.state.display}
                onClick={(e) => this.toggleCalendar(e, true)}
              />
              {this.props.consumer && this.state.showDropdown === true && (
                <CalendarContainer>
                  <Header>
                    <button
                      onClick={() => this.shiftMonth(-1)}
                      style={{ float: "left" }}
                    >
                      -
                    </button>
                    {monthName}
                    <button
                      onClick={() => this.shiftMonth(1)}
                      style={{ float: "right" }}
                    >
                      +
                    </button>
                  </Header>
                  <DayGrid>{calendar}</DayGrid>
                </CalendarContainer>
              )}
            </>
          }
        />
      </DateContainer>
    );
  }
}

export default DatePicker;
