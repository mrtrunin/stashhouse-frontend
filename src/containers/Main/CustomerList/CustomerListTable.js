import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";

const CustomerListTable = props => {
  const { merchants } = props;

  let transactionRows = merchants.map((merchant, i) => {
    return (
      <TableRow key={i}>
        <TableCell name="Name" padding="dense">
          <Typography
            align="left"
            color="secondary"
            style={{
              textDecoration: "none",
              fontSize: 13
            }}
            component={Link}
            to={"/customer/" + merchant.id}
          >
            {merchant.name}
          </Typography>
        </TableCell>
        <TableCell name="Address" padding="dense">
          {merchant.address}
        </TableCell>
        <TableCell name="Zip Code" padding="dense">
          {merchant.zip_code}
        </TableCell>
        <TableCell name="City" padding="dense">
          {merchant.city}
        </TableCell>
        <TableCell name="Country" padding="dense">
          {merchant.country}
        </TableCell>
        <TableCell name="Phone number">{merchant.phone_number}</TableCell>
      </TableRow>
    );
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="dense">Name</TableCell>
          <TableCell padding="dense">Address</TableCell>
          <TableCell padding="dense">Zip code</TableCell>
          <TableCell padding="dense">City</TableCell>
          <TableCell padding="dense">Country</TableCell>
          <TableCell padding="dense">Phone Number</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{transactionRows}</TableBody>
    </Table>
  );
};

CustomerListTable.propTypes = {
  merchants: PropTypes.array.isRequired
};

export default CustomerListTable;
