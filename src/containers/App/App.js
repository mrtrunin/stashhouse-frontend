import React, { Component } from "react";
import Router from "containers/Router";
import Nav from "containers/Nav";

import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import MomentUtils from "material-ui-pickers/utils/moment-utils";

import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import SnackBar from "components/SnackBar";
import Message from "components/Message";

import refreshToken from "api/UserAuth/RefreshTokenAction";
import { logout } from "api/UserAuth/LogoutAction";

import axios from "axios";
import store from "store";

const theme = createMuiTheme({
  typography: {
    fontFamily:
      '-apple-system,BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;',
    fontWeight: 400,
    fontSize: 14
  },
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff"
    },
    google: {
      light: "#ffffff"
    }
  }
});

class App extends Component {
  componentDidMount = () => {
    this.interceptApiResponse();
  };

  interceptApiResponse = () => {
    axios.interceptors.response.use(
      response => response,
      async error => {
        const url = process.env.REACT_APP_SERVER_URL;
        const tokenAuthUrl = url + "/auth/token/";
        const hasRefreshTokenExpired =
          error.config.url === tokenAuthUrl &&
          error.response &&
          error.response.status === 401;

        const hasAuthTokenExpired =
          error.config && error.response && error.response.status === 401;

        const isBadRequest = error.response.status === 400;

        if (isBadRequest) {
          Message("Bad request!");
        }

        if (hasRefreshTokenExpired) {
          return new Promise(async () => {
            await store.dispatch({ type: "USER_LOGOUT" });
            await localStorage.removeItem("refresh_token");
            await localStorage.removeItem("jwtToken");
            await localStorage.removeItem("jwtToken_expiration_time");
            await localStorage.removeItem("reduxState");
            return await (document.location = "/");
          });
        }

        if (hasAuthTokenExpired) {
          return new Promise(async () => {
            await this.checkTokenExpiration();
            error.config.headers.Authorization =
              (await "Bearer ") + localStorage.jwtToken;
            await axios.request(error.config);
            return (document.location = window.location.href);
          });
        }

        return Promise.reject(error);
      }
    );
  };

  checkTokenExpiration = async () => {
    let expiration_time = localStorage.jwtToken_expiration_time;
    let now = Date.now();

    if (localStorage.refresh_token && expiration_time - now < 82800 * 1000) {
      try {
        await refreshToken();
      } catch (error) {
        Message(error);
        logout();
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Nav />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Router />
          </MuiPickersUtilsProvider>
          <SnackBar />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
