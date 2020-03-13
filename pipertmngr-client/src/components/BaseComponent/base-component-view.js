import React, { useState } from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Card,
  Grid,
  CardContent,
  CardHeader,
  Button,
  Typography
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as SRD from "storm-react-diagrams";
import "./base-component-style.css";

const useStyles = makeStyles(theme => ({
  gridItem: {
    marginBottom: "1.5em",
    cursor: "initial"
  },
  glow: {
    border: "2.5px solid rgb(86, 180, 239)",
    boxShadow:
      "0px 1px 3px rgba(0, 0, 0, 0.05) inset, 0px 0px 8px rgba(82, 168, 236, 0.6)"
  },
  closeButton: {
    cursor: "pointer",
    float: "right",
    width: "20px",
    cursor: "pointer"
  },
  componentCard: {
    backgroundColor: "#b5b5b533",
    cursor: "pointer"
  },
  emptyComponent: {
    textAlign: "center",
    marginBottom: "2.5em"
  },
  thinText: {
    fontFamily: "Roboto Thin"
  }
}));

export default function BaseComponentView(props) {
  const classes = useStyles();
  const theme = useTheme();
  let prevZoomLevel = 100;
  const routineList = props.componentData.routines
    ? props.componentData.routines
    : [];

  // 1) setup the diagram engine
  var engine = new SRD.DiagramEngine();
  engine.installDefaultFactories();
  engine.setCanvas(document.getElementById("cardCanvas"));
  engine.setSmartRoutingStatus(true);

  // 2) setup the diagram model
  var model = new SRD.DiagramModel();
  let currentX = 0;

  const getNodeByName = (nodes, name) => {
    let keysArray = Object.keys(nodes);
    for (let i = 0; i < keysArray.length; i++) {
      if (nodes[keysArray[i]].name && nodes[keysArray[i]].name === name) {
        return nodes[keysArray[i]];
      }
    }

    return null;
  };

  routineList.forEach((routine, index) => {
    let randomColor = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
    let node = new SRD.DefaultNodeModel(routine.params.name, randomColor);
    if (routine.params.queue_in) {
      node.addInPort("In");
    }
    if (routine.params.queue_out) {
      node.addOutPort("Out");
    }
    node.x = currentX;
    currentX += 170;
    model.addNode(node);
  });

  let allNodes = model.getNodes();

  for (let i = 0; i < routineList.length - 1; i++) {
    let currRoutine = routineList[i];
    let nextRoutine = routineList[i + 1];

    if (
      currRoutine.params.hasOwnProperty("queue_out") &&
      nextRoutine.params.hasOwnProperty("queue_in") &&
      currRoutine.params.queue_out === nextRoutine.params.queue_in
    ) {
      // Find the nodes
      let currNode = getNodeByName(allNodes, currRoutine.params.name);
      let nextNode = getNodeByName(allNodes, nextRoutine.params.name);
      let link = currNode.getOutPorts()[0].link(nextNode.getInPorts()[0]);
      link.setColor("black");
      link.addLabel(currRoutine.params.queue_out);
      model.addLink(link);
    }
  }

  // 7) load model into engine
  engine.setDiagramModel(model);
  model.setLocked(true);

  model.addListener({
    zoomUpdated: function(e) {
      let currentZoomLevel = e.zoom;
      let roundedCurrentZoom = Math.ceil(currentZoomLevel / 10) * 10;

      if (roundedCurrentZoom != 100 && currentZoomLevel === prevZoomLevel) {
        props.forceAnUpdate();
      }

      prevZoomLevel = currentZoomLevel;
    }
  });

  window.addEventListener("resize", () => {
    if (props.componentData.routines) {
      engine.zoomToFit();
    }
  });

  return (
    <Grid item className={classes.gridItem} xs={5}>
      <Card
        className={clsx({
          [classes.glow]: props.isSelected
        })}
      >
        <CardHeader
          subheader={
            <React.Fragment>
              {props.componentData.name}
              <Delete
                onClick={props.deleteComponent}
                className={classes.closeButton}
              ></Delete>
            </React.Fragment>
          }
        />
        <CardContent
          onClick={() => props.changeSelected(props.componentData)}
          id="cardCanvas"
          className={classes.componentCard}
        >
          {!props.componentData.routines ? (
            <div className={classes.emptyComponent}>
              <div>
                <Typography className={classes.thinText} variant="h5">
                  IT'S LONELY IN HERE... &#128579;
                </Typography>
              </div>
              <div>
                <Typography variant="h5">
                  ADD SOME ROUTINES TO THE MIX!
                </Typography>
              </div>
            </div>
          ) : (
            <SRD.DiagramWidget
              allowLooseLinks={false}
              allowCanvasTranslation={false}
              allowCanvasZoom={false}
              setLocked={true}
              className={"srd-demo-canvas"}
              diagramEngine={engine}
            />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}
