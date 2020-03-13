import React, { Component } from "react";
import ComponentFormView from "./component-form-view";

export class ComponentFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      componentName: null
    };
  }

  createComponent = name => {
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
      />
    );
  }
}

export default ComponentFormContainer;
