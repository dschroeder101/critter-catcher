import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

class HemisphereSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.selectedHemisphere);
    console.log(this.props.hemispheres);
    const btns = this.props.hemispheres.map((hemisphere) => {
      return (
        <ListGroup.Item
          action
          onClick={(e) => this.props.changeHemisphere(hemisphere)}
          className={
            this.props.selectedHemisphere === hemisphere ? "active" : ""
          }
        >
          {hemisphere} Hemisphere
        </ListGroup.Item>
      );
    });
    return <ListGroup horizontal>{btns}</ListGroup>;
  }
}

export default HemisphereSelector;
