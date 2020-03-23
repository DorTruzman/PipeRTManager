import React from "react";
import {
  makeStyles,
  useTheme,
  Grid,
  Card,
  CardHeader,
  CardContent
} from "@material-ui/core";
import { Power } from "@material-ui/icons";

const BaseNodeView = React.forwardRef((props, ref) => {
  const useStyles = makeStyles(theme => ({
    cardItem: {
      textAlign: "left",
      float: "left",
      background: props.nodeColor
    },
    cardHeader: {
      padding: "0.3rem",
      backgroundColor: "black"
    },
    cardContent: {
      textAlign: "center",
      padding: "0.3rem",
      cursor: "pointer",
      color: "white",
      fontSize: "0.7em",
      "&:last-child": {
        paddingBottom: 0
      }
    },
    cardFooter: {
      textAlign: "right",
      marginTop: "20%",
      fontSize: "0.8rem"
    },
    powerLogo: {
      fontSize: "0.8rem"
    }
  }));

  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card variant="outlined" className={classes.cardItem}>
      <CardHeader
        className={classes.cardHeader}
        subheader={props.routineName}
        subheaderTypographyProps={{
          variant: "subtitle2",
          style: { color: "white" }
        }}
      ></CardHeader>
      <CardContent className={classes.cardContent} ref={ref}>
        <div>{props.routineTypeName}</div>
        <div className={classes.cardFooter}>
          <Power className={classes.powerLogo} />
          &nbsp;{props.ports}
        </div>
      </CardContent>
    </Card>
  );
});

export default BaseNodeView;
