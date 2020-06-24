import React, { Component } from "react";
import BugTable from "./BugTable";
import FishTable from "./FishTable";

class DataTables extends Component {
  render() {
    return (
      <div className="tables">
        <BugTable bugs={this.props.bugs} />
        <FishTable fish={this.props.fish} />
      </div>
    );
  }
}

export default DataTables;
