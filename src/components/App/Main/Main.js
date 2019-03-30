import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { withStyles, Grid } from "@material-ui/core";
import MessageBox from "components/Message/MessageBox";

import Message from "components/Message/Message";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import axios from "axios";

import * as loginActions from "pages/Login/LoginActions";

const style = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    padding: theme.spacing.unit * 2,
    width: "100%"
  },
  font: theme.typography,
  landingPage: {
    backgroundColor: theme.palette.primary.main,
    minHeight: "600px"
  },
  content: {
    display: "flex",
    justifyContent: "center"
  }
});

const Main = ({ classes, children, actions: { logout, refreshToken } }) => {
  useEffect(() => {
    interceptApiResponse();
  });

  const interceptApiResponse = () => {
    axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem("jwtToken");
        const url = process.env.REACT_APP_SERVER_URL;
        const tokenAuthUrl = url + "/auth/token";

        if (token && !config.url.startsWith(tokenAuthUrl)) {
          config.headers["Authorization"] = "Bearer " + token;
        }
        if (!token && !config.url.startsWith(tokenAuthUrl)) {
          // Don't execute request if no authorization token
          Message("No authorization token!", "error");
          return;
        }
        return config;
      },
      error => {
        Message("Interceptor is broken!", "error");
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        return response;
      },
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

        if (hasAuthTokenExpired) {
          return new Promise(async () => {
            await checkTokenExpiration();
            error.config.headers.Authorization =
              (await "Bearer ") + localStorage.jwtToken;
            await axios.request(error.config);
            return (document.location = window.location.href);
          });
        }

        if (hasRefreshTokenExpired) {
          logout();
          return Promise.reject(error);
        }

        if (unauthorized) {
          Message("Unauthorized request", "error", 401);
          logout();
          return Promise.reject(error);
        }

        return Promise.reject(error);
      }
    );
  };

  const checkTokenExpiration = async () => {
    let expiration_time = localStorage.jwtToken_expiration_time;
    let now = Date.now();

    if (localStorage.refresh_token && expiration_time - now < 82800 * 1000) {
      try {
        await refreshToken();
      } catch (error) {
        Message("Could not refresh token: " + error, "error");
        logout();
      }
    }
  };

  const isLandingPage = window.location.pathname === "/";

  if (isLandingPage) {
    return (
      <Grid
        container
        className={[classes.root, classes.font, classes.landingPage].join(" ")}
        spacing={16}
      >
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container className={[classes.root, classes.font].join(" ")}>
      <Grid item md={1} />
      <Grid item xs={12} md={10} className={classes.content}>
        {children}
      </Grid>
      <Grid item md={1} />
      <MessageBox />
    </Grid>
  );
};

Main.propTypes = {
  actions: PropTypes.object.isRequired,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...loginActions }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Main));
