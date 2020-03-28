import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import TopBarContainer from "../TopBar";
import SideBarContainer from "../Sidebar";
import {
  createMuiTheme,
  ThemeProvider,
  StylesProvider
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import RoutesConfig from "../../config/routes";
import ComponentUtils from "../../utils/ComponentUtils";

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
      components: [],
      showComponentForm: false,
      selectedComponent: null,
      isSideBarOpen: false,
      isComponentSelected: false
    };
  }

  setPipeline = pipeline => {
    this.setState({
      components: pipeline
    });
  };

  createComponent = name => {
    this.setState({
      components: ComponentUtils.createComponent(this.state.components, name)
    });

    this.toggleComponentForm(false);
  };

  deleteComponent = componentData => {
    this.setState({
      components: ComponentUtils.deleteComponent(
        this.state.components,
        componentData.name
      )
    });

    if (
      this.state.selectedComponent &&
      componentData.name === this.state.selectedComponent.name
    ) {
      this.changeSelectedComponent(null);
    }
  };

  changeSelectedComponent = componentData => {
    if (componentData && componentData.name) {
      this.setState({
        selectedComponent: componentData
      });

      this.setComponentSelectedState(true);
    } else {
      this.setState({
        selectedComponent: null
      });

      this.setComponentSelectedState(false);
    }
  };

  setComponentSelectedState = stateToSet => {
    this.setState({
      isComponentSelected: stateToSet
    });
  };

  toggleComponentForm = toggleMode => {
    this.setState({
      showComponentForm: toggleMode
    });
  };

  createRoutine = routineWithParams => {
    let { components, updatedComponent } = ComponentUtils.createRoutine(
      this.state.components,
      this.state.selectedComponent.name,
      routineWithParams
    );

    this.setState({
      components
    });

    this.changeSelectedComponent(updatedComponent);
  };

  toggleSideBar = () => {
    this.setState({
      isSideBarOpen: !this.state.isSideBarOpen
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
              render={() => <TagName isSideBarOpen={true} />}
            />
          );
        return (
          <Route
            path={routeData.path}
            render={() => (
              <TagName
                changeSelectedComponent={this.changeSelectedComponent}
                createComponent={this.createComponent}
                createRoutine={this.createRoutine}
                toggleComponentForm={this.toggleComponentForm}
                components={this.state.components}
                showComponentForm={this.state.showComponentForm}
                selectedComponent={this.state.selectedComponent}
                deleteComponent={this.deleteComponent}
                isSideBarOpen={true}
                setPipeline={this.setPipeline}
              />
            )}
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
              isSideBarOpen={true}
              toggleSideBar={this.toggleSideBar}
            />
            <SideBarContainer
              components={this.state.components}
              selectedComponent={this.state.selectedComponent}
              routes={RoutesConfig}
              toggleSideBar={this.toggleSideBar}
              isSideBarOpen={true}
              createRoutine={this.createRoutine}
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
