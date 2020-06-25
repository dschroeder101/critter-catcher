import React, { Component } from "react";

class FishRow extends Component {
  render() {
    let timeCell;
    if (this.props.fish.schedules.length === 1) {
      if (this.props.fish.schedules[0].allDay) {
        timeCell = <td>All Day</td>;
      } else {
        timeCell = (
          <td>
            {this.props.fish.schedules[0].startingTime}:00 -{" "}
            {this.props.fish.schedules[0].endingTime}:00
          </td>
        );
      }
    } else {
      let cell = this.props.fish.schedules.map((schedule) => {
        return (
          <p>
            {schedule.startingTime + ":00 - " + schedule.endingTime + ":00"}
          </p>
        );
      });
      timeCell = <td>{cell}</td>;
    }

    let locationCell;
    if (this.props.fish.locations.length === 1) {
      locationCell = <td>{this.props.fish.locations[0]}</td>;
    } else {
      if (this.props.fish.locations[0] === "River") {
        locationCell = <td>River</td>;
      } else if (this.props.fish.locations[0] === "Sea") {
        locationCell = <td>Sea</td>;
      }
    }

    return (
      <tr className="critterRow">
        <td>{this.props.fish.name}</td>
        <td>{this.props.fish.price}</td>
        {locationCell}
        <td>{this.props.fish.shadowSize}</td>
        <td>{this.props.fish.hasFin ? "Yes" : "No"}</td>
        {timeCell}
      </tr>
    );
  }
}

export default FishRow;
