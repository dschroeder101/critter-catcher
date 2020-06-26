import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

class CritterSelector extends Component {
  render() {
    const btns = this.props.critters.map((critter) => {
      return (
        <ListGroup.Item
          action
          onClick={(e) => this.props.changeCritter(critter)}
          className={this.props.selectedCritter === critter ? "active" : ""}
        >
          {critter}
        </ListGroup.Item>
      );
    });
    return (
      <div className="Critter-selector">
        <ListGroup horizontal>{btns}</ListGroup>
      </div>
    );
  }
}

export default CritterSelector;
