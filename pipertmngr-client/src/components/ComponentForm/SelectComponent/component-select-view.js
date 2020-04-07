import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  makeStyles,
  Grid,
  Box,
} from "@material-ui/core";
import { Done, Clear } from "@material-ui/icons";
import { SingleSelect } from "react-select-material-ui";

export default function ComponentSelectView(props) {
  const useStyles = makeStyles((theme) => ({
    //padding is 10px because its need to be on one line with the textfield on the other divider.
    centerAction: {
      alignItems: "center",
      alignSelf: "center",
      textAlign: "center",
      justifyContent: "center",
    },
    labeleF: {
      width: "100%",
      height: "100%",
      padding: "10px",
      fontWeight: "Bold",
    },
    BigBox: {
      width: "100%",
      height: "100%",
      padding: "10px",
    },
    paper: {
      width: "100%",
      height: "100%",
      padding: "8px",
    },
  }));

  const classes = useStyles();

  // Two grids because its need to be on one line with the other side properties & open for changes.

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} direction="column" className={classes.paper}>
        <Box className={classes.paper}>
          <label className={classes.labeleF}>Choose exists component:</label>
        </Box>
        <Box className={classes.BigBox}>
          <Box className={classes.paper}>
            <SingleSelect
              fullWidth={false}
              options={props.componentNameList}
              onChange={(value) => props.selectComponent(value)}
            ></SingleSelect>
          </Box>
          <Box className={classes.paper}>
            <Button
              className={classes.paper}
              onClick={props.loadComponent}
              color="primary"
              variant="contained"
              disabled={!props.selectedComponent}
            >
              <Done />
              CREATE
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
