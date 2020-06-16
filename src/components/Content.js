import React, { Component } from "react";

import HemisphereSelector from "./HemisphereSelector";
import OptimalFishing from "./OptimalFishing";
import BugTable from "./BugTable";
import FishTable from "./FishTable";

class Content extends Component {
  render() {
    return (
      <div>
        <HemisphereSelector
          changeHemisphere={this.props.changeHemisphere}
          selectedHemisphere={this.props.selectedHemisphere}
          hemispheres={this.props.hemispheres}
        />
        <OptimalFishing
          optimalLocation={"River"}
          optimalAveragePrice={"5000"}
        />
        <BugTable bugs={this.props.bugs} />
        <FishTable fish={this.props.fish} />
      </div>
    );
  }
}
export default Content;
