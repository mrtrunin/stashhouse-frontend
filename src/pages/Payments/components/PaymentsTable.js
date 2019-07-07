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
  Typography,
  TablePagination
} from "@material-ui/core";

import moment from "moment";

import { Link } from "react-router-dom";
import { PaymentsTableStyle } from "./PaymentsTableStyle";

const PaymentsTable = props => {
  const {
    classes,
    payments,
    selectedPayments,
    onChange,
    count,
    page,
    handleChangePage
  } = props;

  let paymentsBody = payments.map((payment, index) => {
    let date_payment = moment(payment.date_payment).format("DD-MMM-YYYY");
    return (
      <TableRow key={index}>
        <TableCell>
          <Checkbox
            color="primary"
            onChange={onChange}
            id={payment.id.toString()}
            checked={selectedPayments.includes(payment.id)}
          />
        </TableCell>
        <TableCell>{date_payment}</TableCell>
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
        <TableCell>{payment.transaction ? payment.transaction : ""}</TableCell>
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
              <Checkbox color="primary" onChange={onChange} name="select_all" />
            </TableCell>
            <TableCell>Payment Date</TableCell>
            <TableCell>Sender Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Transaction</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{paymentsBody}</TableBody>
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
    </Paper>
  );
};

PaymentsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  payments: PropTypes.array.isRequired,
  selectedPayments: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired
};

export default withStyles(PaymentsTableStyle)(PaymentsTable);
