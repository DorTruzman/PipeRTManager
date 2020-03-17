import React, { useRef } from "react";
import clsx from "clsx";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  makeStyles,
  Typography,
  Input
} from "@material-ui/core";
import { Done, Clear } from "@material-ui/icons";
import ComponentUtils from "../../utils/ComponentUtils";
import ServerConfig from "../../config/server";
import { SingleSelect } from "react-select-material-ui";
import "./routine-form-style.css";

export default function RoutineFormView(props) {
  const useStyles = makeStyles(theme => ({
    materialSelect: {
      width: 240,
      fontFamily: "Roboto, Arial",
      fontSize: "16px"
    },
    numberInput: {
      marginTop: "16px"
    },
    selectMargin: {
      marginBottom: "3.5em"
    },
    dialog: {
      overflowY: "scroll"
    }
  }));

  const classes = useStyles();

  const mapFields = () => {
    let { QueueIn, QueueOut } = ComponentUtils.getAllComponentQueues(
      props.selectedComponent
    );

    return Object.keys(props.routineParams).map(function(param, index) {
      if (
        param === ServerConfig.QUEUE_READ ||
        param === ServerConfig.QUEUE_SEND
      ) {
        return (
          <div>
            <SingleSelect
              fullWidth={false}
              onChange={value => props.setSelectState(value, param)}
              className={`${classes.materialSelect} ${classes.selectMargin}`}
              label={param}
              SelectProps={{
                isClearable: true,
                isCreatable: true,
                msgNoOptionsAvailable:
                  "No queues available. Type new queue name...",
                msgNoOptionsMatchFilter: "No queue matches your query."
              }}
              options={param === ServerConfig.QUEUE_READ ? QueueOut : QueueIn}
            ></SingleSelect>
          </div>
        );
      }

      if (props.routineParams[param] === ServerConfig.DataTypes.Integer) {
        return (
          <div>
            <Input
              className={classes.numberInput}
              type="number"
              onChange={e => props.setInputState(e, param, true)}
              placeholder={param}
            ></Input>
          </div>
        );
      }

      return (
        <div>
          <TextField
            onChange={e => props.setInputState(e, param)}
            label={param}
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
      <DialogContent className={classes.dialog}>
        <DialogContentText id="alert-dialog-description">
          {'ENTER THE PARAMETERS FOR "' +
            (props.routineData && props.routineData.name + '":')}
        </DialogContentText>
        <FormControl>{mapFields()}</FormControl>
      </DialogContent>
      <DialogActions>
        {props.notFilledFields.length ? (
          <Typography variant="subtitle2" color="error">
            {"Please fill out " + props.notFilledFields.join(", ") + "."}
          </Typography>
        ) : (
          ""
        )}
        <Button color="secondary" onClick={props.closeRoutineForm} autoFocus>
          <Clear />
          CLOSE
        </Button>
        <Button color="primary" onClick={props.createRoutine} autoFocus>
          <Done />
          CREATE
        </Button>
      </DialogActions>
    </Dialog>
  );
}
