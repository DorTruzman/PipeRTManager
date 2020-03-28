import React, { Component } from "react";
import TopBarView from "./top-bar-view";
import ServerUtils from "../../utils/ServerUtils";

export class TopBarContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      greeting: "",
      isAlive: false
    };
  }

  componentDidMount() {
    this.isServerAlive();
    this.generateGreeting();
    this.setState({
      isAliveInterval: setInterval(this.isServerAlive, 15000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.isAliveInterval);
  }

  generateGreeting = () => {
    let time = new Date().getHours();
    let greeting = "";

    if (time >= 4 && time < 12) {
      greeting = "GOOD MORNING!";
    }
    if (time >= 12 && time <= 16) {
      greeting = "GOOD AFTERNOON!";
    } else if (time >= 17 && time <= 21) {
      greeting = "GOOD EVENING!";
    } else {
      greeting = "GOOD NIGHT!";
    }

    this.setState({
      greeting
    });
  };

  isServerAlive = () => {
    ServerUtils.isAlive()
      .then(() => {
        this.setState({
          isAlive: true
        });
      })
      .catch(() => {
        this.setState({
          isAlive: false
        });
      });
  };

  render() {
    return (
      <TopBarView
        isAlive={this.state.isAlive}
        isSideBarOpen={this.props.isSideBarOpen}
        toggleSideBar={this.props.toggleSideBar}
        greeting={this.state.greeting}
      />
    );
  }
}

export default TopBarContainer;
