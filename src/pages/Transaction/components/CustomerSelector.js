import React from "react";
import PropTypes from "prop-types";

import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

const CustomerSelector = props => {
  let defaultValue = "Select Customer";
  let label = "Customer";

  const { customers, selectedCustomer } = props;

  let customerOptions = customers.map(customer => {
    return (
      <MenuItem key={customer.id} value={customer.name}>
        {customer.name}
      </MenuItem>
    );
  });

  let selectedCustomerName =
    selectedCustomer && selectedCustomer.name ? selectedCustomer.name : "";

  return (
    <FormControl>
      <InputLabel htmlFor="customerSelector">{label}</InputLabel>
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
          {defaultValue}
        </MenuItem>
        {customerOptions}
      </Select>
    </FormControl>
  );
};

CustomerSelector.propTypes = {
  customers: PropTypes.array,
  className: PropTypes.string,
  selectedCustomer: PropTypes.object,
  onChange: PropTypes.func
};

export default CustomerSelector;
