import React, { Component } from "react";
import Header from "./components/Header";
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
      .then((res) => this.setState({ fish: res }))
      .catch((err) => console.log(err));

    this.getCurrentBugs()
      .then((res) => this.setState({ bugs: res }))
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getCurrentFish()
      .then((res) => this.setState({ fish: res }))
      .catch((err) => console.log(err));

    this.getCurrentBugs()
      .then((res) => this.setState({ bugs: res }))
      .catch((err) => console.log(err));
  }

  render() {
    const hemispheres = ["North", "South"];

    return (
      <div className="App">
        <Header />
        <div className="App-content">
          <Content
            hemispheres={hemispheres}
            selectedHemisphere={this.state.selectedHemisphere}
            changeHemisphere={this.changeHemisphere}
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
