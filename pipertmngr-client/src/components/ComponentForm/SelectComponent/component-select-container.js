import React, { Component } from "react";
import ComponentSelectView from "./component-select-view";
import ServerUtils from "../../../utils/ServerUtils";
import { TransferWithinAStationSharp } from "@material-ui/icons";
export class ComponentSelectContainer extends Component {
  constructor(props) {
    super(props);
    // notice - the component name is unique
    this.state = {
      componentNameSelect: "",
      componentSelect: null,
      componentNameList: [],
      componentList: [],
    };
  }

  async componentDidMount() {
    var result = await ServerUtils.getComponent();
    var resultNames = await result.map((elm) => elm.name);

    this.setState({
      componentNameList: resultNames,
      componentList: result,
    });
  }

  selectComponent = (selected) => {
    let comp = this.state.componentList.find((elem) => elem.name === selected);
    this.setState({ componentSelect: comp });
  };

  loadComponent = () => {
    if (this.state.componentSelect) {
      this.props.loadComponent(this.state.componentSelect);
      this.props.toggleComponentForm(false);
    }
  };

  render() {
    return (
      <div>
        <ComponentSelectView
          componentNameList={this.state.componentNameList}
          loadComponent={this.loadComponent}
          selectComponent={this.selectComponent}
          selectedComponent={this.state.componentSelect}
        ></ComponentSelectView>
      </div>
    );
  }
}

export default ComponentSelectContainer;
