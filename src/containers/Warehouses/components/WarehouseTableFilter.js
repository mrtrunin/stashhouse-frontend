import React from "react";
import PropTypes from "prop-types";
import { Paper, FormControl, withStyles } from "@material-ui/core";
import { DatePicker } from "material-ui-pickers";

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
        <DatePicker
          value={warehouseDate ? warehouseDate : ""}
          onChange={handleWarehouseDateChange}
          format="YYYY-MM-DD"
          label="Date"
          autoOk
          keyboard
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
