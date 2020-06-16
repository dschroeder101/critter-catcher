import React, { Component } from "react";
import BugRow from "./BugRow";
import { Table } from "react-bootstrap";

class BugTable extends Component {
  render() {
    const Bugs = this.props.bugs.map((bug) => {
      return <BugRow bug={bug} />;
    });
    return (
      <div>
          <h2>Available Bugs</h2>
        <Table striped bordered variant="dark">
          <thead className="critterTableHead">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Location</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>{Bugs}</tbody>
        </Table>
      </div>
    );
  }
}

export default BugTable;
