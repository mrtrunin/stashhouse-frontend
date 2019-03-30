import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { Paper, withStyles } from "@material-ui/core";
import WarehousesHeaderRow from "./WarehousesHeaderRow";
import WarehousesProductRow from "./WarehousesProductRow";

const style = theme => ({
  root: {
    overflowX: "auto"
  },
  table: {
    minWidth: 700,
    width: "100%"
  }
});

const WarehousesTable = ({ classes, products, warehouses }) => {
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell padding="dense">Product</TableCell>
            <TableCell padding="dense">EAN</TableCell>
            <WarehousesHeaderRow warehouses={warehouses} />
            <TableCell padding="dense" align="right">
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <WarehousesProductRow products={products} />
        </TableBody>
      </Table>
    </Paper>
  );
};

WarehousesTable.propTypes = {
  warehouses: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(WarehousesTable);
