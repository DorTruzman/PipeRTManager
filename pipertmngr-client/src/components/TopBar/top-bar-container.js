import React, { Component } from "react";
import TopBarView from "./top-bar-view";

export class TopBarContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      greeting: ""
    };
  }

  componentDidMount() {
    this.generateGreeting();
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

  render() {
    return (
      <TopBarView
        isSideBarOpen={this.props.isSideBarOpen}
        toggleSideBar={this.props.toggleSideBar}
        greeting={this.state.greeting}
      />
    );
  }
}

export default TopBarContainer;
