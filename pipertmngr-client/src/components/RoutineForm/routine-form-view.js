import React, { useRef } from "react";
import clsx from "clsx";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField
} from "@material-ui/core";
import { Menu, Done, Clear } from "@material-ui/icons";

export default function RoutineFormView(props) {
  const parametersInput = useRef();
  parametersInput.current = {};

  const setInputState = (e, param) => {
    parametersInput.current[param] = e.target.value;
  };

  const mapFields = () => {
    return Object.keys(props.routineParams).map(function(param) {
      return (
        <div>
          <TextField
            onChange={e => setInputState(e, param)}
            label={param + " (Type: " + props.routineParams[param] + ")"}
          ></TextField>
        </div>
      );
    });
  };

  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"CREATE-A-ROUTINE"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {'ENTER THE PARAMETERS FOR "' +
            (props.routineData && props.routineData.name + '":')}
        </DialogContentText>
        {mapFields()}
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          onClick={() => props.closeRoutineForm()}
          autoFocus
        >
          <Clear />
          CLOSE
        </Button>
        <Button
          color="primary"
          onClick={() => props.createRoutine(parametersInput.current)}
          autoFocus
        >
          <Done />
          CREATE
        </Button>
      </DialogActions>
    </Dialog>
  );
}
