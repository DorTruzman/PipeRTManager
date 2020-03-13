import React, { Component } from "react";
import WorkAreaView from "./work-area-view";

export class WorkAreaContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      components: [],
      showComponentForm: false,
      selectedComponent: null
    };
  }

  changeSelectedComponent = componentData => {
    if (componentData && componentData.name) {
      this.setState({
        selectedComponent: componentData.name
      });

      this.props.setComponentSelectedState(true);
    } else {
      this.setState({
        selectedComponent: null
      });

      this.props.setComponentSelectedState(false);
    }
  };

  toggleComponentForm = toggleMode => {
    this.setState({
      showComponentForm: toggleMode
    });
  };

  deleteComponent = componentData => {
    let componentsAfterDeletions = this.state.components.filter(comp => {
      return comp.name !== componentData.name;
    });

    if (componentData.name === this.state.selectedComponent) {
      this.changeSelectedComponent(null);
    }

    this.setState({
      components: componentsAfterDeletions
    });
  };

  createComponent = name => {
    this.state.components.forEach(componentData => {
      if (name === componentData.name) {
        name = "Copy of " + name;
      }
    });

    let componentToCreate = {
      name,
      type: "TEST_TYPE"
    };

    let currentComponents = this.state.components;
    currentComponents.push(componentToCreate);

    this.setState({
      components: currentComponents
    });

    this.toggleComponentForm(false);
  };

  createRoutine = routineWithParams => {
    let mutableComponents = [...this.state.components];

    mutableComponents.forEach(componentData => {
      if (this.state.selectedComponent === componentData.name) {
        if (!componentData.routines) {
          componentData.routines = [];
        }

        componentData.routines.push(routineWithParams);
      }
    });

    this.setState({
      components: mutableComponents
    });
  };

  render() {
    return (
      <WorkAreaView
        changeSelectedComponent={this.changeSelectedComponent}
        createComponent={this.createComponent}
        createRoutine={this.createRoutine}
        toggleComponentForm={this.toggleComponentForm}
        components={this.state.components}
        isSideBarOpen={this.props.isSideBarOpen}
        showComponentForm={this.state.showComponentForm}
        selectedComponent={this.state.selectedComponent}
        deleteComponent={this.deleteComponent}
      />
    );
  }
}

export default WorkAreaContainer;
