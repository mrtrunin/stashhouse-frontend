import React from "react";
import PropTypes from "prop-types";

import { MenuItem, Select, InputLabel, FormControl } from "@material-ui/core";

const WarehouseSelector = props => {
  let defaultValue = props.defaultValue;
  let label = props.label;

  let warehouseOptions = props.warehouses.map(warehouse => {
    return (
      <MenuItem key={warehouse.id} value={warehouse.name}>
        {warehouse.name}
      </MenuItem>
    );
  });

  let selectedWarehouse = props.selectedWarehouse.name
    ? props.selectedWarehouse.name
    : "";

  return (
    <FormControl>
      <InputLabel htmlFor="warehouseSelector">{label}</InputLabel>
      <Select
        value={selectedWarehouse}
        inputProps={{
          name: "warehouseSelector",
          id: "warehouseSelector"
        }}
        onChange={props.onChange}
        style={{ width: 240 }}
      >
        <MenuItem defaultValue disabled>
          {defaultValue}
        </MenuItem>
        {warehouseOptions}
      </Select>
    </FormControl>
  );
};

WarehouseSelector.propTypes = {
  warehouses: PropTypes.array,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  selectedWarehouse: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func
};

export default WarehouseSelector;
