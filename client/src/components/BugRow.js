import React, { Component } from "react";

class BugRow extends Component {
  render() {
    let timeCell;
    if (this.props.bug.schedules.length === 1) {
      if (this.props.bug.schedules[0].allDay) {
        timeCell = <td>All Day</td>;
      } else {
        timeCell = (
          <td>
            {this.props.bug.schedules[0].startingTime}:00 -{" "}
            {this.props.bug.schedules[0].endingTime}:00
          </td>
        );
      }
    } else {
      let cell = this.props.bug.schedules.map((schedule) => {
        return (
          <p>
            {schedule.startingTime + ":00 - " + schedule.endingTime + ":00"}
          </p>
        );
      });
      timeCell = <td>{cell}</td>;
    }

    return (
      <tr className="critterRow">
        <td>{this.props.bug.name}</td>
        <td>{this.props.bug.price}</td>
        <td>{this.props.bug.location}</td>
        {timeCell}
      </tr>
    );
  }
}

export default BugRow;
