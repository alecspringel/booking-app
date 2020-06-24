import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getBookingPage } from "../../actions/bookActions";
import { getSchedule } from "../../actions/scheduleActions";

class Book extends Component {
  constructor(props) {
    super(props);
    this.props.getSchedule(this.props.match.params.userURL, new Date());
    this.props.getBookingPage(this.props.match.params.userURL);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.user && this.props.schedule ? (
          <h3>
            Book an appointment with {this.props.user.first}{" "}
            {this.props.user.last}
          </h3>
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

export default connect(mapStateToProps, { getBookingPage, getSchedule })(Book);
