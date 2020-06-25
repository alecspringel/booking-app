import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getBookingPage, bookMeeting } from "../../actions/bookActions";
import { getSchedule } from "../../actions/scheduleActions";
import DatePicker from "../general/DatePicker";
import DaySchedule from "./bookSchedule/DaySchedule";
import { addMinutes } from "../../helpers/dateTime";

class Book extends Component {
  constructor(props) {
    super(props);
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
  }

  bookMeeting(start, end) {
    console.log(this.props.match.params.userURL, start, end);
    this.props.bookMeeting(this.props.match.params.userURL, start, end);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.user && this.props.schedule ? (
          <>
            <h3>
              Book an appointment with {this.props.user.first}{" "}
              {this.props.user.last}
            </h3>
            <DatePicker consumer={this.changeDay} />
            <DaySchedule
              schedule={this.props.schedule}
              bookMeeting={this.bookMeeting}
            />
          </>
        ) : (
          <h1>Loading ...</h1>
        )}
      </div>
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
