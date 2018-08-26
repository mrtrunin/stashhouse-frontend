import React from "react";
import PropTypes from "prop-types";

import { withStyles, Grid } from "@material-ui/core";
import MessageBox from "components/Message/MessageBox";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 6,
    padding: theme.spacing.unit * 2
  },
  font: theme.typography,
  paper: { height: "100%", padding: theme.spacing.unit * 5 },
  landingPage: {
    backgroundColor: theme.palette.primary.main,
    minHeight: "600px"
  },
  container: {
    margin: theme.spacing.unit * 2,
    width: "100%"
  }
});

const Main = props => {
  const { classes } = props;

  const isLandingPage = window.location.pathname === "/";

  if (isLandingPage) {
    return (
      <Grid
        container
        className={[classes.root, classes.font, classes.landingPage].join(" ")}
        spacing={16}
      >
        <Grid item xs={12}>
          {props.children}
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container className={[classes.root, classes.font].join(" ")}>
      <Grid item md={1} />
      <Grid item xs={12} md={10}>
        {props.children}
      </Grid>
      <Grid item md={1} />
      <MessageBox />
    </Grid>
  );
};

Main.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
