import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  withStyles
} from "@material-ui/core";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 3
  }
});

const TableFilter = props => {
  const {
    classes,
    filteredTransactionType,
    handleFilterTransactionType
  } = props;
  return (
    <Paper className={classes.root}>
      <FormControl
        component="fieldset"
        required
        className={classes.formControl}
      >
        <RadioGroup
          aria-label="Transaction Type"
          name="transaction_type"
          value={filteredTransactionType}
          onChange={handleFilterTransactionType}
          className={classes.group}
          row
        >
          <FormControlLabel value="ALL" control={<Radio />} label="All" />
          <FormControlLabel
            value="INVOICE"
            control={<Radio />}
            label="Invoice"
          />
          <FormControlLabel
            value="PURCHASE"
            control={<Radio />}
            label="Purchase"
          />
          <FormControlLabel
            value="TRANSFER"
            control={<Radio />}
            label="Transfer"
          />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

TableFilter.propTypes = {
  filteredTransactionType: PropTypes.string.isRequired,
  handleFilterTransactionType: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TableFilter);
