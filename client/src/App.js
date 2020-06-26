import React, { Component } from "react";
import Header from "./components/Header";
import HemisphereSelector from "./components/HemisphereSelector";
import CritterSelector from "./components/CritterSelector";
import FishingLocations from "./components/FishingLocationTable";
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
      selectedCritter: "Fish",
      currentTime: new Date(),
      lastRetrieval: new Date(),
      fishingLocations: new Map(),
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

    this.changeCritter = (newCritter) => {
      {
        this.setState({
          selectedCritter: newCritter,
        });
      }
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
    console.log(body);
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
      this.calculateFishingLocations();
    });
  }

  handleBugUpdate(bugs) {
    this.setState({ bugs: bugs }, () => {
      console.log("Results: " + this.state.bugs.length);
    });
  }

  calculateFishingLocations() {
    let locationMap = new Map();

    this.state.fish.map((fish) => {
      fish.locations.map((location) => {
        if (locationMap.has(location)) {
          locationMap.get(location).totalValue += fish.price;
          locationMap.get(location).numberOfFish++;
        } else {
          locationMap.set(location, {
            totalValue: fish.price,
            numberOfFish: 1,
          });
        }
      });
    });

    this.setState({
      fishingLocations: locationMap,
    });
  }

  componentDidMount() {
    this.updateCritters();
  }

  render() {
    const hemispheres = ["North", "South"];
    const critters = ["Fish", "Bugs"];
    return (
      <div className="App">
        <Header />
        <div className="App-content">
          <HemisphereSelector
            changeHemisphere={this.changeHemisphere}
            selectedHemisphere={this.state.selectedHemisphere}
            hemispheres={hemispheres}
          />
          <CritterSelector
            changeCritter={this.changeCritter}
            selectedCritter={this.state.selectedCritter}
            critters={critters}
          />
          <FishingLocations locations={this.state.fishingLocations} />
          <Content
            selectedCritter={this.state.selectedCritter}
            bugs={this.state.bugs}
            fish={this.state.fish}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
