import React, { Component } from "react";
import Header from "./components/Header";
import HemisphereSelector from "./components/HemisphereSelector";
import OptimalFishing from "./components/OptimalFishing";
import Content from "./components/Content";
import Footer from "./components/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fish: [],
      bugs: [],
      selectedHemisphere: "North",
      currentTime: new Date(),
      optimalFishingLocation: "",
      optimalFishingPrice: 0,
    };

    this.changeHemisphere = (newHemisphere) => {
      this.setState(
        {
          selectedHemisphere: newHemisphere,
        },
        () => {
          this.updateCritters();
        }
      );
    };
  }

  getCurrentFish = async () => {
    const month = this.state.currentTime.toLocaleString("default", {
      month: "long",
    });
    const hour = this.state.currentTime.getHours();
    const response = await fetch(
      `/critters/fish/${this.state.selectedHemisphere}/${month}/${hour}`
    );
    const body = await response.json();
    return body;
  };

  getCurrentBugs = async () => {
    const month = this.state.currentTime.toLocaleString("default", {
      month: "long",
    });
    const hour = this.state.currentTime.getHours();
    const response = await fetch(
      `/critters/bugs/${this.state.selectedHemisphere}/${month}/${hour}`
    );
    const body = await response.json();
    return body;
  };

  updateCritters = () => {
    this.getCurrentFish()
      .then((res) => this.handleFishUpdate(res))
      .catch((err) => console.log(err));

    this.getCurrentBugs()
      .then((res) => this.handleBugUpdate(res))
      .catch((err) => console.log(err));
  };

  handleFishUpdate(fish) {
    this.setState({ fish: fish }, () => {
      this.calculateBestFishingLocation();
    });
  }

  handleBugUpdate(bugs) {
    this.setState({ bugs: bugs }, () => {
      console.log("Results: " + this.state.bugs.length);
    });
  }

  calculateBestFishingLocation() {
    let locationMap = new Map();

    this.state.fish.map((fish) => {
      if (locationMap.has(fish.location)) {
        let existingLocation = locationMap.get(fish.location);
        existingLocation.totalValue += existingLocation.totalValue + fish.price;
        existingLocation.numberOfFish++;
        locationMap.set(fish.location, existingLocation);
      } else {
        locationMap.set(fish.location, {
          totalValue: fish.price,
          numberOfFish: 1,
        });
      }
    });

    let maxAveragePrice = 0;
    let maxLocation = "";

    for (let [key, value] of locationMap.entries()) {
      if (value.totalValue / value.numberOfFish > maxAveragePrice) {
        maxAveragePrice = value.totalValue / value.numberOfFish;
        maxLocation = key;
      }
    }

    console.log(maxAveragePrice);
    console.log(maxLocation);

    this.setState({
      optimalFishingLocation: maxLocation,
      optimalFishingPrice: maxAveragePrice,
    });
  }

  componentDidMount() {
    this.updateCritters();
  }

  render() {
    const hemispheres = ["North", "South"];

    return (
      <div className="App">
        <Header />
        <div className="App-content">
          <HemisphereSelector
            changeHemisphere={this.changeHemisphere}
            selectedHemisphere={this.state.selectedHemisphere}
            hemispheres={hemispheres}
          />
          <OptimalFishing
            optimalFishingLocation={this.state.optimalFishingLocation}
            optimalAveragePrice={this.state.optimalFishingPrice}
          />
          <Content bugs={this.state.bugs} fish={this.state.fish} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
