import ReactResizeDetector from "react-resize-detector";
import React, { useEffect, createRef } from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Card,
  Grid,
  CardContent,
  CardHeader,
  Typography
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import "./base-component-style.css";
import "jsplumb/css/jsplumbtoolkit-defaults.css";
import jsplumb from "jsplumb";
const jsPlumbIn = jsplumb.jsPlumb;

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
  jsPlumbIn.reset();
  let jsPlumbInstance = jsPlumbIn.getInstance();
  jsPlumbInstance.reset();

  useEffect(() => {
    if (props.routineList) {
      jsPlumbInstance.reset();
      jsPlumbIn.reset();

      jsPlumbInstance.importDefaults({
        Connector: ["Straight"],
        Anchors: ["Right", "LeftMiddle"],
        Overlays: [["Arrow", { location: 1 }]]
      });

      for (let index = 0; index < props.routineList.length; index++) {
        let currRoutine = props.componentData.name + "_item_" + index;
        let nextRoutine = props.componentData.name + "_item_" + (index + 1);

        if (props.nodeRefs[currRoutine] && props.nodeRefs[nextRoutine]) {
          props.linkList.forEach(currLink => {
            if (
              currLink.source === currRoutine &&
              currLink.target === nextRoutine
            ) {
              jsPlumbInstance.connect({
                source: props.nodeRefs[currRoutine],
                target: props.nodeRefs[nextRoutine],
                endpoint: "Blank",
                anchor: "Continuous",
                overlays: [
                  [
                    "Label",
                    {
                      label: currLink.link,
                      location: [0.5],
                      cssClass: "endpointSourceLabel"
                    }
                  ]
                ]
              });
            }
          });
        }
      }

      props.updateRefs();
      window.dispatchEvent(new Event("resize"));
    }
  }, [props.nodeRefs, props.routineList]);

  const onResize = () => {
    jsPlumbInstance.repaintEverything();
  };

  window.addEventListener("resize", () => {
    onResize();
  });

  const deleteComponent = () => {
    jsPlumbIn.reset();
    jsPlumbInstance.reset();
    props.deleteComponent();
  };

  return (
    <Grid item className={classes.gridItem} xs={4}>
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
                onClick={deleteComponent}
                className={classes.closeButton}
              ></Delete>
            </React.Fragment>
          }
        />
        <CardContent
          onClick={() => props.changeSelected(props.componentData)}
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
              <div>
                <Typography variant="subtitle2">(CLICK ME!)</Typography>
              </div>
            </div>
          ) : (
            <ReactResizeDetector handleWidth handleHeight onResize={onResize}>
              <React.Fragment>{props.children}</React.Fragment>
            </ReactResizeDetector>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}
