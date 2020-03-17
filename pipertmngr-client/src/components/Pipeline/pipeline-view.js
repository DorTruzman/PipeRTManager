import React from "react";
import { makeStyles, useTheme, Grid, Typography } from "@material-ui/core";
import BaseComponentContainer from "../BaseComponent";

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: "2em",
    textAlign: "center"
  },
  arrowMargin: {
    marginTop: "4em",
    textAlign: "center"
  },
  redisLogo: {
    marginTop: "4.5em",
    height: "4em"
  },
  arrow: {
    height: "3em"
  }
}));

export default function PipelineView(props) {
  const classes = useStyles();
  const theme = useTheme();

  const getIOArrow = (IOData, isInput) => {
    if (!IOData || !IOData.redisKeys || !IOData.streamKeys) {
      return null;
    }

    let IOTypes = [];
    let IOKeys = [];

    if (isInput) {
      if (!IOData.redisKeys.redisIn && !IOData.streamKeys.streamIn) {
        return null;
      } else {
        if (IOData.redisKeys.redisIn) {
          IOTypes.push("REDIS");
          IOKeys.push(IOData.redisKeys.redisIn);
        }
        if (IOData.streamKeys.streamIn) {
          IOTypes.push("STREAM");
          IOKeys.push(IOData.streamKeys.streamIn);
        }
      }
    } else {
      if (!IOData.redisKeys.redisOut && !IOData.streamKeys.streamOut) {
        return null;
      } else {
        if (IOData.redisKeys.redisOut) {
          IOTypes.push("REDIS");
          IOKeys.push(IOData.redisKeys.redisOut);
        }
        if (IOData.streamKeys.streamOut) {
          IOTypes.push("STREAM");
          IOKeys.push(IOData.streamKeys.streamOut);
        }
      }
    }

    return (
      <React.Fragment>
        <Grid item>
          <div className={classes.arrowMargin}>
            <Typography variant="subtitle2">
              <b>TYPE:</b> {IOTypes.join(", ")}
            </Typography>
            <div>
              <img className={classes.arrow} src="./images/arrow.png"></img>
            </div>
            <Typography variant="subtitle2">
              <b>KEY:</b> {IOKeys.join(", ")}
            </Typography>
          </div>
        </Grid>
        {!isInput && IOTypes.includes("REDIS") && (
          <Grid item>
            <img
              src="./images/redisLogo.png"
              className={classes.redisLogo}
            ></img>
          </Grid>
        )}
      </React.Fragment>
    );
  };

  const makeComponents = components => {
    return components.map(function(comp, index) {
      let IOData = props.getComponentIO(components[index]);

      return (
        <React.Fragment>
          {getIOArrow(IOData, true)}
          <BaseComponentContainer
            changeSelected={props.changeSelectedComponent}
            componentData={comp}
            deleteComponent={props.deleteComponent}
          />
          {getIOArrow(IOData, false)}
        </React.Fragment>
      );
    });
  };

  return (
    <Grid container spacing={1}>
      {makeComponents(props.components)}
    </Grid>
  );
}
