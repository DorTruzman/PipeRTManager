import React, { Component } from "react";
import PipelineView from "./pipeline-view";

export class PipelineContainer extends Component {
  constructor(props) {
    super(props);
  }

  setSelectedComponent() {
    return this.props.components.map(comp => {
      if (comp.name === this.props.selectedComponent) {
        return {
          ...comp,
          isSelected: true
        };
      } else {
        return {
          ...comp,
          isSelected: false
        };
      }
    });
  }

  getRedisKey = componentData => {
    if (!componentData.routines) {
      return null;
    }

    let finalRoutine =
      componentData.routines[componentData.routines.length - 1];

    if (
      finalRoutine.routineName === "Send2Redis" &&
      finalRoutine.params &&
      finalRoutine.params.redis_key
    ) {
      return finalRoutine.params.redis_key;
    }

    return null;
  };

  render() {
    return (
      <PipelineView
        changeSelectedComponent={this.props.changeSelectedComponent}
        components={this.setSelectedComponent()}
        deleteComponent={this.props.deleteComponent}
        getRedisKey={this.getRedisKey}
      />
    );
  }
}

export default PipelineContainer;
