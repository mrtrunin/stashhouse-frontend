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

const WarehousesTableFilter = ({
  classes,
  warehouseDate,
  handleWarehouseDateChange
}) => {
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
          format="D MMMM YYYY"
          label="Date"
          autoOk
          keyboard
        />
      </FormControl>
    </Paper>
  );
};

WarehousesTableFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  warehouseDate: PropTypes.string.isRequired,
  handleWarehouseDateChange: PropTypes.func
};

export default withStyles(styles)(WarehousesTableFilter);
