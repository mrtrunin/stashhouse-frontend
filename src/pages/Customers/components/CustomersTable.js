import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TablePagination
} from "@material-ui/core";
import { Link } from "react-router-dom";

const CustomersTable = props => {
  const { customers, count, page, handleChangePage } = props;

  let transactionRows = customers.map((customer, i) => {
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
            to={"/customer/" + customer.id}
          >
            {customer.name}
          </Typography>
        </TableCell>
        <TableCell name="Email" padding="dense">
          {customer.email}
        </TableCell>
        <TableCell name="Address" padding="dense">
          {customer.address}
        </TableCell>
        <TableCell name="Zip Code" padding="dense">
          {customer.zip_code}
        </TableCell>
        <TableCell name="City" padding="dense">
          {customer.city}
        </TableCell>
        <TableCell name="Country" padding="dense">
          {customer.country}
        </TableCell>
        <TableCell name="Phone number">{customer.phone_number}</TableCell>
        <TableCell name="Default warehouse">
          {customer.default_warehouse ? customer.default_warehouse.name : "-"}
        </TableCell>
      </TableRow>
    );
  });

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="dense">Name</TableCell>
            <TableCell padding="dense">Email</TableCell>
            <TableCell padding="dense">Address</TableCell>
            <TableCell padding="dense">Zip code</TableCell>
            <TableCell padding="dense">City</TableCell>
            <TableCell padding="dense">Country</TableCell>
            <TableCell padding="dense">Phone Number</TableCell>
            <TableCell padding="dense">Default Warehouse</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{transactionRows}</TableBody>
      </Table>
      <TablePagination
        component="div"
        count={count}
        rowsPerPage={10}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page"
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page"
        }}
        onChangePage={handleChangePage}
        rowsPerPageOptions={[10]}
      />
    </>
  );
};

CustomersTable.propTypes = {
  customers: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired
};

export default CustomersTable;
