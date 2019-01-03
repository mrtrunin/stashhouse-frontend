import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { Typography, Paper, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const WarehouseTableStyle = theme => ({
  root: {
    overflowX: "auto"
  },
  table: {
    minWidth: 700,
    width: "100%"
  },
  redNumbers: {
    fontWeight: "bold",
    color: "red"
  }
});

const WarehouseTable = props => {
  const { classes, products, warehouses } = props;

  const hasWarehouses = warehouses.length > 0;

  // The Header row for Warehouses
  let warehousesHeaderRow = hasWarehouses ? (
    warehouses.map(warehouse => {
      return (
        <TableCell padding="dense" align="right" key={warehouse.id}>
          <Typography
            align="right"
            color="secondary"
            style={{
              textDecoration: "none",
              fontSize: 13
            }}
            component={Link}
            to={"/warehouses/" + warehouse.id}
          >
            {warehouse.name}
          </Typography>
        </TableCell>
      );
    })
  ) : (
    <TableCell padding="dense" align="right">
      <Typography
        align="right"
        color="secondary"
        style={{
          textDecoration: "none",
          fontSize: 13
        }}
      >
        No Warehouses
      </Typography>
    </TableCell>
  );
  // End

  // The following creates the content for the table. Sorry for the messy code!
  let productRow = products.map(product => {
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
  // End

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell padding="dense">Product</TableCell>
            <TableCell padding="dense">EAN</TableCell>
            {warehousesHeaderRow}
            <TableCell padding="dense" align="right">
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{productRow}</TableBody>
      </Table>
    </Paper>
  );
};

WarehouseTable.propTypes = {
  warehouses: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(WarehouseTableStyle)(WarehouseTable);