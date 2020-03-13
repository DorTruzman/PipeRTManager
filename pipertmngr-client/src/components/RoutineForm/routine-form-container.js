import React, { Component } from "react";
import RoutineFormView from "./routine-form-view";

export class RoutineFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      componentName: null,
      routineParams: {}
    };
  }

  componentDidMount() {
    this.getParams();
  }

  createRoutine = routineParams => {
    this.props.createRoutine({
      routineName: this.props.routineData.name,
      params: {
        ...routineParams
      }
    });

    this.props.closeRoutineForm();
  };

  getParams = async () => {
    const fetchRes = await fetch(
      "http://localhost:3000/routineParams/" + this.props.routineData.name
    );
    const resJSON = await fetchRes.json();

    this.setState({
      routineParams: resJSON
    });
  };

  render() {
    return (
      <RoutineFormView
        routineData={this.props.routineData}
        routineParams={this.state.routineParams}
        createComponent={this.createComponent}
        createRoutine={this.createRoutine}
        closeRoutineForm={this.props.closeRoutineForm}
      />
    );
  }
}

export default RoutineFormContainer;
