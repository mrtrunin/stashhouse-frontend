import React from "react";
import PropTypes from "prop-types";
import { Paper, Grid, TextField, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";
import { GoogleLogin } from "react-google-login";
import { LoginBoxStyle } from "./LoginBoxStyle";

const LoginBox = props => {
  const { classes, onSubmit, handleChange, googleLogin } = props;
  return (
    <Grid container justify="center" spacing={16}>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <Paper className={classes.root}>
          <form onSubmit={onSubmit}>
            {/* Header */}

            <h1 className={classes.heading}>Log in dear person!</h1>

            {/* User Name */}

            <Grid container spacing={24} alignItems="flex-end" justify="center">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField
                  id="username"
                  label="User Name"
                  autoComplete="username"
                  onChange={handleChange("username")}
                />
              </Grid>
            </Grid>

            {/* Password */}
            <Grid container spacing={24} alignItems="flex-end" justify="center">
              <Grid item>
                <Lock />
              </Grid>
              <Grid item>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleChange("password")}
                />
              </Grid>
            </Grid>

            {/* Buttons */}
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
                  onClick={onSubmit}
                >
                  Log in
                </Button>

                <GoogleLogin
                  clientId="55376108045-u21pjckajg7knr4dode63bqnm3u99tug.apps.googleusercontent.com"
                  buttonText="Google Login"
                  onSuccess={googleLogin}
                  onFailure={googleLogin}
                  className="MuiButtonBase-root-90 MuiButton-root-68 MuiButton-contained-77 MuiButton-containedPrimary-78 MuiButton-raised-80 MuiButton-raisedPrimary-81 MuiButton-sizeLarge-88 jss90 jss68 jss77 jss78 jss80 jss81 jss88"
                  style={{
                    backgroundColor: "rgb(209, 72, 54)",
                    color: "white"
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
};

LoginBox.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  googleLogin: PropTypes.func.isRequired
};

export default withStyles(LoginBoxStyle)(LoginBox);
