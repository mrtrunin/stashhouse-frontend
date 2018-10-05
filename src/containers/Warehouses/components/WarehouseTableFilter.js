import React from "react";
import PropTypes from "prop-types";
import { Paper, FormControl, withStyles, TextField } from "@material-ui/core";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 3
  }
});

const WarehouseTableFilter = props => {
  const { classes, warehouseDate, handleWarehouseDateChange } = props;

  return (
    <Paper>
      <FormControl
        component="fieldset"
        required
        className={classes.formControl}
      >
        <TextField
          name="date"
          value={warehouseDate ? warehouseDate : ""}
          label="Date"
          margin="dense"
          onChange={handleWarehouseDateChange}
        />
      </FormControl>
    </Paper>
  );
};

WarehouseTableFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  warehouseDate: PropTypes.string.isRequired,
  handleWarehouseDateChange: PropTypes.func
};

export default withStyles(styles)(WarehouseTableFilter);
