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

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 2,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

const WarehouseTable = props => {
  const { classes, productsStock, warehouses } = props;

  const hasWarehouses = warehouses.length > 0;

  // The Header row for Warehouses
  let warehousesHeaderRow = hasWarehouses ? (
    warehouses.map(warehouse => {
      return (
        <TableCell padding="dense" numeric key={warehouse.id}>
          <Typography
            align="right"
            color="secondary"
            style={{
              textDecoration: "none",
              fontSize: 13
            }}
            component={Link}
            to={"/warehouse/" + warehouse.id}
          >
            {warehouse.name}
          </Typography>
        </TableCell>
      );
    })
  ) : (
    <TableCell padding="dense" numeric>
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
  let productRow = productsStock.map(productStock => {
    let totalQuantity = 0;

    return (
      <TableRow key={productStock.id}>
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
            to={"/product/" + productStock.id}
          >
            {productStock.name}
          </Typography>
        </TableCell>
        <TableCell padding="dense">{productStock.ean}</TableCell>
        {Object.keys(productStock.stock).map(warehouse => {
          let stockQuantityForWarehouse =
            productStock.stock[warehouse].quantity;
          totalQuantity += stockQuantityForWarehouse;

          return (
            <TableCell padding="dense" key={warehouse} numeric>
              {stockQuantityForWarehouse}
            </TableCell>
          );
        })}
        <TableCell padding="dense" numeric>
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
            <TableCell padding="dense" numeric>
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
  productsStock: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WarehouseTable);
