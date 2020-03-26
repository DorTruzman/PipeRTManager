import React, { Component } from "react";
import WorkAreaView from "./work-area-view";
import ServerConfig from "../../config/server";
import YAML from "json-to-pretty-yaml";
import jsYAML from "js-yaml";

export class WorkAreaContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      successMessage: "",
      showSuccessMessage: false,
      showPipelineForm: false
    };
  }

  togglePipelineForm = () => {
    this.setState({
      showPipelineForm: !this.state.showPipelineForm
    });
  };

  loadPipeline = async (buffer, isYaml) => {
    let pipelineData;
    let routineList = await fetch(
      ServerConfig.SERVER_URL + ServerConfig.ROUTE_GET_ROUTINES
    );
    routineList = await routineList.json();
    routineList = routineList.routines;

    let routineTypes = {};

    routineList.forEach(routine => {
      routineTypes[routine.name] = routine.type;
    });

    if (isYaml) {
      pipelineData = jsYAML.load(buffer);
      pipelineData = pipelineData.map(comp => {
        return {
          name: comp.name,
          routines: comp.routines.map(routine => {
            let paramsObject = { ...routine };
            delete paramsObject.routine_type_name;

            return {
              routine_type_name: routine.routine_type_name,
              routine_type: routineTypes[routine.routine_type_name],
              params: { ...paramsObject }
            };
          })
        };
      });
    } else {
      pipelineData = JSON.parse(buffer);
    }

    this.props.setPipeline(pipelineData);
  };

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
      localStorage.setItem("lastPipeline", JSON.stringify(userComponents));

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
              routine_type_name: currRoutine.routine_type_name,
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
      let filename = "PipelineExport.yaml";
      let contentType = "application/text;charset=utf-8;";
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        var blob = new Blob(
          [decodeURIComponent(encodeURI(YAML.stringify(componentsToSend)))],
          { type: contentType }
        );
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        var a = document.createElement("a");
        a.download = filename;
        a.href =
          "data:" +
          contentType +
          "," +
          encodeURIComponent(YAML.stringify(componentsToSend));
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      this.toggleSuccessMessage("SAVED");
    });
  };

  toggleSuccessMessage = successMessage => {
    this.setState({
      successMessage:
        typeof successMessage === "string"
          ? successMessage.toString()
          : this.state.successMessage,
      showSuccessMessage: !this.state.showSuccessMessage
    });
  };

  render() {
    return (
      <WorkAreaView
        togglePipelineForm={this.togglePipelineForm}
        loadPipeline={this.loadPipeline}
        savePipeline={this.savePipeline}
        killPipeline={this.killPipeline}
        changeSelectedComponent={this.props.changeSelectedComponent}
        createComponent={this.props.createComponent}
        createRoutine={this.props.createRoutine}
        toggleComponentForm={this.props.toggleComponentForm}
        components={this.props.components}
        isSideBarOpen={this.props.isSideBarOpen}
        showComponentForm={this.props.showComponentForm}
        showPipelineForm={this.state.showPipelineForm}
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
