import React from "react";
import PropTypes from "prop-types";
import ProductSelector from "./ProductSelector";
import { TableRow, TableCell } from "@material-ui/core";

const AddNewProductToTable = props => {
  let products = props.products;

  let showProductRemoveButton = props.showProductRemoveButton;
  let showTaxRate = props.showTaxRate;
  let showTotalWithTax = props.showTotalWithTax;
  let showEAN = props.showEAN;

  return (
    <TableRow>
      {showProductRemoveButton && <TableCell />}
      <TableCell name="Product Name" colSpan="2">
        <ProductSelector
          products={products}
          hardDefaultValue={true}
          onChange={props.onChange}
          width="200"
        />
      </TableCell>
      {showEAN && <TableCell name="EAN" />}
      <TableCell name="Quantity" />
      <TableCell name="Price" />
      <TableCell name="Total without tax" />
      {showTaxRate && <TableCell name="Tax rate" />}
      {showTotalWithTax && <TableCell name="Total with tax" />}
    </TableRow>
  );
};

AddNewProductToTable.propTypes = {
  products: PropTypes.array,
  onChange: PropTypes.func,
  id: PropTypes.string,

  showProductRemoveButton: PropTypes.bool.isRequired,
  showTaxRate: PropTypes.bool.isRequired,
  showTotalWithTax: PropTypes.bool.isRequired,
  showEAN: PropTypes.bool
};

export default AddNewProductToTable;
