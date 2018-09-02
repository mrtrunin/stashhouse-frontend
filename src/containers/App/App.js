import React, { Component } from "react";
import Router from "containers/App/Router";
import NavBar from "containers/App/NavBar/NavBar";
import { AppTheme } from "./AppTheme";

import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import MomentUtils from "material-ui-pickers/utils/moment-utils";

import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";

import Message from "components/Message/Message";

import axios from "axios";
import store from "store";

import refreshToken from "containers/Login/LoginActions";

class App extends Component {
  componentDidMount = () => {
    this.interceptApiResponse();
  };

  interceptApiResponse = () => {
    axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem("jwtToken");
        const url = process.env.REACT_APP_SERVER_URL;
        const tokenAuthUrl = url + "/auth/";

        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        }
        if (!token && !config.url.startsWith(tokenAuthUrl)) {
          // Don't execute request if no authorization token
          return;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => response,
      error => {
        const url = process.env.REACT_APP_SERVER_URL;
        const tokenAuthUrl = url + "/auth/token/";

        const unauthorized = error.response.status === 401;

        const hasAuthTokenExpired =
          localStorage.jwtToken &&
          error.config &&
          error.response &&
          error.response.status === 401;

        const hasRefreshTokenExpired =
          error.config.url === tokenAuthUrl &&
          error.response &&
          error.response.status === 401;

        const isBadRequest = error.response.status === 400;

        if (isBadRequest) {
          Message("Bad request!", "error", 400);
          return Promise.reject(error);
        }

        if (unauthorized) {
          Message("Unauthorized request", "error", 401);
        }

        if (hasRefreshTokenExpired) {
          this.logout();
          return Promise.reject(error);
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
        Message("Could not refresh token: " + error, "error");
        this.logout();
      }
    }
  };

  logout = () => {
    return new Promise(async () => {
      await store.dispatch({ type: "USER_LOGOUT" });
      await localStorage.clear();
    });
  };

  render() {
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
  }
}

export default App;
