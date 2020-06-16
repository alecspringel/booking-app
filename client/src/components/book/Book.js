import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getBookingPage } from "../../actions/bookActions";

class Book extends Component {
  constructor(props) {
    super(props);
    this.props.getBookingPage(this.props.match.params.userURL);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.user && (
          <h3>
            Book an appointment with {this.props.user.first}{" "}
            {this.props.user.last}
          </h3>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.book.user,
});

export default connect(mapStateToProps, { getBookingPage })(Book);
