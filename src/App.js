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
      selectedHemisphere: "Northern",
    };

    this.changeHemisphere = (newHemisphere) => {
      this.setState({
        selectedHemisphere: newHemisphere,
      });
    };
  }

  getFish = async () => {
    const response = await fetch("/critters/fish");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  getBugs = async () => {
    const response = await fetch("/critters/bugs");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  componentDidMount() {
    this.getFish()
      .then((res) => this.setState({ fish: res }))
      .catch((err) => console.log(err));

    this.getBugs()
      .then((res) => this.setState({ bugs: res }))
      .catch((err) => console.log(err));
  }

  render() {
    const fish = this.state.fish.map((fish) => {
      return <div>{fish.name}</div>;
    });

    const bugs = this.state.bugs.map((bug) => {
      return <div>{bug.name}</div>;
    });

    const hemispheres = ["Northern", "Southern"];

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
