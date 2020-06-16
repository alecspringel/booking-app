// import React, { Component } from 'react'
// import { createEvent } from "../../actions/meetingActions";
// import { connect } from "react-redux";


// class EventForm extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       title: "",
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.submitEvent = this.submitEvent.bind(this)
//   }

//   handleChange(e) {
//     this.setState({[e.target.id]: e.target.value })
//   }

//   submitEvent() {
//     console.log("submit")
//     const event = {
//       title: this.state.title
//     }
//     this.props.createEvent(event)
//   }

//   render() {
//     return (
//       <div>
//         <input
//           id="title"
//           onChange={this.handleChange}
//         >
//         </input>
//         <button onClick={this.submitEvent}>Create Event</button>
//       </div>
//     )
//   }
// }
// export default connect(null, { createEvent })(EventForm);