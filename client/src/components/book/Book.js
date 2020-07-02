import React, { Component, nextProps } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getBookingPage, bookMeeting } from "../../actions/bookActions";
import { getMonthSchedule, getSchedule } from "../../actions/scheduleActions";
import DatePicker from "../general/DatePicker";
import DaySchedule from "./bookSchedule/DaySchedule";
import { addMinutes, firstOfMonthUTC } from "../../helpers/dateTime";
import ScheduleSelector from "./ScheduleSelector";
import Spinner from "../general/spinner/Spinner";
import { createTimes } from "../../helpers/schedule";

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
      offset: new Date().getTimezoneOffset(),
      loading: false,
      lastPicked: null,
      scheduleTitle: "",
      selectedSchedule: [],
    };
    this.props.getBookingPage(this.props.match.params.userURL);
    this.changeTimeZone = this.changeTimeZone.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.changeDay = this.changeDay.bind(this);
    this.bookMeeting = this.bookMeeting.bind(this);
    this.scheduleHandler = this.scheduleHandler.bind(this);
    this.setSelectedSchedule = this.setSelectedSchedule.bind(this);
  }

  // Takes UTC date from picker, then finds all slots for that time frame
  // pass offset as param
  setSelectedSchedule(date) {
    var shiftedDate = addMinutes(date, this.state.offset);
    console.log(this.props.monthSchedule);
    var validSlots = this.props.monthSchedule.filter((slot) => {
      console.log(shiftedDate, addMinutes(shiftedDate, 1440));
      if (
        new Date(slot.start) > shiftedDate &&
        new Date(slot.start) < addMinutes(shiftedDate, 1440)
      ) {
        return slot;
      }
    });
    console.log(validSlots);

    // No slots were found
    if (validSlots === undefined) {
      this.setState({
        selectedSchedule: [],
      });
    } else {
      this.setState({
        selectedSchedule: createTimes(validSlots, this.state.offset),
      });
    }
  }

  // Set the title of the schedule that the user selects
  scheduleHandler(e) {
    var today = new Date();
    var thisMonth = today.getMonth();
    var thisYear = today.getFullYear();

    // Gets all slots from the 1st to end of today's month (converted timezone)
    var start = firstOfMonthUTC(thisYear, thisMonth);
    start = addMinutes(start, this.state.offset);

    var end = firstOfMonthUTC(thisYear, thisMonth + 1);
    end = addMinutes(end, this.state.offset);

    this.setState(
      {
        scheduleTitle: e.target.value,
      },
      () => {
        this.props.getSchedule(
          this.props.match.params.userURL,
          this.state.scheduleTitle,
          start,
          end
        );
      }
    );
  }

  changeMonth(year, month) {
    var start = firstOfMonthUTC(year, month);
    start = addMinutes(start, this.state.offset);

    var end = firstOfMonthUTC(year, month + 1);
    end = addMinutes(end, this.state.offset);

    this.props.getSchedule(
      this.props.match.params.userURL,
      this.state.scheduleTitle,
      start,
      end
    );

    this.setState({
      lastPicked: null,
    });
  }

  changeDay(date) {
    this.setSelectedSchedule(date);

    this.setState({
      lastPicked: date,
    });
  }

  changeTimeZone(e) {
    this.setState({
      offset: e.target.value,
      lastPicked: null,
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
                      changeTimeZone={this.changeTimeZone}
                      loading={this.props.scheduleLoading}
                      lastPicked={this.state.lastPicked}
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
  getSchedule,
  bookMeeting,
})(Book);
