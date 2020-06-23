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
          optimalFishingLocation={this.props.optimalFishingLocation}
          optimalAveragePrice={this.props.optimalFishingPrice}
        />
        <BugTable bugs={this.props.bugs} />
        <FishTable fish={this.props.fish} />
      </div>
    );
  }
}
export default Content;
