import React from "react";
import clsx from "clsx";
import { makeStyles, Fab, Typography, Grid, Link } from "@material-ui/core";
import { Add, Done } from "@material-ui/icons";
import ComponentFormContainer from "../ComponentForm";
import PipelineContainer from "../Pipeline";

export default function WorkAreaView(props) {
  const useStyles = makeStyles(theme => ({
    content: {
      flexGrow: 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 50,
      marginRight: 50
    },
    contentShift: {
      marginLeft: 220,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    componentFab: {
      position: "absolute",
      bottom: theme.spacing(14),
      right: theme.spacing(2),
      minWidth: "13em"
    },
    saveFab: {
      position: "absolute",
      bottom: theme.spacing(6),
      right: theme.spacing(2),
      backgroundColor: "#81c784",
      minWidth: "13em"
    },
    credits: {
      position: "absolute",
      bottom: theme.spacing(1),
      right: theme.spacing(2),
      backgroundColor: "#c5c5c52e",
      borderRadius: "5em",
      paddingLeft: "0.4em",
      paddingRight: "0.4em"
    },
    emptyWorkArea: {
      minHeight: "80vh"
    },
    thinText: {
      fontFamily: "Roboto Thin"
    }
  }));

  const classes = useStyles();

  return (
    <div
      className={clsx(classes.content, {
        [classes.contentShift]: props.isSideBarOpen
      })}
    >
      {props.components.length === 0 ? (
        <div>
          <Grid
            container
            spacing={16}
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.emptyWorkArea}
          >
            <div>
              <Typography className={classes.thinText} variant="h3">
                YOUR WORK AREA IS EMPTY.
              </Typography>
            </div>
            <div>
              <Typography variant="h2">TRY CREATING A COMPONENT!</Typography>
            </div>
          </Grid>
        </div>
      ) : (
        <div>
          <br />
          <PipelineContainer
            components={props.components}
            routines={props.routines}
            changeSelectedComponent={props.changeSelectedComponent}
            selectedComponent={props.selectedComponent}
            deleteComponent={props.deleteComponent}
          ></PipelineContainer>
        </div>
      )}
      {props.showComponentForm && (
        <ComponentFormContainer
          createComponent={props.createComponent}
          toggleComponentForm={props.toggleComponentForm}
        />
      )}
      <Fab
        onClick={() => props.toggleComponentForm(true)}
        className={classes.componentFab}
        size="large"
        color="secondary"
        variant="extended"
        aria-label="add"
      >
        <Add />
        COMPONENT
      </Fab>
      <Fab
        className={classes.saveFab}
        size="large"
        color="inherit"
        variant="extended"
        aria-label="add"
      >
        <Done />
        SAVE PIPELINE
      </Fab>
      <Typography className={classes.credits}>
        PipeRT © 2020&nbsp;
        <Link href="https://github.com/ItamarWilf/PipeRT">
          Visit our GitHub
        </Link>
      </Typography>
    </div>
  );
}
