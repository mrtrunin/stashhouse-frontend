import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Grid, Button, withStyles } from "@material-ui/core";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

export const style = theme => ({
  root: {
    width: "100%",
    overflowX: "hidden"
  },
  welcomeText: {
    textAlign: "center",
    align: "center",
    color: "white",
    paddingTop: theme.spacing.unit * 30
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

const LandingPage = ({ classes, isLoggedIn }) => {
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
          <h2 className={classes.subTitle}>The new way to manage your stash</h2>
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
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({}, dispatch)
  };
};

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(LandingPage));
