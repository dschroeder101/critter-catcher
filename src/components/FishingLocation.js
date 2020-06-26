import React, { Component } from "react";

class FishingLocation extends Component {
  render() {
    return (
      <tr className="critterRow">
        <td>{this.props.name}</td>
        <td>{this.props.numberOfFish}</td>
        <td>{Math.round(this.props.totalValue / this.props.numberOfFish)}</td>
      </tr>
    );
  }
}
export default FishingLocation;
