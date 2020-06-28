import React, { Component } from "react";

export default class TimeZoneSelector extends Component {
  render() {
    return (
      <select {...this.props}>
        <option disabled>United States</option>
        <option value={540}>HST - Honolulu</option>
        <option value={480}>AKDT - Anchorage</option>
        <option value={420}>PDT - Los Angeles</option>
        <option value={360}>MDT - Denver</option>
        <option value={300}>CDT - Chicago</option>
        <option value={240}>EDT - New York</option>
      </select>
    );
  }
}
