import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

class HemisphereSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const btns = this.props.hemispheres.map((hemisphere) => {
      return (
        <ListGroup.Item
          action
          onClick={(e) => this.props.changeHemisphere(hemisphere)}
          className={
            this.props.selectedHemisphere === hemisphere ? "active" : ""
          }
        >
          {hemisphere}ern Hemisphere
        </ListGroup.Item>
      );
    });
    return (
      <div className="Hemisphere-selector">
        <ListGroup horizontal>{btns}</ListGroup>
      </div>
    );
  }
}

export default HemisphereSelector;
