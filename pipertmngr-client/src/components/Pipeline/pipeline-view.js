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

  const getIOArrow = (IOData, isInput, noRedis) => {
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
          IOKeys.push(
            IOData.streamKeys.streamIn.substring(
              0,
              Math.min(IOData.streamKeys.streamIn.length, 14)
            ) + "..."
          );
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
          IOKeys.push(
            IOData.streamKeys.streamOut.substring(
              0,
              Math.min(IOData.streamKeys.streamOut.length, 14)
            ) + "..."
          );
        }
      }
    }

    return {
      hasRedis: IOTypes.includes("REDIS"),
      html: (
        <React.Fragment>
          {isInput && IOTypes.includes("REDIS") && !noRedis && (
            <Grid item tag="redis">
              <img
                src="./images/redisLogo.png"
                className={classes.redisLogo}
              ></img>
            </Grid>
          )}
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
            <Grid item tag="redis">
              <img
                src="./images/redisLogo.png"
                className={classes.redisLogo}
              ></img>
            </Grid>
          )}
        </React.Fragment>
      )
    };
  };

  const composeComponentsDOM = components => {
    let redisExistence = new Array(components.length).fill(false);

    return components.map(function(comp, index) {
      if (!comp.routines) {
        comp.routines = [];
      }

      let IOData = props.getComponentIO(components[index]);
      let prefixArrow = null;

      if (index > 0 && redisExistence[index - 1]) {
        prefixArrow = getIOArrow(IOData, true, true);
      } else {
        prefixArrow = getIOArrow(IOData, true);
      }

      prefixArrow = prefixArrow && prefixArrow.html;

      let suffixArrow = getIOArrow(IOData, false);
      if (suffixArrow) {
        redisExistence[index] = suffixArrow.hasRedis;
      }

      suffixArrow = suffixArrow && suffixArrow.html;

      return (
        <React.Fragment key={"Comp" + index}>
          {prefixArrow}
          <BaseComponentContainer
            changeSelected={props.changeSelectedComponent}
            componentData={comp}
            deleteComponent={props.deleteComponent}
          />
          {suffixArrow}
        </React.Fragment>
      );
    });
  };

  return (
    <Grid container spacing={1}>
      {composeComponentsDOM(props.components)}
    </Grid>
  );
}
