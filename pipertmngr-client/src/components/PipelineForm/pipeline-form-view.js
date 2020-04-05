import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  makeStyles,
  Input,
  Grid,
} from "@material-ui/core";
import { Done, Clear, Label } from "@material-ui/icons";
import "./pipeline-form-view.css";

export default function RoutineFormView(props) {
  const useStyles = makeStyles((theme) => ({
    yamlBrowse: {
      marginTop: "1em",
      width: "0.1px",
      height: "0.1px",
      opacity: "0",
      overflow: "hidden",
      position: "absolute",
      zIndex: "-1",
    },

    cachedButton: {
      fontSize: "1.5em",
    },
    yamlButton: {
      marginLeft: "1.5em",
    },
    dialogTitle: {
      borderBottomColor: "black",
      borderBottomStyle: "solid",
      borderBottomWidth: "0.01rem",
    },
    dialog: {
      overflowY: "auto",
    },
    dialogActions: {
      borderTopColor: "black",
      borderTopStyle: "solid",
      borderTopWidth: "0.01rem",
      background: "linear-gradient(90deg, #b2b2b2 0%, white 40%, white 70%)",
    },
    centerAction: {
      alignItems: "center",
      alignSelf: "center",
      textAlign: "center",
      justifyContent: "center",
    },
  }));

  const classes = useStyles();

  return (
    <Dialog
      className={classes.dialogBorder}
      open={true}
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={classes.dialogTitle} id="alert-dialog-title">
        {"LOAD-A-PIPELINE"}
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <DialogContentText id="alert-dialog-description">
          CHOOSE AN OPTION:
        </DialogContentText>
        <Grid container alignItems="center" justify="center" spacing={2}>
          <Grid item xs={5}>
            <Button
              size="large"
              className={classes.cachedButton}
              variant="contained"
              color={props.selectedOption === "CACHED" ? "primary" : "inherit"}
              disabled={!props.isLocalStorageAvailable()}
              onClick={() => props.changeSelected("CACHED")}
            >
              LOAD CACHED PIPELINE
            </Button>
          </Grid>
          <Grid item xs={5} className={classes.centerAction}>
            <Button
              size="large"
              className={classes.yamlButton}
              for="file"
              variant="contained"
              color={props.selectedOption === "YAML" ? "primary" : "inherit"}
              onClick={() => props.changeSelected("YAML")}
            >
              LOAD .YAML FILE
            </Button>
            <Input
              className="inputFile"
              disabled={props.selectedOption !== "YAML"}
              type="file"
              id="file"
              name="file"
              disableUnderline="true"
              onChange={props.onFileChange}
              inputProps={{
                accept: ".yaml,.yml",
              }}
            ></Input>
            <label className="label" for="file">
              {props.chosenFile
                ? "Selected: " + props.chosenFile.name
                : "Browse .."}
            </label>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={props.togglePipelineForm} autoFocus>
          <Clear />
          CLOSE
        </Button>
        <Button
          disabled={
            !props.selectedOption ||
            (props.selectedOption === "YAML" && !props.chosenFile)
          }
          onClick={props.loadPipeline}
          color="primary"
          autoFocus
        >
          <Done />
          LOAD
        </Button>
      </DialogActions>
    </Dialog>
  );
}
