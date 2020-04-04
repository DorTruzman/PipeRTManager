import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  FormControl,
  makeStyles,
  Typography,
  Input,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Done, Clear } from "@material-ui/icons";
import ComponentUtils from "../../utils/ComponentUtils";
import ServerConfig from "../../config/server";
import { SingleSelect } from "react-select-material-ui";

export default function RoutineFormView(props) {
  const useStyles = makeStyles((theme) => ({
    materialSelect: {
      width: 240,
      fontFamily: "Roboto, Arial",
      fontSize: "16px",
    },
    genericInput: {
      marginBottom: "1rem",
    },
    numberInput: {
      marginTop: "16px",
    },
    dialogTitle: {
      borderBottomColor: "black",
      borderBottomStyle: "solid",
      borderBottomWidth: "0.01rem",
    },
    dialog: {
      backgroundImage: "url(./images/formImage.jpg)",
      backgroundSize: "cover",
      minHeight: "30rem",
      overflowY: "auto",
    },
    dialogActions: {
      borderTopColor: "black",
      borderTopStyle: "solid",
      borderTopWidth: "0.01rem",
      background: "linear-gradient(90deg, #b2b2b2 0%, white 40%, white 70%)",
    },
  }));

  const classes = useStyles();

  const mapFields = () => {
    let { QueueIn, QueueOut } = ComponentUtils.getAllComponentQueues(
      props.selectedComponent
    );

    let { RedisIn, RedisOut } = ComponentUtils.getRedisTypes(props.components);
    //Concat the in and out arrays and delete duplicate in redis queue array.
    let redisQueue = [...new Set([...RedisIn, ...RedisOut])];

    return Object.keys(props.routineParams).map(function (param) {
      if (
        param === ServerConfig.REDIS_SEND ||
        param === ServerConfig.REDIS_READ ||
        param === ServerConfig.QUEUE_READ ||
        param === ServerConfig.QUEUE_SEND
      ) {
        var isRedisQueue =
          param === ServerConfig.REDIS_SEND ||
          param === ServerConfig.REDIS_READ;
        return (
          <div className={classes.genericInput}>
            <SingleSelect
              fullWidth={false}
              onChange={(value) => props.setSelectState(value, param)}
              className={`${classes.materialSelect} ${classes.selectMargin}`}
              label={param}
              SelectProps={{
                isClearable: true,
                isCreatable: true,
                msgNoOptionsAvailable:
                  "No queues available. Type new queue name...",
                msgNoOptionsMatchFilter: "No queue matches your query.",
              }}
              options={
                isRedisQueue
                  ? redisQueue
                  : param === ServerConfig.QUEUE_READ
                  ? QueueOut
                  : QueueIn
              }
            ></SingleSelect>
          </div>
        );
      }

      if (props.routineParams[param] === ServerConfig.DataTypes.Integer) {
        return (
          <div className={classes.genericInput}>
            <Input
              className={classes.numberInput}
              type="number"
              onChange={(e) => props.setInputState(e, param, true)}
              placeholder={param}
            ></Input>
          </div>
        );
      }

      return (
        <div className={classes.genericInput}>
          <TextField
            onChange={(e) => props.setInputState(e, param)}
            label={param}
          ></TextField>
        </div>
      );
    });
  };

  return (
    <Dialog
      className={classes.dialogBorder}
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={classes.dialogTitle} id="alert-dialog-title">
        {"CREATE-A-ROUTINE"}
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <DialogContentText id="alert-dialog-description">
          {'ENTER THE PARAMETERS FOR "' +
            (props.routineData && props.routineData.name + '":')}
        </DialogContentText>
        <FormControl>{mapFields()}</FormControl>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
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
