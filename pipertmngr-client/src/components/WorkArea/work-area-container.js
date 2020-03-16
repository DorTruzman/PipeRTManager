import React, { Component } from "react";
import WorkAreaView from "./work-area-view";
import ServerConfig from "../../config/server";

export class WorkAreaContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSuccessMessage: false
    };
  }

  savePipeline = () => {
    let userComponents = [...this.props.components];
    let componentsToSend = [];

    if (Array.isArray(userComponents) && userComponents.length > 0) {
      userComponents.forEach((currentComponent, index) => {
        componentsToSend.push({
          name: currentComponent.name,
          queues: []
        });

        if (
          Array.isArray(currentComponent.routines) &&
          currentComponent.routines.length > 0
        ) {
          componentsToSend[index].routines = [];

          for (
            let currRoutineIndex = 0;
            currRoutineIndex < currentComponent.routines.length;
            currRoutineIndex++
          ) {
            let currRoutine = currentComponent.routines[currRoutineIndex];
            componentsToSend[index].routines.push({
              routine_name: currRoutine.routineName,
              ...currRoutine.params
            });

            Object.keys(currRoutine.params).forEach(currParam => {
              let parameterValue = currRoutine.params[currParam];

              if (
                !componentsToSend[index].queues.includes(parameterValue) &&
                (currParam === ServerConfig.QUEUE_READ ||
                  currParam === ServerConfig.QUEUE_SEND)
              ) {
                componentsToSend[index].queues.push(parameterValue);
              }
            });
          }
        }
      });
    }

    fetch(ServerConfig.SERVER_URL + ServerConfig.ROUTE_SAVE_PIPELINE, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(componentsToSend)
    }).then(() => {
      this.toggleSuccessMessage();
    });
  };

  toggleSuccessMessage = () => {
    this.setState({
      showSuccessMessage: !this.state.showSuccessMessage
    });
  };

  render() {
    return (
      <WorkAreaView
        savePipeline={this.savePipeline}
        changeSelectedComponent={this.props.changeSelectedComponent}
        createComponent={this.props.createComponent}
        createRoutine={this.props.createRoutine}
        toggleComponentForm={this.props.toggleComponentForm}
        components={this.props.components}
        isSideBarOpen={this.props.isSideBarOpen}
        showComponentForm={this.props.showComponentForm}
        selectedComponent={this.props.selectedComponent}
        deleteComponent={this.props.deleteComponent}
        showSuccessMessage={this.state.showSuccessMessage}
        toggleSuccessMessage={this.toggleSuccessMessage}
      />
    );
  }
}

export default WorkAreaContainer;
