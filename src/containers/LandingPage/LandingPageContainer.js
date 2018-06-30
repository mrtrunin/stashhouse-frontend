import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Grid, Button, withStyles } from "@material-ui/core";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  welcomeText: {
    textAlign: "center",
    align: "center",
    color: "white",
    paddingTop: theme.spacing.unit * 18
  },
  title: {
    fontWeight: "400",
    fontSize: 48,
    lineHeight: 1.2,
    margin: theme.spacing.unit
  },
  subTitle: {
    fontWeight: "200",
    fontSize: 30,
    lineHeight: 1,
    marginBottom: theme.spacing.unit * 5
  }
});

export class LandingPageContainer extends Component {
  render() {
    const { classes, isLoggedIn } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/warehouse" />;
    }

    return (
      <Grid container spacing={16}>
        <Grid item md={2} />
        <Grid item xs={12} md={8}>
          <div className={classes.welcomeText}>
            <h1 className={classes.title}>
              Welcome to STASHHOUSE<span style={{ color: "black" }}>.</span>
            </h1>
            <h2 className={classes.subTitle}>
              The new way to manage your stash
            </h2>
            <Button
              size="large"
              variant="raised"
              color="default"
              component={Link}
              to="/login"
            >
              Get Started
            </Button>
          </div>
        </Grid>
        <Grid item md={2} />
      </Grid>
    );
  }
}

LandingPageContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default connect(store => {
  return {
    isLoggedIn: store.user.isLoggedIn
  };
})(withStyles(styles)(LandingPageContainer));
