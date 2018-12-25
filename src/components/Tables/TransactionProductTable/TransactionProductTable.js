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

const styles = {
  tableCell: {
    // padding: 0
  }
};

const TransactionProductTable = props => {
  const { classes, products } = props;

  let showProductRemoveButton = true || props.hasTableProducts;
  let showEAN = false;
  let showTaxRate = true;
  let showTotalWithTax = true;

  let productRows = props.selectedProducts
    ? props.selectedProducts.map((product, index) => {
        return (
          <ProductRowInTable
            key={index}
            id={index}
            product={product}
            onChange={props.onProductAttributeChange}
            onClick={props.onProductRemove}
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
          onChange={props.onProductChange}
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

export default withStyles(styles)(TransactionProductTable);
