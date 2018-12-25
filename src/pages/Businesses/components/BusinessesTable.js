import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableRow,
  TableBody,
  Button,
  TableHead,
  TableCell
} from "@material-ui/core";

const BusinessesTable = props => {
  const { businesses, chooseBusiness } = props;

  const tableContents = businesses.map((business, i) => {
    return (
      <TableRow key={i}>
        <TableCell>{business.name}</TableCell>
        <TableCell>
          <Button
            onClick={chooseBusiness.bind(null, business)}
            color="primary"
            variant="contained"
          >
            Choose
          </Button>
        </TableCell>
      </TableRow>
    );
  });
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Business Name</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>{tableContents}</TableBody>
    </Table>
  );
};

BusinessesTable.propTypes = {
  businesses: PropTypes.array.isRequired,
  chooseBusiness: PropTypes.func.isRequired
};

export default BusinessesTable;
