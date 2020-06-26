import React, { Component } from "react";
import BugTable from "./BugTable";
import FishTable from "./FishTable";

class DataTables extends Component {
  render() {
    return (
      <div className="tables">
        {this.props.selectedCritter === "Fish" ? (
          <FishTable fish={this.props.fish} />
        ) : (
          <BugTable bugs={this.props.bugs} />
        )}
      </div>
    );
  }
}

export default DataTables;
