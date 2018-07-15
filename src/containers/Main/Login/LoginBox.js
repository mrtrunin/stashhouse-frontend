import React from "react";
import PropTypes from "prop-types";
import { Paper, Grid, TextField, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";
import { GoogleLogin } from "react-google-login";

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
    marginTop: theme.spacing.unit * 5,
    textAlign: "center"
  }
});

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
                  className="jss88 jss66 jss75 jss76 jss78 jss79 jss86 MuiButtonBase-root-88 MuiButton-root-66 MuiButton-contained-75 MuiButton-containedPrimary-76 MuiButton-raised-78 MuiButton-raisedPrimary-79 MuiButton-sizeLarge-86"
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

export default withStyles(styles)(LoginBox);
