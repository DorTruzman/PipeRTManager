import React from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  makeStyles,
  IconButton,
  Divider,
  Typography,
  Snackbar
} from "@material-ui/core";
import { ChevronLeftSharp, InputSharp, CodeSharp } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import RoutineFormContainer from "../RoutineForm";
import ComponentUtils from "../../utils/ComponentUtils";
import ServerConfig from "../../config/server";

export default function SideBarView(props) {
  const sideList = (routes = {}, routinesList) => {
    const linksJSX = Object.keys(routes).map(function(routeKey, index) {
      let routeData = routes[routeKey];
      const TagName = routeData.icon;

      return (
        <ListItem
          component={NavLink}
          to={routeData.path}
          exact
          button
          key={routeData.dispName}
          activeClassName="Mui-selected"
        >
          <ListItemIcon>
            <TagName />
          </ListItemIcon>
          <ListItemText primary={routeData.dispName} />
        </ListItem>
      );
    });

    let routinesJSX = null;

    if (routinesList) {
      let shouldDisableAll = ComponentUtils.checkForRoutineType(
        props.selectedComponent,
        ServerConfig.RoutineTypes.HasToBeLast
      );

      routinesJSX = routinesList.map(function(routineData) {
        let disableRoutine = false;

        if (
          !props.selectedComponent ||
          shouldDisableAll ||
          (routineData.type !== ServerConfig.RoutineTypes.HasToBeFirst &&
            routineData.type !== ServerConfig.RoutineTypes.HasToBeLast &&
            !ComponentUtils.checkForRoutineType(
              props.selectedComponent,
              ServerConfig.RoutineTypes.HasToBeFirst
            )) ||
          (routineData.type === ServerConfig.RoutineTypes.HasToBeFirst &&
            ComponentUtils.checkForRoutineType(
              props.selectedComponent,
              ServerConfig.RoutineTypes.HasToBeFirst
            ))
        ) {
          disableRoutine = true;
        }

        let listItemProps = {
          disabled: disableRoutine,
          onClick: !disableRoutine
            ? () => props.toggleRoutineForm(routineData, true)
            : undefined
        };

        return (
          <ListItem
            {...listItemProps}
            className={!disableRoutine && classes.routine}
          >
            <ListItemIcon>
              <CodeSharp />
            </ListItemIcon>
            <ListItemText primary={routineData.name} />
          </ListItem>
        );
      });
    }

    return (
      <div>
        <List>{linksJSX}</List>
        <Divider />
        {routinesJSX && (
          <div style={{ textAlign: "center" }}>
            <ListItem>
              <ListItemIcon>
                <InputSharp />
              </ListItemIcon>
              <ListItemText primary={<b>ROUTINES</b>} />
            </ListItem>
            <List>{routinesJSX}</List>
          </div>
        )}
      </div>
    );
  };

  const sideBarWidth = props.sideBarWidth ? props.sideBarWidth : 240;

  const useStyles = makeStyles(theme => ({
    sideBar: {
      width: sideBarWidth,
      flexShrink: 0
    },
    sideBarOpen: {
      width: sideBarWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    sideBarClose: {
      overflowX: "hidden",
      width: 0,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    chevronButton: {
      justifyContent: "flex-start"
    },
    routine: {
      cursor: "pointer",
      "&:hover": {
        color: "blue"
      }
    },
    credits: {
      marginTop: "75%",
      textAlign: "center",
      fontStyle: "italic"
    }
  }));

  const classes = useStyles();

  return (
    <div>
      <Drawer
        className={clsx(classes.drawer, {
          [classes.sideBarOpen]: props.isSideBarOpen,
          [classes.sideBarClose]: !props.isSideBarOpen
        })}
        classes={{
          paper: clsx({
            [classes.sideBarOpen]: props.isSideBarOpen,
            [classes.sideBarClose]: !props.isSideBarOpen
          })
        }}
        variant="permanent"
        open={props.isSideBarOpen}
        onClose={props.toggleSideBar}
      >
        <IconButton
          className={classes.chevronButton}
          onClick={props.toggleSideBar}
        >
          <ChevronLeftSharp></ChevronLeftSharp>
          <Typography>MENU</Typography>
        </IconButton>
        {sideList(props.routes, props.routinesList)}
        <div className={classes.credits}>PipeRTManager V1.0 © 2020</div>
      </Drawer>

      {props.displayRoutineForm && (
        <RoutineFormContainer
          selectedComponent={props.selectedComponent}
          routineData={props.routineData}
          createRoutine={props.createRoutine}
          closeRoutineForm={() => props.toggleRoutineForm(null, false)}
        />
      )}

      <Snackbar open={!props.isComponentSelected}>
        <MuiAlert variant="filled" severity="info">
          <b>CREATE-A-ROUTINE:</b> YOU SHOULD SELECT A COMPONENT FIRST.
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
