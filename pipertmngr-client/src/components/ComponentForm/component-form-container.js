import React, { Component } from "react";
import ComponentFormView from "./component-form-view";

export class ComponentFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      componentName: "",
    };
  }

  setInputState = (e) => {
    this.setState({
      componentName: e.target.value,
    });
  };

  createComponent = () => {
    let name = this.state.componentName;

    if (name === "") {
      name = "Untitled Component";
    }

    this.props.createComponent(name);
  };

  render() {
    return (
      <ComponentFormView
        toggleComponentForm={this.props.toggleComponentForm}
        createComponent={this.createComponent}
        setInputState={this.setInputState}
      />
    );
  }
}

export default ComponentFormContainer;
