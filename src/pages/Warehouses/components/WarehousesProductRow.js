import React from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell, withStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export const style = () => ({
  redNumbers: {
    fontWeight: "bold",
    color: "red"
  }
});

const WarehousesProductRow = ({ products, classes }) => {
  return products.map(product => {
    let totalQuantity = 0;

    if (!product.stock) {
      return <TableRow key={product.id}>Loading</TableRow>;
    }

    return (
      <TableRow key={product.id}>
        <TableCell padding="dense">
          <Typography
            align="center"
            noWrap
            color="secondary"
            style={{
              textDecoration: "none",
              display: "inline"
            }}
            component={Link}
            to={"/product/" + product.id}
          >
            {product.name}
          </Typography>
        </TableCell>
        <TableCell padding="dense">{product.ean}</TableCell>

        {Object.keys(product.stock).map(warehouse => {
          const stockQuantityForWarehouse = product.stock[warehouse].quantity;
          totalQuantity += stockQuantityForWarehouse;

          return (
            <TableCell
              padding="dense"
              key={warehouse}
              align="right"
              className={
                stockQuantityForWarehouse < 0 ? classes.redNumbers : ""
              }
            >
              {stockQuantityForWarehouse}
            </TableCell>
          );
        })}
        <TableCell padding="dense" align="right">
          <strong>{totalQuantity}</strong>
        </TableCell>
      </TableRow>
    );
  });
};

WarehousesProductRow.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(WarehousesProductRow);
