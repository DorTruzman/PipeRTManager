import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  Fab,
  Typography,
  Grid,
  Link,
  Snackbar
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Add, Done, Clear } from "@material-ui/icons";
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
      marginLeft: 260,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    componentFab: {
      position: "absolute",
      bottom: theme.spacing(17),
      right: theme.spacing(2),
      minWidth: "13em"
    },
    pipelineOptions: {
      position: "absolute",
      bottom: theme.spacing(13),
      right: theme.spacing(6)
    },
    killFab: {
      position: "absolute",
      bottom: theme.spacing(6),
      right: theme.spacing(14)
    },
    saveFab: {
      position: "absolute",
      bottom: theme.spacing(6),
      right: theme.spacing(2),
      backgroundColor: "#81c784"
    },
    credits: {
      position: "absolute",
      bottom: theme.spacing(1),
      right: theme.spacing(2),
      backgroundColor: "#c5c5c52e",
      borderRadius: "5em",
      paddingLeft: "0.4em",
      paddingRight: "0.4em",
      fontStyle: "italic"
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
      <Snackbar
        open={props.showSuccessMessage}
        autoHideDuration={6000}
        onClose={props.toggleSuccessMessage}
      >
        <MuiAlert variant="filled" severity="success">
          <b>
            PIPELINE IS {props.successMessage ? props.successMessage : "SAVED"}{" "}
            SUCCESSFULLY! 😊
          </b>
        </MuiAlert>
      </Snackbar>
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
        disabled={props.components.length >= 6}
        onClick={() => props.toggleComponentForm(true)}
        className={classes.componentFab}
        size="large"
        color="primary"
        variant="extended"
        aria-label="add"
      >
        <Add />
        COMPONENT
      </Fab>
      <div className={classes.pipelineOptions}>
        <b>PIPELINE OPTIONS:</b>
      </div>
      <Fab
        disabled={props.components.length < 1}
        onClick={props.killPipeline}
        className={classes.killFab}
        size="large"
        color="secondary"
        variant="extended"
        aria-label="add"
      >
        <Clear />
        KILL
      </Fab>
      <Fab
        disabled={props.components.length < 1}
        onClick={props.savePipeline}
        className={classes.saveFab}
        size="large"
        color="inherit"
        variant="extended"
        aria-label="add"
      >
        <Done />
        SAVE
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
