import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Grid, Button, withStyles } from "@material-ui/core";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { LandingPageStyle } from "./LandingPageStyle";

export class LandingPage extends Component {
  render() {
    const { classes, isLoggedIn } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/warehouses" />;
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
              variant="contained"
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

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default connect(store => {
  return {
    isLoggedIn: store.user.isLoggedIn
  };
})(withStyles(LandingPageStyle)(LandingPage));
