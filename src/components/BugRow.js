import React, { Component } from "react";

class BugRow extends Component {
  render() {
    return (
      <tr className="critterRow">
        <td>{this.props.bug.name}</td>
        <td>{this.props.bug.price}</td>
        <td>{this.props.bug.location}</td>
        <td>{this.props.bug.schedule.startingTime}</td>
      </tr>
    );
  }
}

export default BugRow;
