import React from "react";
import PropTypes from "prop-types";
import { Paper, withStyles } from "@material-ui/core";

const style = theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  }
});

const TableContainerComponent = props => {
  const { classes } = props;
  return <Paper className={classes.root}>{props.children}</Paper>;
};

TableContainerComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any
};

export default withStyles(style)(TableContainerComponent);
