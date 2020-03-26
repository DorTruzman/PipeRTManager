import React, { Component } from "react";
import SideBarView from "./side-bar-view";
import ServerConfig from "../../config/server";
import ServerUtils from "../../utils/ServerUtils";

export class SideBarContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routinesList: [],
      displayRoutineForm: false,
      isComponentSelected: true
    };

    this.getAllRoutines();
  }

  toggleRoutineForm = (routineData, toggleState) => {
    if (!toggleState) {
      this.setState({
        displayRoutineForm: false
      });
    } else if (this.props.isComponentSelected) {
      this.setState({
        isComponentSelected: true,
        displayRoutineForm: true,
        routineData: routineData
      });
    } else {
      this.setState({
        isComponentSelected: false
      });
    }
  };

  getAllRoutines = async () => {
    const routinesList = await ServerUtils.getRoutines();
    this.setState({
      routinesList
    });
  };

  render() {
    return (
      <SideBarView
        sideBarWidth={this.props.sideBarWidth}
        isSideBarOpen={this.props.isSideBarOpen}
        toggleSideBar={this.props.toggleSideBar}
        routes={this.props.routes}
        routinesList={this.state.routinesList}
        displayRoutineForm={this.state.displayRoutineForm}
        toggleRoutineForm={this.toggleRoutineForm}
        routineData={this.state.routineData}
        createRoutine={this.props.createRoutine}
        isComponentSelected={this.state.isComponentSelected}
        selectedComponent={this.props.selectedComponent}
      />
    );
  }
}

export default SideBarContainer;
