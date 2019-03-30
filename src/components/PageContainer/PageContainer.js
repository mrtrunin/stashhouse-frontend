import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

export const style = theme => ({
  root: {
    width: "100%"
  }
});

const PageContainer = ({ classes, children }) => {
  return <div className={classes.root}>{children}</div>;
};

PageContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

export default withStyles(style)(PageContainer);
