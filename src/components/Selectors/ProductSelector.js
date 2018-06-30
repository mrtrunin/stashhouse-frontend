import React from "react";
import PropTypes from "prop-types";

import { MenuItem, Select, InputLabel, FormControl } from "@material-ui/core";

const ProductSelector = props => {
  let defaultValue = "Select Product";
  let label = "Product";
  let selectedProduct = "";

  let productOptions = props.products.map(product => {
    return (
      <MenuItem key={product.id} value={product.name}>
        {product.name}
      </MenuItem>
    );
  });

  if (!props.hardDefaultValue) {
    selectedProduct = props.selectedProduct.name
      ? props.selectedProduct.name
      : "";
  }

  return (
    <FormControl>
      <InputLabel htmlFor="productSelector">{label}</InputLabel>
      <Select
        value={selectedProduct}
        inputProps={{
          name: "productSelector",
          id: "productSelector"
        }}
        onChange={props.onChange}
        style={{ width: 300 }}
      >
        <MenuItem defaultValue disabled>
          {defaultValue}
        </MenuItem>
        {productOptions}
      </Select>
    </FormControl>
  );
};

ProductSelector.propTypes = {
  products: PropTypes.array,
  className: PropTypes.string,
  onChange: PropTypes.func,
  selectedProduct: PropTypes.object,
  hardDefaultValue: PropTypes.bool,
  label: PropTypes.string
};

export default ProductSelector;
