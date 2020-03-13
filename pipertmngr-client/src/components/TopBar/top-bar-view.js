import React from "react";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  useTheme,
  Grid
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

export default function TopBarView(props) {
  const sideBarWidth = props.sideBarWidth ? props.sideBarWidth : 200;

  const useStyles = makeStyles(theme => ({
    greeting: {
      marginTop: "0.2em"
    },
    pipelinePic: {
      height: "3em"
    },
    topBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    topBarShift: {
      marginLeft: sideBarWidth,
      width: `calc(100% - ${sideBarWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      display: "block"
    },
    hide: {
      display: "none"
    }
  }));

  const classes = useStyles();
  const theme = useTheme();

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        className={clsx(classes.topBar, {
          [classes.topBarShift]: props.isSideBarOpen
        })}
      >
        <Toolbar>
          <IconButton
            className={clsx(classes.menuButton, {
              [classes.hide]: props.isSideBarOpen
            })}
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={props.toggleSideBar}
          >
            <Menu />
          </IconButton>
          <img className={classes.pipelinePic} src="/images/pipeline.png"></img>
          &nbsp;&nbsp;&nbsp;
          <Grid justify="space-between" container spacing={24}>
            <Grid item>
              <Typography variant="h4">PIPELINE MANAGER</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.greeting} variant="h6">
                {props.greeting}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
