import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fish: [],
      bugs: [],
    };
  }

  getFish = async () => {
    const response = await fetch("/critters/fish");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  };

  getBugs = async () => {
    const response = await fetch("/critters/bugs");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body);
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

  callApi = async () => {
    const response = await fetch("/critters/north/currentTime");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    const fish = this.state.fish.map((fish) => {
      return <div>{fish.name}</div>;
    });

    const bugs = this.state.bugs.map((bug) => {
      return <div>{bug.name}</div>;
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={this.callApi}>Fetch</button>
          {fish}
          {bugs}
        </header>
      </div>
    );
  }
}

export default App;
