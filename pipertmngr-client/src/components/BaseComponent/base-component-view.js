import React from "react";
import ReactDOM from "react-dom";
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

  window.addEventListener("resize", () => {
    if (
      props.diagramEngine &&
      props.componentData &&
      props.componentData.routines
    ) {
      props.resizeHandler(ReactDOM.findDOMNode(props.canvasRef.current));
    }
  });

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
                onClick={props.deleteComponent}
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
            props.diagramEngine && (
              <SRD.DiagramWidget
                ref={props.canvasRef}
                allowLooseLinks={false}
                allowCanvasTranslation={false}
                allowCanvasZoom={false}
                setLocked={true}
                className={"srd-demo-canvas"}
                diagramEngine={props.diagramEngine}
              />
            )
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}
