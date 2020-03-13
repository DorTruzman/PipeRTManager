import React, { Component, useRef } from "react";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import SideBarContainer from "../Sidebar";
import {
  createMuiTheme,
  ThemeProvider,
  StylesProvider
} from "@material-ui/core/styles";
import TopBarContainer from "../TopBar";
import { CssBaseline, Container } from "@material-ui/core";
import WorkAreaContainer from "../WorkArea";
import RoutesConfig from "../../config/routes";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2296f3"
    }
  },
  typography: {
    fontFamily: "Roboto, Arial"
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage: "url(./images/backgroundImage.jpg)",
          backgroundSize: "cover"
        }
      }
    }
  }
});

export class MasterContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSideBarOpen: false,
      isComponentSelected: false
    };

    this.WorkAreaRef = React.createRef();
  }

  toggleSideBar = () => {
    this.setState({
      isSideBarOpen: !this.state.isSideBarOpen
    });
  };

  setComponentSelectedState = stateToSet => {
    this.setState({
      isComponentSelected: stateToSet
    });
  };

  createRoutes = (routes = {}) => {
    return Object.keys(routes).map(
      function(routeKey) {
        let routeData = routes[routeKey];
        let TagName = routeData.component;

        if (routeData.explicit)
          return (
            <Route
              exact
              path={routeData.path}
              render={() => (
                <TagName isSideBarOpen={this.state.isSideBarOpen} />
              )}
            />
          );
        else if (routeKey === "home") {
          return (
            <Route
              path={routeData.path}
              render={() => (
                <WorkAreaContainer
                  ref={this.WorkAreaRef}
                  isSideBarOpen={this.state.isSideBarOpen}
                  setComponentSelectedState={this.setComponentSelectedState}
                />
              )}
            />
          );
        }
        return (
          <Route
            path={routeData.path}
            render={() => <TagName isSideBarOpen={this.state.isSideBarOpen} />}
          />
        );
      }.bind(this)
    );
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <StylesProvider>
          <CssBaseline />
          <BrowserRouter>
            <TopBarContainer
              isSideBarOpen={this.state.isSideBarOpen}
              toggleSideBar={this.toggleSideBar}
            />
            <SideBarContainer
              routes={RoutesConfig}
              toggleSideBar={this.toggleSideBar}
              isSideBarOpen={this.state.isSideBarOpen}
              createRoutine={
                this.WorkAreaRef &&
                this.WorkAreaRef.current &&
                this.WorkAreaRef.current.createRoutine
              }
              isComponentSelected={this.state.isComponentSelected}
            />
            <Switch>{this.createRoutes(RoutesConfig)}</Switch>
          </BrowserRouter>
        </StylesProvider>
      </ThemeProvider>
    );
  }
}

export default MasterContainer;
