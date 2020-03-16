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
import { Done, Clear } from "@material-ui/icons";

export default function ComponentFormView(props) {
  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"CREATE-A-COMPONENT"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          HOW DO YOU WANT TO CALL YOUR BRAND NEW COMPONENT?
        </DialogContentText>
        <TextField
          label="TYPE HERE..."
          onChange={e => props.setInputState(e)}
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          onClick={() => props.toggleComponentForm(false)}
          autoFocus
        >
          <Clear />
          CLOSE
        </Button>
        <Button color="primary" onClick={props.createComponent} autoFocus>
          <Done />
          CREATE
        </Button>
      </DialogActions>
    </Dialog>
  );
}
