import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableRow,
  TableBody,
  Paper,
  Checkbox,
  TableHead,
  TableCell,
  withStyles,
  Typography
} from "@material-ui/core";

import moment from "moment";

import { Link } from "react-router-dom";
import { PaymentsTableStyle } from "./PaymentsTableStyle";

const PaymentsTable = props => {
  const { classes, payments } = props;

  let paymentsBody = payments.map((payment, index) => {
    let date_payment = moment(payment.date_payment).format("DD-MMM-YYYY");
    return (
      <TableRow key={index}>
        <TableCell>
          <Checkbox color="primary" />
        </TableCell>
        <TableCell>
          <Typography
            align="center"
            noWrap
            color="secondary"
            style={{
              textDecoration: "none",
              display: "inline"
            }}
            component={Link}
            to={"/payment/" + payment.id}
          >
            {payment.sender_name}
          </Typography>
        </TableCell>
        <TableCell>{payment.description}</TableCell>
        <TableCell>{date_payment}</TableCell>
        <TableCell>{payment.transaction}</TableCell>
        <TableCell>{payment.amount}</TableCell>
      </TableRow>
    );
  });

  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox color="primary" />
            </TableCell>
            <TableCell>Sender Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Payment Date</TableCell>
            <TableCell>Transaction</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{paymentsBody}</TableBody>
      </Table>
    </Paper>
  );
};

PaymentsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  payments: PropTypes.array.isRequired
};

export default withStyles(PaymentsTableStyle)(PaymentsTable);
