import React, { Component } from "react";

class FishRow extends Component {
  render() {
    return (
      <tr className="critterRow">
        <td>{this.props.fish.name}</td>
        <td>{this.props.fish.price}</td>
        <td>{this.props.fish.location}</td>
        <td>{this.props.fish.shadowSize}</td>
        <td>{this.props.fish.hasFin ? "Yes" : "No"}</td>
        <td>{this.props.fish.schedule.allDay ? "All Day" : "False"}</td>
      </tr>
    );
  }
}

export default FishRow;
