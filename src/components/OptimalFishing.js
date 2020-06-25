import React, { Component } from "react";

class OptimalFishing extends Component {
  render() {
    return (
      <div>
        <p>
          Optimal fishing spot is {this.props.optimalFishingLocation}, with an average
          fish price of {this.props.optimalAveragePrice} Bells
        </p>
      </div>
    );
  }
}

export default OptimalFishing;