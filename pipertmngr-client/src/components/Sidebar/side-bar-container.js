import React, { Component } from "react";
import SideBarView from "./side-bar-view";

export class SideBarContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routinesList: [],
      showRoutineForm: false,
      isComponentSelected: true
    };

    this.getAllRoutines();
  }

  // TODO: Change this to toggle
  openRoutineForm = routineData => {
    if (this.props.isComponentSelected) {
      this.setState({
        isComponentSelected: true,
        showRoutineForm: true,
        routineData: routineData
      });
    } else {
      this.setState({
        isComponentSelected: false
      });
    }
  };

  closeRoutineForm = () => {
    this.setState({
      showRoutineForm: false
    });
  };

  getAllRoutines = () => {
    fetch("http://localhost:3000/routines")
      .then(res => res.json())
      .then(res => {
        if (res.routines) {
          this.setState({
            routinesList: res.routines
          });
        }
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
        showRoutineForm={this.state.showRoutineForm}
        openRoutineForm={this.openRoutineForm}
        closeRoutineForm={this.closeRoutineForm}
        routineData={this.state.routineData}
        createRoutine={this.props.createRoutine}
        isComponentSelected={this.state.isComponentSelected}
      />
    );
  }
}

export default SideBarContainer;
