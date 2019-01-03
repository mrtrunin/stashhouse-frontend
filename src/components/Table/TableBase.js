import React from "react";
import PropTypes from "prop-types";
import { Paper, withStyles, Grid } from "@material-ui/core";

const TableStyle = () => ({
  root: {
    width: "100%",
    overflowX: "auto"
  }
});

const TableBase = ({ classes, children }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.root}>{children}</Paper>
      </Grid>
    </Grid>
  );
};

TableBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any
};

export default withStyles(TableStyle)(TableBase);
