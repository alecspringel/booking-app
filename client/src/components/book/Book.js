import React, { Component } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getBookingPage, bookMeeting } from "../../actions/bookActions";
import { getSchedule } from "../../actions/scheduleActions";
import DatePicker from "../general/DatePicker";
import DaySchedule from "./bookSchedule/DaySchedule";
import { addMinutes } from "../../helpers/dateTime";

const BookContainer = styled.div`
  text-align: center;
`;

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastPicked: new Date(),
    };
    this.props.getSchedule(this.props.match.params.userURL, new Date());
    this.props.getBookingPage(this.props.match.params.userURL);
    this.changeDay = this.changeDay.bind(this);
    this.bookMeeting = this.bookMeeting.bind(this);
  }

  changeDay(date) {
    // Need to shift the date for the API request to UTC timezone
    // To do so, we get the client's time zone, shift the date from the selector, then send the request
    const clientTimezone = new Date().getTimezoneOffset();
    var shiftedDate = addMinutes(date, clientTimezone);
    this.props.getSchedule(this.props.match.params.userURL, shiftedDate);
    this.setState({
      lastPicked: date,
    });
  }

  bookMeeting(start, end) {
    console.log(this.props.match.params.userURL, start, end);
    this.props.bookMeeting(this.props.match.params.userURL, start, end);
  }

  render() {
    return (
      <BookContainer>
        {this.props.user && this.props.schedule ? (
          <>
            <h2>
              Meet with {this.props.user.first} {this.props.user.last}
            </h2>
            <DatePicker consumer={this.changeDay} />
            <DaySchedule
              schedule={this.props.schedule}
              bookMeeting={this.bookMeeting}
              interval={this.props.user.interval}
              lastPicked={this.state.lastPicked}
            />
          </>
        ) : (
          <h1>Loading ...</h1>
        )}
      </BookContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.book.user,
  schedule: state.schedule.bookingSchedule,
});

export default connect(mapStateToProps, {
  getBookingPage,
  getSchedule,
  bookMeeting,
})(Book);
