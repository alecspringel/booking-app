// import React, { Component } from 'react'
// import { getAllMeetings } from "../../actions/meetingActions";
// import { Link, withRouter } from "react-router-dom";
// import { connect } from "react-redux";

// class MeetingList extends Component {
//   constructor(props) {
//     super(props);
//   }
//   componentDidMount() {
//     this.props.getAllMeetings();
//     console.log(this.props)
//   }

//   componentWillReceiveProps(nextProps) {
//     console.log(nextProps.meetings.meetings)
//     this.setState({
//       meetings: nextProps.meetings.meetings
//     });
//     console.log(this.state)
//   }

//   render() {
//     return (
//       <div>
//         <h3>MEETING LIST</h3>
//     <div>{this.state && this.state.meetings.map((meeting) => <p>{meeting.title}</p>)}</div>
  
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => ({
//   meetings: state.meetings
// });

// export default connect(mapStateToProps, { getAllMeetings })(MeetingList);

