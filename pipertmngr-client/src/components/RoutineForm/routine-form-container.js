import React, { Component } from "react";
import RoutineFormView from "./routine-form-view";
import ServerUtils from "../../utils/ServerUtils";
import server from "../../config/server";

export class RoutineFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routineParams: {},
      notFilledFields: [],
      parametersInput: {},
    };
  }

  async componentDidMount() {
    this.getParams();
  }

  setSelectState = (value, param) => {
    let { parametersInput } = this.state;
    parametersInput[param] = value;

    this.setState({
      parametersInput,
    });
  };

  setInputState = (e, param, isInteger) => {
    let { parametersInput } = this.state;
    parametersInput[param] = isInteger
      ? parseInt(e.target.value)
      : e.target.value;

    this.setState({
      parametersInput,
    });
  };

  createRoutine = () => {
    let { parametersInput } = this.state;
    let notFilledFields = [];

    Object.keys(this.state.routineParams).forEach((param) => {
      if (
        !parametersInput[param] ||
        parametersInput[param].toString().trim() === ""
      ) {
        notFilledFields.push(param);
      }
    });

    if (notFilledFields.length === 0) {
      this.props.createRoutine({
        routine_type_name: this.props.routineData.name,
        routine_type: this.props.routineData.type,
        params: {
          ...parametersInput,
        },
      });

      this.props.closeRoutineForm();
    } else {
      this.setState({
        notFilledFields,
      });
    }
  };

  getParams = async () => {
    const routineParams = await ServerUtils.getRoutineParams(
      this.props.routineData.name
    );
    this.setState({
      routineParams,
    });
  };

  render() {
    return (
      <RoutineFormView
        selectedComponent={this.props.selectedComponent}
        routineData={this.props.routineData}
        routineParams={this.state.routineParams}
        createComponent={this.createComponent}
        createRoutine={this.createRoutine}
        closeRoutineForm={this.props.closeRoutineForm}
        notFilledFields={this.state.notFilledFields}
        setInputState={this.setInputState}
        setSelectState={this.setSelectState}
        components={this.props.components}
      />
    );
  }
}

export default RoutineFormContainer;
