import React from "react";
import clsx from "clsx";
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
import { NavLink } from "react-router-dom";
import RoutineFormContainer from "../RoutineForm";

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
      routinesJSX = routinesList.map(function(routineData) {
        return (
          <ListItem
            className={classes.routine}
            onClick={() => props.openRoutineForm(routineData)}
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

  const sideBarWidth = props.sideBarWidth ? props.sideBarWidth : 200;

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
        onClose={() => props.toggleSideBar()}
      >
        <IconButton
          className={classes.chevronButton}
          onClick={() => props.toggleSideBar()}
        >
          <ChevronLeftSharp></ChevronLeftSharp>
          <Typography>MENU</Typography>
        </IconButton>
        {sideList(props.routes, props.routinesList)}
      </Drawer>

      {props.showRoutineForm && (
        <RoutineFormContainer
          routineData={props.routineData}
          createRoutine={props.createRoutine}
          closeRoutineForm={props.closeRoutineForm}
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
