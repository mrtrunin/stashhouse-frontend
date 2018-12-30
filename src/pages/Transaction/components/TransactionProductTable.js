import AddNewProductToTable from "./AddNewProductToTable";
import React from "react";
import PropTypes from "prop-types";
import ProductRowInTable from "./ProductRowInTable";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { withStyles } from "@material-ui/core";

const TransactionProductTableStyles = {};

const TransactionProductTable = ({
  classes,
  products,
  hasTableProducts,
  selectedProducts,
  onProductAttributeChange,
  onProductRemove,
  onProductChange
}) => {
  const showProductRemoveButton = true || hasTableProducts;
  const showEAN = false;
  const showTaxRate = true;
  const showTotalWithTax = true;

  const productRows = selectedProducts
    ? selectedProducts.map((product, index) => {
        return (
          <ProductRowInTable
            key={index}
            id={index}
            product={product}
            onChange={onProductAttributeChange}
            onClick={onProductRemove}
            showProductRemoveButton={showProductRemoveButton}
            showTaxRate={showTaxRate}
            showTotalWithTax={showTotalWithTax}
            showEAN={showEAN}
          />
        );
      })
    : null;

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {showProductRemoveButton && <TableCell padding="none" />}
          <TableCell padding="dense">Product</TableCell>
          {showEAN && <TableCell>EAN</TableCell>}
          <TableCell padding="dense">Quantity</TableCell>
          <TableCell padding="dense">Price</TableCell>
          <TableCell padding="dense" align="right">
            Total
          </TableCell>
          {showTaxRate && (
            <TableCell padding="dense" align="right">
              Tax rate
            </TableCell>
          )}
          {showTotalWithTax && (
            <TableCell padding="dense" align="right">
              Total (incl. tax)
            </TableCell>
          )}
        </TableRow>
      </TableHead>

      <TableBody>
        {productRows}
        <AddNewProductToTable
          products={products}
          onChange={onProductChange}
          showProductRemoveButton={showProductRemoveButton}
          showTaxRate={showTaxRate}
          showTotalWithTax={showTotalWithTax}
        />
      </TableBody>
    </Table>
  );
};

TransactionProductTable.propTypes = {
  products: PropTypes.array,
  onProductChange: PropTypes.func,
  selectedProducts: PropTypes.array,
  onProductAttributeChange: PropTypes.func,
  onProductRemove: PropTypes.func,
  classes: PropTypes.object.isRequired,
  hasTableProducts: PropTypes.bool
};

export default withStyles(TransactionProductTableStyles)(
  TransactionProductTable
);
