import React, { Component } from "react";
import BaseComponentView from "./base-component-view";
import ServerConfig from "../../config/server";
import BaseNodeView from "../BaseNode";

export class BaseComponentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.setState({
      routineList: this.props.componentData.routines
        ? [...this.props.componentData.routines]
        : []
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      routineList: nextProps.componentData.routines
        ? [...nextProps.componentData.routines]
        : []
    });
  }

  composeLinks = () => {
    let linkList = [];
    if (this.state.routineList) {
      let { routineList } = this.state;

      for (let i = 0; i < routineList.length - 1; i++) {
        let currRoutine = routineList[i];
        let nextRoutine = routineList[i + 1];

        if (
          currRoutine.params.hasOwnProperty(ServerConfig.QUEUE_SEND) &&
          nextRoutine.params.hasOwnProperty(ServerConfig.QUEUE_READ) &&
          currRoutine.params[ServerConfig.QUEUE_SEND] ===
            nextRoutine.params[ServerConfig.QUEUE_READ]
        ) {
          // Find the nodes
          let currNode = this.props.componentData.name + "_item_" + i;
          let nextNode = this.props.componentData.name + "_item_" + (i + 1);

          linkList.push({
            source: currNode,
            target: nextNode,
            link: currRoutine.params[ServerConfig.QUEUE_SEND]
          });
        }
      }
    }

    return linkList;
  };

  createNodesDOM = () => {
    if (this.state.routineList) {
      const nodesList = this.state.routineList.map((routine, index) => {
        let randomColor = ["green", "red", "blue", "orange", "grey", "purple"][
          index % 6
        ];

        randomColor =
          "linear-gradient(90deg, #343434 0%, " + randomColor + " 100%)";
        let ports = [];

        if (routine.params[ServerConfig.QUEUE_READ]) {
          ports.push("In");
        }
        if (routine.params[ServerConfig.QUEUE_SEND]) {
          ports.push("Out");
        }
        if (ports.length === 0) {
          ports.push("None");
        }

        return (
          <BaseNodeView
            key={"Node" + index}
            ref={this.props.componentData.name + "_item_" + index}
            nodeColor={randomColor}
            routineName={routine.params.name}
            routineTypeName={routine.routine_type_name}
            ports={ports.join("/")}
          />
        );
      });

      return <div className="flex-container">{nodesList}</div>;
    }
    return null;
  };

  deleteComponent = () => {
    this.props.deleteComponent(this.props.componentData);
  };

  updateRefs = () => {
    this.forceUpdate();
  };

  render() {
    return (
      <BaseComponentView
        isSelected={
          this.props.componentData && this.props.componentData.isSelected
        }
        componentData={this.props.componentData}
        changeSelected={this.props.changeSelected}
        deleteComponent={this.deleteComponent}
        routineList={this.state.routineList}
        linkList={this.composeLinks()}
        nodeRefs={this.refs}
        updateRefs={this.updateRefs}
      >
        {this.createNodesDOM()}
      </BaseComponentView>
    );
  }
}

export default BaseComponentContainer;
