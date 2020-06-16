import React, { Component } from "react";
import FishRow from "./FishRow";
import { Table } from "react-bootstrap";

class FishTable extends Component {
  render() {
    const Fish = this.props.fish.map((fish) => {
      return <FishRow fish={fish} />;
    });
    return (
      <div>
        <h2>Available Fish</h2>
        <Table striped bordered variant="dark">
          <thead className="critterTableHead">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Location</th>
              <th>Shadow Size</th>
              <th>Finned</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>{Fish}</tbody>
        </Table>
      </div>
    );
  }
}

export default FishTable;
