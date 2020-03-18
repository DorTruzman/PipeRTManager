import React, { Component } from "react";
import WorkAreaView from "./work-area-view";
import ServerConfig from "../../config/server";

export class WorkAreaContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      successMessage: "",
      showSuccessMessage: false
    };
  }

  killPipeline = () => {
    fetch(ServerConfig.SERVER_URL + ServerConfig.ROUTE_KILL_PIPELINE, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => {
      this.toggleSuccessMessage("KILLED");
    });
  };

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
              routine_type_name: currRoutine.routineTypeName,
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
      this.toggleSuccessMessage("SAVED");
    });
  };

  toggleSuccessMessage = successMessage => {
    this.setState({
      successMessage: successMessage.toString(),
      showSuccessMessage: !this.state.showSuccessMessage
    });
  };

  render() {
    return (
      <WorkAreaView
        savePipeline={this.savePipeline}
        killPipeline={this.killPipeline}
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
        successMessage={this.state.successMessage}
      />
    );
  }
}

export default WorkAreaContainer;
