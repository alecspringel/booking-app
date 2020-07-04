import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import IntervalSelector from "./IntervalSelector";
import { createSchedule } from "../../../actions/scheduleActions";

class NewSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      duration: 60,
    };
    this.handleChange = this.handleChange.bind(this);
    this.setDuration = this.setDuration.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  setDuration(hour, minutes) {
    this.setState({ duration: hour * 60 + minutes });
  }

  handleSubmit(e) {
    e.preventDefault();
    var response = this.props.createSchedule(
      this.state.title,
      this.state.description,
      this.state.duration
    );
    const path = "/dashboard/schedule/edit/" + this.state.title;
    this.props.history.push({
      pathname: path,
      state: { title: this.state.title },
    });
    // console.log(response);
  }

  render() {
    return (
      <div>
        <h2>Create new schedule</h2>
        <form>
          <label>Appointment Title</label>
          <input type="text" name="title" onChange={this.handleChange} />
          <br />
          <label>Duration</label>
          <IntervalSelector timeHandler={this.setDuration} />
          <br />
          <label>Appointment Description</label>
          <input type="text" name="description" onChange={this.handleChange} />
          <br />
          <input type="submit" value="Save" onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}

const NewScheduleWithRouter = withRouter(NewSchedule);
export default connect(null, { createSchedule })(NewScheduleWithRouter);
