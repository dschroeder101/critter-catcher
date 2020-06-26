import React, { Component } from "react";
import { Table } from "react-bootstrap";
import FishingLocation from "./FishingLocation";

class FishingLocationTable extends Component {
  render() {
    const locations = [];
    this.props.locations.forEach((value, key) => {
      locations.push(
        <FishingLocation
          name={key}
          totalValue={value.totalValue}
          numberOfFish={value.numberOfFish}
        />
      );
    });

    return (
      <div className="Fishing-location-table">
        <h4>Fishing Location Breakdown</h4>
        <Table striped bordered variant="dark">
          <thead className="critterTableHead">
            <tr>
              <th>Location</th>
              <th>No. Of Fish Available</th>
              <th>Average Fish Price</th>
            </tr>
          </thead>
          <tbody>{locations}</tbody>
        </Table>
      </div>
    );
  }
}

export default FishingLocationTable;
