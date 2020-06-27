import React, { Component, nextProps } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getBookingPage, bookMeeting } from "../../actions/bookActions";
import { getMonthSchedule } from "../../actions/scheduleActions";
import DatePicker from "../general/DatePicker";
import DaySchedule from "./bookSchedule/DaySchedule";
import { addMinutes } from "../../helpers/dateTime";
import ScheduleSelector from "./ScheduleSelector";
import Spinner from "../general/spinner/Spinner";

const BookContainer = styled.div`
  text-align: center;
`;

const Container = styled.div`
  text-align: center;
  box-shadow: 1px 1px 4px 2px #00000026;
  border-radius: 8px;
  width: 620px;
  height: 425px;
  margin: auto;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  box-shadow: 1px 1px 4px 2px #00000026;
  border-radius: 8px;
  width: 620px;
  height: 425px;
  margin: auto;
`;

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      lastPicked: null,
      scheduleTitle: "",
      selectedSchedule: [],
    };
    this.props.getBookingPage(this.props.match.params.userURL);
    this.changeMonth = this.changeMonth.bind(this);
    this.changeDay = this.changeDay.bind(this);
    this.bookMeeting = this.bookMeeting.bind(this);
    this.scheduleHandler = this.scheduleHandler.bind(this);
    this.setSelectedSchedule = this.setSelectedSchedule.bind(this);
  }

  setSelectedSchedule(date) {
    date.setHours(0, 0, 0, 0);
    var selected = this.props.monthSchedule.find(
      (obj) => obj.date.toString() === date.toISOString()
    );

    //If no schedule is found, send empty list
    if (selected === undefined) {
      this.setState({
        selectedSchedule: [],
      });
    } else {
      this.setState({
        selectedSchedule: selected.schedule,
      });
    }
  }

  // Set the title of the schedule that the user selects
  scheduleHandler(e) {
    const clientTimezone = new Date().getTimezoneOffset();
    var shiftedDate = addMinutes(new Date(), clientTimezone);
    this.setState(
      {
        scheduleTitle: e.target.value,
      },
      () => {
        this.props.getMonthSchedule(
          this.props.match.params.userURL,
          shiftedDate,
          this.state.scheduleTitle
        );
      }
    );
  }

  changeMonth(date) {
    this.props.getMonthSchedule(
      this.props.match.params.userURL,
      new Date(date),
      this.state.scheduleTitle
    );
    this.setState({
      lastPicked: null,
    });
  }

  changeDay(date) {
    // Need to shift the date for the API request to UTC timezone
    // To do so, we get the client's time zone, shift the date from the selector, then send the request
    this.setSelectedSchedule(date);
    this.setState({
      lastPicked: date,
    });
  }

  bookMeeting(start, end) {
    this.props.bookMeeting(this.props.match.params.userURL, start, end);
  }

  render() {
    return (
      <BookContainer>
        {this.props.user && this.props.user.first && this.props.user.last && (
          <div>
            <h2>
              Meet with {this.props.user.first} {this.props.user.last}
            </h2>
            {this.state.scheduleTitle === "" ? (
              <Container>
                <ScheduleSelector
                  options={this.props.user.schedules}
                  scheduleHandler={this.scheduleHandler}
                />
              </Container>
            ) : (
              <>
                {this.props.monthSchedule && (
                  <FlexContainer>
                    <DatePicker
                      consumer={this.changeDay}
                      changeMonth={this.changeMonth}
                      loading={this.props.scheduleLoading}
                    />
                    <DaySchedule
                      schedule={this.state.selectedSchedule}
                      bookMeeting={this.bookMeeting}
                      interval={this.props.user.interval}
                      lastPicked={this.state.lastPicked}
                      loading={this.props.scheduleLoading}
                    />
                  </FlexContainer>
                )}
              </>
            )}
          </div>
        )}
      </BookContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.book.user,
  monthSchedule: state.schedule.monthSchedule,
  scheduleLoading: state.schedule.loading,
});

export default connect(mapStateToProps, {
  getBookingPage,
  getMonthSchedule,
  bookMeeting,
})(Book);
