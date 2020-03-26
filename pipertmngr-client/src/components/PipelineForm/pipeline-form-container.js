import React, { Component } from "react";
import PipelineFormView from "./pipeline-form-view";
import ServerConfig from "../../config/server";

export class PipelineFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parametersInput: {},
      selectedOption: null
    };
  }

  isLocalStorageAvailable = () => {
    return localStorage.getItem("lastPipeline");
  };

  changeSelected = selectedOption => {
    this.setState({
      selectedOption
    });
  };

  onFileChange = e => {
    this.setState({
      chosenFile: e.target.files[0]
    });
  };

  loadPipeline = () => {
    if (this.state.selectedOption === "CACHED") {
      this.props.loadPipeline(localStorage.getItem("lastPipeline"), false);
    } else {
      const fileReader = new FileReader();
      fileReader.onloadend = reader => {
        this.props.loadPipeline(reader.target && reader.target.result, true);
      };

      fileReader.readAsText(this.state.chosenFile);
    }

    this.props.togglePipelineForm();
  };

  render() {
    return (
      <PipelineFormView
        togglePipelineForm={this.props.togglePipelineForm}
        changeSelected={this.changeSelected}
        selectedOption={this.state.selectedOption}
        onFileChange={this.onFileChange}
        loadPipeline={this.loadPipeline}
        chosenFile={this.state.chosenFile}
        isLocalStorageAvailable={this.isLocalStorageAvailable}
      />
    );
  }
}

export default PipelineFormContainer;
