import React from "react";
import PropTypes from "prop-types";
import { Card, Paper, withStyles } from "@material-ui/core";

const style = theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  card: {
    padding: theme.spacing.unit * 4,
    display: "flex",
    flexDirection: "column",
    flex: 1
  }
});

const Editor = ({ classes, children }) => {
  return (
    <Paper className={classes.root}>
      <Card className={classes.card}>{children}</Card>
    </Paper>
  );
};

Editor.propTypes = {
  children: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Editor);
