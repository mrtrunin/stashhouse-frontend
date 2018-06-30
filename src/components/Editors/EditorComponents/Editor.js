import React from "react";
import PropTypes from "prop-types";
import { Card, Paper, withStyles } from "@material-ui/core";

const style = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 2,
    overflowX: "auto"
  },
  card: {
    padding: theme.spacing.unit * 4,
    display: "flex",
    flexDirection: "column",
    flex: 1
  }
});

const Editor = props => {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Card className={classes.card}>{props.children}</Card>
    </Paper>
  );
};

Editor.propTypes = {
  children: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Editor);
