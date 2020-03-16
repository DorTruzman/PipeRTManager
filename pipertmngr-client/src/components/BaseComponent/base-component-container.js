import React, { Component } from "react";
import ReactDOM from "react-dom";
import BaseComponentView from "./base-component-view";
import * as SRD from "storm-react-diagrams";
import ServerConfig from "../../config/server";

export class BaseComponentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { prevZoomLevel: 100, canvasRef: React.createRef() };
  }

  componentDidUpdate() {
    if (this.props.componentData && this.props.componentData.routines) {
      this.setUpDiagram();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props !== nextProps ||
      !this.areStatesEqual(this.state, nextState) ||
      !this.areAllNodesRendered(this.state)
    ) {
      return true;
    }

    return false;
  }

  remakeModel = () => {
    this.forceUpdate();
  };

  areStatesEqual = (currentState, nextState) => {
    return (
      currentState.canvasRef &&
      currentState.canvasRef.current &&
      nextState.canvasRef.current &&
      currentState.routines === nextState.routines &&
      currentState.componentData === nextState.componentData &&
      ((currentState.diagramEngine && nextState.diagramEngine) ||
        !nextState.diagramEngine)
    );
  };

  areAllNodesRendered = state => {
    let model = this.state.diagramModel;

    if (model) {
      let allNodes = Object.keys(model.getNodes());
      if (
        Array.isArray(allNodes) &&
        allNodes.length !== this.state.routineList.length
      ) {
        return false;
      }
    }

    return true;
  };

  getNodeByName = (nodes, name) => {
    let keysArray = Object.keys(nodes);
    for (let i = 0; i < keysArray.length; i++) {
      if (nodes[keysArray[i]].name && nodes[keysArray[i]].name === name) {
        return nodes[keysArray[i]];
      }
    }

    return null;
  };

  resizeHandler = widgetReference => {
    if (this.state.diagramEngine) {
      if (widgetReference) {
        if (this.state.diagramEngine.canvas !== widgetReference) {
          this.state.diagramEngine.setCanvas(widgetReference);
        }

        this.state.diagramEngine.zoomToFit();
      }
    }
  };

  zoomUpdatedHandler = e => {
    let { prevZoomLevel } = this.state;
    let currentZoomLevel = e.zoom;
    let roundedCurrentZoom = Math.ceil(currentZoomLevel / 10) * 10;
    if (roundedCurrentZoom != 100 && currentZoomLevel === prevZoomLevel) {
      this.forceUpdate();
    }
    this.setState({
      prevZoomLevel: currentZoomLevel
    });
  };

  composeLinks = (routineList, model) => {
    let allNodes = model.getNodes();

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
        let currNode = this.getNodeByName(allNodes, currRoutine.params.name);
        let nextNode = this.getNodeByName(allNodes, nextRoutine.params.name);
        let link = currNode.getOutPorts()[0].link(nextNode.getInPorts()[0]);
        link.setColor("black");
        link.addLabel(currRoutine.params[ServerConfig.QUEUE_SEND]);
        model.addLink(link);
      }
    }
  };

  composeNodesAndPorts = (routineList, model) => {
    let currentX = 0;

    routineList.forEach((routine, index) => {
      // let randomColor = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
      let randomColor = ["green", "red", "blue", "orange", "black", "purple"][
        index % 6
      ];
      let node = new SRD.DefaultNodeModel(routine.params.name, randomColor);
      if (routine.params[ServerConfig.QUEUE_READ]) {
        node.addInPort("In");
      }
      if (routine.params[ServerConfig.QUEUE_SEND]) {
        node.addOutPort("Out");
      }
      node.x = currentX;
      currentX += 175;
      model.addNode(node);
    });
  };

  setUpEngineAndModel = () => {
    let engine = new SRD.DiagramEngine();
    engine.installDefaultFactories();
    engine.setCanvas(ReactDOM.findDOMNode(this.state.canvasRef.current));

    let model = new SRD.DiagramModel();
    this.composeNodesAndPorts(this.state.routineList, model);
    this.composeLinks(this.state.routineList, model);

    engine.setDiagramModel(model);
    model.setLocked(true);
    engine.nodesRendered = true;

    model.addListener({
      zoomUpdated: this.zoomUpdatedHandler
    });

    this.setState({
      diagramEngine: engine,
      diagramModel: model
    });
  };

  setUpDiagram = () => {
    this.setState(
      {
        routineList: this.props.componentData.routines
          ? this.props.componentData.routines
          : [],
        prevZoomLevel: 100
      },
      this.setUpEngineAndModel
    );
  };

  deleteComponent = () => {
    this.props.deleteComponent(this.props.componentData);
  };

  render() {
    return (
      <BaseComponentView
        isSelected={
          this.props.componentData && this.props.componentData.isSelected
        }
        diagramEngine={this.state.diagramEngine}
        diagramModel={this.state.diagramModel}
        componentData={this.props.componentData}
        changeSelected={this.props.changeSelected}
        deleteComponent={this.deleteComponent}
        canvasRef={this.state.canvasRef}
        remakeModel={this.remakeModel}
        resizeHandler={this.resizeHandler}
        zoomUpdatedHandler={this.zoomUpdatedHandler}
      />
    );
  }
}

export default BaseComponentContainer;
