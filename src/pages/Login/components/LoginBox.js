import React from "react";
import PropTypes from "prop-types";
import { Paper, Grid, TextField, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";
import { GoogleLogin } from "react-google-login";

const style = theme => ({
  root: {
    width: theme.spacing.unit * 46,
    marginTop: theme.spacing.unit * 4,
    overflowX: "hidden"
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
    marginTop: theme.spacing.unit * 5,
    textAlign: "center"
  },
  googleButton: {
    padding: "8px 24px",
    minWidth: "112px",
    fontSize: "0.9375rem",
    minHeight: "40px",
    color: "#fff",
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxSizing: "border-box",
    lineHeight: "1.4em",
    fontWeight: "500",
    borderRadius: "4px",
    textTransform: "uppercase",
    cursor: "pointer",
    margin: "0",
    border: "0",
    display: "inline-flex",
    outline: "none",
    userSelect: "none",
    alignItems: "center",
    verticalAlign: "middle",
    justifyContent: "center",
    textDecoration: "none"
  }
});

const LoginBox = props => {
  const { classes, onSubmit, handleChange, googleLogin } = props;
  return (
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
              variant="contained"
              onClick={onSubmit}
            >
              Log in
            </Button>

            <GoogleLogin
              clientId="55376108045-u21pjckajg7knr4dode63bqnm3u99tug.apps.googleusercontent.com"
              buttonText="Google Login"
              onSuccess={googleLogin}
              onFailure={googleLogin}
              className={classes.googleButton}
              style={{
                backgroundColor: "rgb(209, 72, 54)",
                color: "white"
              }}
            />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

LoginBox.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  googleLogin: PropTypes.func.isRequired
};

export default withStyles(style)(LoginBox);
