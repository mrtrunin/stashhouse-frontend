import React from "react";
import Router from "components/App/Router";
import NavBar from "components/App/NavBar/NavBar";
import { AppTheme } from "./AppTheme";

import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";

import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";

const App = () => {
  return (
    <React.Fragment>
      <MuiThemeProvider theme={AppTheme}>
        <CssBaseline />
        <NavBar />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </React.Fragment>
  );
};

export default App;
