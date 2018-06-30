import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";

import { TextField, withStyles, Paper, Grid } from "@material-ui/core";

import { GoogleLogin } from "react-google-login";

import loginWithGoogle from "api/UserAuth/LoginWithGoogleAction";
import { login } from "api/UserAuth/LoginAction";
import { fetchUserData } from "api/fetchUserData";

import Message from "components/Message";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 4,
    overflowX: "auto"
  },
  header: {
    marginTop: theme.spacing.unit * 2,
    textAlign: "center"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  heading: {
    fontWeight: 300,
    marginTop: theme.spacing.unit * 5
  }
});

class LoginContainer extends Component {
  state = {
    username: "",
    password: "",
    isLoading: false,
    redirect: false
  };

  onSubmit = async e => {
    e.preventDefault();
    await this.setState({ isLoading: true });
    try {
      await login(this.state);
      await fetchUserData();
    } catch (error) {
      Message(error);
    }
  };

  handleChange = name => event => {
    event.preventDefault();
    this.setState({ [name]: event.target.value });
  };

  googleLogin = async props => {
    try {
      await loginWithGoogle(props);
      await fetchUserData();
    } catch (error) {
      Message(error);
    }
  };

  render() {
    const { classes } = this.props;

    if (this.props.isLoggedIn) {
      return <Redirect push exact to="/warehouse" />;
    }

    return (
      <Grid container spacing={24}>
        <Grid item md={4} hidden={{ smDown: true }} />

        <Grid item xs={12} md={4}>
          <Paper className={classes.root}>
            <Grid container justify="center" spacing={16}>
              <form onSubmit={this.onSubmit}>
                {/* Header */}
                <Grid item xs={12}>
                  <h1 className={classes.heading}>Log in dear person!</h1>
                </Grid>

                {/* User Name */}
                <Grid item xs={12}>
                  <div className={classes.margin}>
                    <Grid
                      container
                      spacing={24}
                      alignItems="flex-end"
                      justify="center"
                    >
                      <Grid item>
                        <AccountCircle />
                      </Grid>
                      <Grid item>
                        <TextField
                          id="username"
                          label="User Name"
                          autoComplete="username"
                          onChange={this.handleChange("username")}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                {/* Password */}
                <div className={classes.margin}>
                  <Grid
                    container
                    spacing={24}
                    alignItems="flex-end"
                    justify="center"
                  >
                    <Grid item>
                      <Lock />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={this.handleChange("password")}
                      />
                    </Grid>
                  </Grid>
                </div>
                <Grid
                  container
                  justify="center"
                  spacing={24}
                  alignItems="flex-end"
                  className={classes.button}
                >
                  <Grid item>
                    <Button
                      size="large"
                      color="primary"
                      variant="raised"
                      onClick={this.onSubmit}
                    >
                      Log in
                    </Button>

                    <GoogleLogin
                      clientId="55376108045-u21pjckajg7knr4dode63bqnm3u99tug.apps.googleusercontent.com"
                      buttonText="Google Login"
                      onSuccess={this.googleLogin}
                      onFailure={this.googleLogin}
                      className="jss88 jss66 jss75 jss76 jss78 jss79 jss86 MuiButtonBase-root-88 MuiButton-root-66 MuiButton-contained-75 MuiButton-containedPrimary-76 MuiButton-raised-78 MuiButton-raisedPrimary-79 MuiButton-sizeLarge-86"
                      style={{
                        backgroundColor: "rgb(209, 72, 54)",
                        color: "white"
                      }}
                    />
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Paper>
          <Grid item xs={4} hidden={{ mdDown: true }} />
        </Grid>
      </Grid>
    );
  }
}

LoginContainer.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string
  }),
  isLoggedIn: PropTypes.bool,
  classes: PropTypes.object.isRequired
};

export default connect(store => {
  return {
    user: store.user.user,
    isLoggedIn: store.user.isLoggedIn
  };
})(withStyles(styles)(LoginContainer));
