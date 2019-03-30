import React from "react";
import PropTypes from "prop-types";
import { TableCell, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const WarehousesHeaderRow = ({ warehouses }) => {
  if (!Object.keys(warehouses).length) {
    return (
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
  }

  return warehouses.map(warehouse => {
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
  });
};

WarehousesHeaderRow.propTypes = {
  warehouses: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default WarehousesHeaderRow;
