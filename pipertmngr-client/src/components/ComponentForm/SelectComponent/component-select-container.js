import React, { Component } from "react";
import ComponentSelectView from "./component-select-view";
import ServerUtils from "../../../utils/ServerUtils";
import { TransferWithinAStationSharp } from "@material-ui/icons";
export class ComponentSelectContainer extends Component {
  constructor(props) {
    super(props);
    // notice - the component name is a key
    this.state = {
      componentNameSelect: "",
      componentSelect: null,
      componentNameList: [],
      componentList: [],
    };
  }

  async componentDidMount() {
    var components = await ServerUtils.getComponent();
    var componentsNames = Object.keys(components);

    this.setState({
      componentNameList: componentsNames,
      componentList: components,
    });
  }

  selectComponent = (selected) => {
    this.setState({ componentSelect: this.state.componentList[selected] });
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
