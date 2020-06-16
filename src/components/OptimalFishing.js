import React, { Component } from "react";

class OptimalFishing extends Component {
  render() {
    return (
      <div>
        <p>
          Optimal fishing spot is {this.props.optimalLocation}, with an average
          fish price of {this.props.optimalAveragePrice}.
        </p>
      </div>
    );
  }
}

export default OptimalFishing;