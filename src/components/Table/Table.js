import React from "react";
import PropTypes from "prop-types";
import { Paper, withStyles } from "@material-ui/core";

const TableStyle = () => ({
  root: {
    width: "100%",
    overflowX: "auto"
  }
});

const Table = ({ classes, children }) => {
  return <Paper className={classes.root}>{children}</Paper>;
};

Table.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any
};

export default withStyles(TableStyle)(Table);
