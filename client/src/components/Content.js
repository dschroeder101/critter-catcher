import React, { Component } from "react";
import DataTables from "./DataTables";

class Content extends Component {
  render() {
    return (
      <div className="Content">
        <DataTables
          selectedCritter={this.props.selectedCritter}
          bugs={this.props.bugs}
          fish={this.props.fish}
        />
      </div>
    );
  }
}
export default Content;
