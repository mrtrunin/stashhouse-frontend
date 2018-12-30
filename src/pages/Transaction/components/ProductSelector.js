import React from "react";
import PropTypes from "prop-types";

import { MenuItem, Select, InputLabel, FormControl } from "@material-ui/core";

const ProductSelector = ({
  products,
  hardDefaultValue,
  selectedProduct,
  onChange
}) => {
  const selectedProductName =
    selectedProduct && !hardDefaultValue ? selectedProduct.name : "";

  const productOptions = products.map(product => {
    return (
      <MenuItem key={product.id} value={product.name}>
        {product.name}
      </MenuItem>
    );
  });

  return (
    <FormControl>
      <InputLabel htmlFor="productSelector">Product</InputLabel>
      <Select
        value={selectedProductName}
        inputProps={{
          name: "productSelector",
          id: "productSelector"
        }}
        onChange={onChange}
        style={{ width: 300 }}
      >
        <MenuItem defaultValue disabled>
          Select Product
        </MenuItem>
        {productOptions}
      </Select>
    </FormControl>
  );
};

ProductSelector.propTypes = {
  products: PropTypes.array,
  onChange: PropTypes.func,
  selectedProduct: PropTypes.object,
  hardDefaultValue: PropTypes.bool,
  label: PropTypes.string
};

export default ProductSelector;
