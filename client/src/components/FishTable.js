import React, { Component } from "react";
import FishRow from "./FishRow";
import { Table } from "react-bootstrap";

class FishTable extends Component {
  render() {
    console.log(this.props.fish);
    const Fish = this.props.fish.map((fish) => {
      return <FishRow fish={fish} />;
    });
    return (
      <div className="dataTable">
        <h4>Available Fish</h4>
        <div className="table-responsive">
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
      </div>
    );
  }
}

export default FishTable;
