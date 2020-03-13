import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Card,
  Grid,
  CardContent,
  Typography,
  CardHeader
} from "@material-ui/core";
import { Menu, ArrowForward } from "@material-ui/icons";
import BaseComponentContainer from "../BaseComponent";

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: "2em",
    textAlign: "center"
  }
}));

export default function PipelineView(props) {
  const classes = useStyles();
  const theme = useTheme();

  const makeComponents = components => {
    return components.map(function(comp, index) {
      let htmlToReturn = null;

      if (index > 0) {
        let redisKey = props.getRedisKey(components[index - 1]);

        htmlToReturn = (
          <Grid item>
            <br />
            <br />
            <br />
            <Typography variant="h2">&#10230;</Typography>
            {redisKey && (
              <Typography variant="subtitle_2">{redisKey}</Typography>
            )}
          </Grid>
        );
      }

      return (
        <React.Fragment>
          {htmlToReturn}
          <BaseComponentContainer
            changeSelected={props.changeSelectedComponent}
            componentData={comp}
            deleteComponent={props.deleteComponent}
          />
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
