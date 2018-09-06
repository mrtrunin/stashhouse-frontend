import React from "react";
import Router from "containers/App/Router";
import NavBar from "containers/App/NavBar/NavBar";
import { AppTheme } from "./AppTheme";

import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import MomentUtils from "material-ui-pickers/utils/moment-utils";

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
