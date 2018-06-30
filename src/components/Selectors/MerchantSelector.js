import React from "react";
import PropTypes from "prop-types";

import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

const MerchantSelector = props => {
  let defaultValue = "Select Customer";
  let label = "Customer";

  let merchantOptions = props.merchants.map(merchant => {
    return (
      <MenuItem key={merchant.id} value={merchant.name}>
        {merchant.name}
      </MenuItem>
    );
  });

  let selectedMerchant = props.selectedMerchant.name
    ? props.selectedMerchant.name
    : "";

  return (
    <FormControl>
      <InputLabel htmlFor="merchantSelector">{label}</InputLabel>
      <Select
        value={selectedMerchant}
        inputProps={{
          name: "merchantSelector",
          id: "merchantSelector"
        }}
        onChange={props.onChange}
        style={{ width: 240 }}
      >
        <MenuItem defaultValue disabled>
          {defaultValue}
        </MenuItem>
        {merchantOptions}
      </Select>
    </FormControl>
  );
};

MerchantSelector.propTypes = {
  merchants: PropTypes.array,
  className: PropTypes.string,
  selectedMerchant: PropTypes.object,
  onChange: PropTypes.func
};

export default MerchantSelector;
