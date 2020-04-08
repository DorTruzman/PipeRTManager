import React, { Component } from "react";
import WorkAreaView from "./work-area-view";
import ServerConfig from "../../config/server";
import YAML from "json-to-pretty-yaml";
import jsYAML from "js-yaml";
import ServerUtils from "../../utils/ServerUtils";

export class WorkAreaContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      successMessage: "",
      showSuccessMessage: false,
      showPipelineForm: false,
      showSpinner: false,
      routineList: [],
      routineTypes: [],
    };
  }

  async componentDidMount() {
    await this.initRoutines();
  }

  initRoutines = async () => {
    let routineList = await ServerUtils.getRoutines();
    let routineTypes = {};
    routineList.forEach((routine) => {
      routineTypes[routine.name] = routine.type;
    });
    this.setState({ routineList: routineList, routineTypes: routineTypes });
  };

  toggleSpinner = (toggleState) => {
    let spinnerState = !this.state.showSpinner;

    if (toggleState === "ON") {
      spinnerState = true;
    } else if (toggleState === "OFF") {
      spinnerState = false;
    }

    this.setState({
      showSpinner: spinnerState,
    });
  };

  togglePipelineForm = () => {
    this.setState({
      showPipelineForm: !this.state.showPipelineForm,
    });
  };

  createComponentJson = (component) => {
    let retComponent = {
      name: component.name,
      routines:
        component.routines &&
        component.routines.map((routine) => {
          let paramsObject = { ...routine };
          delete paramsObject.routine_type_name;

          return {
            routine_type_name: routine.routine_type_name,
            routine_type: this.state.routineTypes[routine.routine_type_name],
            params: { ...paramsObject },
          };
        }),
    };

    return retComponent;
  };

  loadComponent = (newComponent) => {
    let pipelineData = this.props.components;
    let compName = Object.keys(newComponent)[0];
    pipelineData.push(this.createComponentJson(compName, newComponent));
    this.props.setPipeline(pipelineData);
  };

  loadPipeline = (buffer, isYaml) => {
    let pipelineData;

    if (isYaml) {
      pipelineData = jsYAML.load(buffer);
      pipelineData = pipelineData.components;
      let componentsList = Object.keys(pipelineData);
      pipelineData = componentsList.map((comp) => {
        return this.createComponentJson(comp, pipelineData[comp]);
      });
    } else {
      pipelineData = JSON.parse(buffer);
    }

    this.props.setPipeline(pipelineData);
  };

  createComponentJson = (compKey, pipelineDataCompKey) => {
    let comp = pipelineDataCompKey;
    let routines = comp.routines && Object.keys(comp.routines);

    return {
      name: compKey,
      routines:
        routines &&
        routines.map((routineKey) => {
          let routine = comp.routines[routineKey];
          let paramsObject = { ...routine };
          delete paramsObject.routine_type_name;

          return {
            routine_type_name: routine.routine_type_name,
            routine_type: this.state.routineTypes[routine.routine_type_name],
            params: { name: routineKey, ...paramsObject },
          };
        }),
    };
  };

  killPipeline = () => {
    this.toggleSpinner("ON");

    ServerUtils.killPipeline()
      .then(() => {
        this.toggleSuccessMessage("KILLED");
        this.toggleSpinner("OFF");
      })
      .catch(() => {
        this.toggleErrorMessage("KILLED");
        this.toggleSpinner("OFF");
      });
  };

  savePipeline = () => {
    this.toggleSpinner("ON");
    let userComponents = [...this.props.components];
    let componentsToSend = {};

    if (Array.isArray(userComponents) && userComponents.length > 0) {
      localStorage.setItem("lastPipeline", JSON.stringify(userComponents));

      userComponents.forEach((currentComponent, index) => {
        componentsToSend[currentComponent.name] = {
          queues: [],
        };

        let currrentComponentObject = componentsToSend[currentComponent.name];

        if (
          Array.isArray(currentComponent.routines) &&
          currentComponent.routines.length > 0
        ) {
          currrentComponentObject.routines = {};

          for (
            let currRoutineIndex = 0;
            currRoutineIndex < currentComponent.routines.length;
            currRoutineIndex++
          ) {
            let currRoutine = currentComponent.routines[currRoutineIndex];
            let currRoutineParams = { ...currRoutine.params };
            delete currRoutineParams.name;

            currrentComponentObject.routines[currRoutine.params.name] = {
              routine_type_name: currRoutine.routine_type_name,
              ...currRoutineParams,
            };

            Object.keys(currRoutine.params).forEach((currParam) => {
              let parameterValue = currRoutine.params[currParam];

              if (
                !currrentComponentObject.queues.includes(parameterValue) &&
                (currParam === ServerConfig.QUEUE_READ ||
                  currParam === ServerConfig.QUEUE_SEND)
              ) {
                currrentComponentObject.queues.push(parameterValue);
              }
            });
          }
        }
      });
    }

    componentsToSend = {
      components: componentsToSend,
    };

    ServerUtils.savePipeline(componentsToSend)
      .then(() => {
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
        this.toggleSpinner("OFF");
      })
      .catch(() => {
        this.toggleErrorMessage("SAVED");
        this.toggleSpinner("OFF");
      });
  };

  toggleErrorMessage = (errorMessage) => {
    this.setState({
      errorMessage:
        typeof errorMessage === "string"
          ? errorMessage.toString()
          : this.state.errorMessage,
      showErrorMessage: !this.state.showErrorMessage,
    });
  };

  toggleSuccessMessage = (successMessage) => {
    this.setState({
      successMessage:
        typeof successMessage === "string"
          ? successMessage.toString()
          : this.state.successMessage,
      showSuccessMessage: !this.state.showSuccessMessage,
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
        showErrorMessage={this.state.showErrorMessage}
        toggleSuccessMessage={this.toggleSuccessMessage}
        toggleErrorMessage={this.toggleErrorMessage}
        successMessage={this.state.successMessage}
        errorMessage={this.state.errorMessage}
        showSpinner={this.state.showSpinner}
        loadComponent={this.loadComponent}
      />
    );
  }
}

export default WorkAreaContainer;
