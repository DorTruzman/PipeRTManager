import React, { Component } from "react";
import PipelineView from "./pipeline-view";
import ServerConfig from "../../config/server";

export class PipelineContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  setSelectedComponent() {
    if (this.props.components) {
      return this.props.components.map(comp => {
        if (
          this.props.selectedComponent &&
          comp.name === this.props.selectedComponent.name
        ) {
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
  }

  getComponentIO = componentData => {
    let streamKeys = {
        streamIn: null,
        streamOut: null
      },
      redisKeys = {
        redisIn: null,
        redisOut: null
      };

    if (!componentData.routines || !Array.isArray(componentData.routines)) {
      return {
        streamKeys,
        redisKeys
      };
    }

    let firstRoutine = componentData.routines[0];
    let finalRoutine =
      componentData.routines[componentData.routines.length - 1];

    if (firstRoutine.params && firstRoutine.params[ServerConfig.REDIS_READ]) {
      redisKeys.redisIn = firstRoutine.params[ServerConfig.REDIS_READ];
    }

    if (firstRoutine.params && firstRoutine.params["url"]) {
      streamKeys.streamIn = firstRoutine.params["url"];
    }

    if (finalRoutine.params && finalRoutine.params[ServerConfig.REDIS_SEND]) {
      redisKeys.redisOut = finalRoutine.params[ServerConfig.REDIS_SEND];
    }

    return {
      streamKeys,
      redisKeys
    };
  };

  render() {
    return (
      <PipelineView
        changeSelectedComponent={this.props.changeSelectedComponent}
        components={this.setSelectedComponent()}
        deleteComponent={this.props.deleteComponent}
        getComponentIO={this.getComponentIO}
      />
    );
  }
}

export default PipelineContainer;
