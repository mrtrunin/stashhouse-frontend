import React from "react";
import PropTypes from "prop-types";

import { MenuItem, Select, InputLabel, FormControl } from "@material-ui/core";

const WarehouseSelector = props => {
  const { defaultValue, label, warehouses, selectedWarehouse } = props;

  let warehouseOptions = warehouses.map(warehouse => {
    return (
      <MenuItem key={warehouse.id} value={warehouse.name}>
        {warehouse.name}
      </MenuItem>
    );
  });

  let selectedWarehouseName =
    selectedWarehouse && selectedWarehouse.name ? selectedWarehouse.name : "";

  return (
    <FormControl>
      <InputLabel htmlFor="warehouseSelector">{label}</InputLabel>
      <Select
        value={selectedWarehouseName}
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
