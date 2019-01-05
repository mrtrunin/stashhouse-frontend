import React from "react";
import PropTypes from "prop-types";

import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid
} from "@material-ui/core";

const CustomerSelector = props => {
  const { customers, selectedCustomer } = props;
  const customerOptions = customers.map(customer => {
    return (
      <MenuItem key={customer.id} value={customer.name}>
        {customer.name}
      </MenuItem>
    );
  });

  const selectedCustomerName =
    selectedCustomer && selectedCustomer.name ? selectedCustomer.name : "";

  return (
    <Grid item xs={4}>
      <FormControl>
        <InputLabel htmlFor="customerSelector">Customer</InputLabel>
        <Select
          value={selectedCustomerName}
          inputProps={{
            name: "customerSelector",
            id: "customerSelector"
          }}
          onChange={props.onChange}
          style={{ width: 240 }}
        >
          <MenuItem defaultValue disabled>
            Select Customer
          </MenuItem>
          {customerOptions}
        </Select>
      </FormControl>
    </Grid>
  );
};

CustomerSelector.propTypes = {
  customers: PropTypes.array,
  className: PropTypes.string,
  selectedCustomer: PropTypes.object,
  onChange: PropTypes.func,
  customersRequired: PropTypes.bool,
  customersFetched: PropTypes.bool
};

export default CustomerSelector;
