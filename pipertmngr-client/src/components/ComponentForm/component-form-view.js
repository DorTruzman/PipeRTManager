import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Grid,
  makeStyles,
  Divider,
  Box,
} from "@material-ui/core";
import { Done, Clear, CallMissedSharp } from "@material-ui/icons";
import ComponentSelectContainer from "./SelectComponent/component-select-container";
export default function ComponentFormView(props) {
  const useStyles = makeStyles((theme) => ({
    centerAction: {
      alignItems: "center",
      alignSelf: "center",
      textAlign: "center",
      justifyContent: "center",
    },
    paper: {
      width: "80%",
      height: "100%",
      padding: "8px",
    },
    labeleF: {
      width: "100%",
      height: "100%",
      padding: "8px",
      fontWeight: "Bold",
    },
    divider: {
      position: "absolute",
      top: "30%",
      left: "45%",
      height: "50%",
    },
    textField: {
      width: "80%",
    },
  }));

  const classes = useStyles();
  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        {"Create a component / Choose component"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={6}
            direction="column"
            className={classes.paper}
          >
            <Box className={classes.paper}>
              <label className={classes.labeleF}>Create New Component :</label>
            </Box>
            <Box className={classes.paper}>
              <TextField
                className={classes.textField}
                label="name ... "
                onChange={(e) => props.setInputState(e)}
              ></TextField>
            </Box>
            <Box className={classes.paper}>
              <Button
                color="primary"
                onClick={props.createComponent}
                className={classes.paper}
                autoFocus
                variant="contained"
              >
                <Done />
                CREATE
              </Button>
            </Box>
          </Grid>

          <Divider orientation="vertical" className={classes.divider} />

          <Grid item xs={12} sm={6}>
            <ComponentSelectContainer
              toggleComponentForm={props.toggleComponentForm}
              loadComponent={props.loadComponent}
            ></ComponentSelectContainer>
          </Grid>
        </Grid>
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
      </DialogActions>
    </Dialog>
  );
}
