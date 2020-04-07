import ReactResizeDetector from "react-resize-detector";
import React, { Component } from "react";
import clsx from "clsx";
import {
  withStyles,
  Card,
  Grid,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import "./base-component-style.css";
import "jsplumb/css/jsplumbtoolkit-defaults.css";
import jsplumb from "jsplumb";

const styles = () => ({
  gridItem: {
    marginBottom: "1.5em",
    cursor: "initial",
  },
  glow: {
    border: "2.5px solid rgb(86, 180, 239)",
    boxShadow:
      "0px 1px 3px rgba(0, 0, 0, 0.05) inset, 0px 0px 8px rgba(82, 168, 236, 0.6)",
  },
  closeButton: {
    cursor: "pointer",
    float: "right",
    width: "20px",
    cursor: "pointer",
  },
  componentCard: {
    backgroundColor: "#b5b5b533",
    cursor: "pointer",
  },
  emptyComponent: {
    textAlign: "center",
    marginBottom: "2.5em",
  },
  thinText: {
    fontFamily: "Roboto Thin",
  },
});

export class BaseComponentView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      update: 0,
    };
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.onResize();
      this.addArrows();
    }, 400);
  }

  addArrows = () => {
    if (this.props.routineList) {
      this.jsPlumbInstance.reset();
      this.jsPlumbLib.reset();
      this.jsPlumbInstance.importDefaults({
        Connector: ["Straight"],
        Anchors: ["Right", "LeftMiddle"],
        Overlays: [["Arrow", { location: 1 }]],
      });

      for (let index = 0; index < this.props.routineList.length; index++) {
        this.onResize();

        let currRoutine = this.props.componentData.name + "_item_" + index;
        let nextRoutine =
          this.props.componentData.name + "_item_" + (index + 1);
        if (
          this.props.nodeRefs[currRoutine] &&
          this.props.nodeRefs[nextRoutine]
        ) {
          this.props.linkList.forEach((currLink) => {
            this.onResize();

            if (
              currLink.source === currRoutine &&
              currLink.target === nextRoutine
            ) {
              this.jsPlumbInstance.connect({
                source: this.props.nodeRefs[currRoutine].current,
                target: this.props.nodeRefs[nextRoutine].current,
                endpoint: "Blank",
                anchor: "Continuous",
                overlays: [
                  [
                    "Label",
                    {
                      label: currLink.link,
                      location: [0.5],
                      cssClass: "endpointSourceLabel",
                    },
                  ],
                ],
              });
            }
          });
        }
      }
    }
  };

  componentDidMount() {
    this.jsPlumbLib = jsplumb.jsPlumb;
    this.jsPlumbInstance = this.jsPlumbLib.getInstance();
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    this.jsPlumbLib.reset();
    this.jsPlumbInstance.reset();
  }

  onResize = () => {
    this.jsPlumbInstance.repaintEverything();
  };

  deleteComponent = () => {
    this.jsPlumbLib.reset();
    this.jsPlumbInstance.reset();
    this.props.deleteComponent();
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid item className={classes.gridItem} xs={4}>
        <Card
          className={clsx({
            [classes.glow]: this.props.isSelected,
          })}
        >
          <CardHeader
            subheader={
              <React.Fragment>
                {this.props.componentData.name}
                <Delete
                  onClick={this.deleteComponent}
                  className={classes.closeButton}
                ></Delete>
              </React.Fragment>
            }
          />
          <CardContent
            onClick={() => this.props.changeSelected(this.props.componentData)}
            className={classes.componentCard}
          >
            {!this.props.componentData.routines ||
            (Array.isArray(this.props.componentData.routines) &&
              this.props.componentData.routines.length === 0) ? (
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
              <ReactResizeDetector
                handleWidth
                handleHeight
                onResize={this.onResize}
              >
                <React.Fragment>{this.props.children}</React.Fragment>
              </ReactResizeDetector>
            )}
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(BaseComponentView);
