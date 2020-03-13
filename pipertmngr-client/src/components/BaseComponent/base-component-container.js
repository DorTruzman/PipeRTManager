import React, { Component } from "react";
import BaseComponentView from "./base-component-view";

export class BaseComponentContainer extends Component {
  constructor(props) {
    super(props);
  }

  deleteComponent = () => {
    this.props.deleteComponent(this.props.componentData);
  };

  forceAnUpdate = () => {
    this.forceUpdate();
  };

  render() {
    return (
      <BaseComponentView
        isSelected={
          this.props.componentData && this.props.componentData.isSelected
        }
        componentData={this.props.componentData}
        changeSelected={this.props.changeSelected}
        deleteComponent={this.deleteComponent}
        forceAnUpdate={this.forceAnUpdate}
      />
    );
  }
}

export default BaseComponentContainer;
