import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { addCommas } from "services/functions";

import { Link } from "react-router-dom";
import ExportPdfButton from "./ExportPdfButton";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from "@material-ui/core";

import {
  withTheme,
  Checkbox,
  Paper,
  withStyles,
  Typography
} from "@material-ui/core";

import ShowCounterOrSendEmailButton from "./ShowCounterOrSendEmailButton";

export const TransactionsTableStyle = theme => ({
  root: {
    overflowX: "auto"
  },
  unpaidAmount: {
    color: "red",
    textDecoration: "none"
  },
  overpaidAmount: {
    color: "blue"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: theme.spacing.unit
  }
});

const TransactionsTable = props => {
  const {
    classes,
    transactions,
    selectedTransactions,
    onChange,
    onClick,
    handleOpenEmail,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPage,
    page,
    filteredTransactionType
  } = props;

  const linkTargetOptions = {
    INVOICE: "sell",
    PURCHASE: "buy",
    TRANSFER: "move"
  };

  const unpaidAmountTolerance = 0.05;

  const filteredTransactions = transactions.filter(transaction => {
    let transactionAmountWithTax = transaction.amount + transaction.tax;
    let paidAmount = transaction.paid_amount;
    let unpaidAmount = transactionAmountWithTax - paidAmount;
    let absUnpaidAmount = Math.abs(unpaidAmount);

    if (filteredTransactionType === "ALL") {
      return true;
    }

    if (filteredTransactionType === "UNPAID") {
      return (
        transaction.type === "INVOICE" &&
        absUnpaidAmount >= unpaidAmountTolerance
      );
    }
    return transaction.type === filteredTransactionType;
  });
  const sortedTransactions = filteredTransactions.sort(
    (transactionA, transactionB) => {
      return (
        new Date(transactionB.date_created) -
        new Date(transactionA.date_created)
      );
    }
  );

  const transactionRows = sortedTransactions
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(transaction => {
      const date_created = moment(transaction.date_created).format(
        "DD-MMM-YYYY"
      );
      const date_due = moment(transaction.date_due).format("DD-MMM-YYYY");

      const showInvoiceAttribute = transaction.type === "INVOICE";
      const showTransferAttribute = transaction.type === "TRANSFER";
      const linkTarget = linkTargetOptions[transaction.type];

      const transactionAmountWithTax = transaction.amount + transaction.tax;
      const paidAmount = transaction.paid_amount;
      const unpaidAmount = transactionAmountWithTax - paidAmount;

      const absUnpaidAmount = Math.abs(unpaidAmount);
      const showUnpaidAmount =
        absUnpaidAmount >= unpaidAmountTolerance && showInvoiceAttribute;

      return (
        <TableRow key={transaction.id}>
          <TableCell padding="checkbox" name="checkbox">
            <Checkbox
              onChange={onChange}
              id={transaction.id.toString()}
              checked={selectedTransactions.includes(transaction.id)}
            />
          </TableCell>
          <TableCell padding="dense" name="ID">
            <Typography
              align="center"
              noWrap
              color="secondary"
              style={{
                textDecoration: "none",
                display: "inline"
              }}
              component={Link}
              to={linkTarget + "/" + transaction.id}
            >
              {transaction.full_transaction_number}
            </Typography>
          </TableCell>
          <TableCell padding="dense" name="Date created">
            {date_created}
          </TableCell>
          <TableCell padding="dense" name="Date due">
            {date_due}
          </TableCell>
          <TableCell padding="dense" name="Customer">
            {transaction.customer ? transaction.customer.name : "-" || "-"}
          </TableCell>
          <TableCell padding="dense" name="Warehouse">
            {transaction.warehouse}
          </TableCell>
          <TableCell padding="dense" name="Total Amount" align="right">
            {addCommas(transactionAmountWithTax.toFixed(2))}
            {showUnpaidAmount && (
              <Typography
                variant="caption"
                component={Link}
                to={
                  "/payments/invoice/" +
                  transaction.full_transaction_number +
                  "/"
                }
                className={
                  unpaidAmount > 0
                    ? classes.unpaidAmount
                    : unpaidAmount < 0
                    ? classes.overpaidAmount
                    : ""
                }
              >
                {unpaidAmount > 0
                  ? "Unpaid: "
                  : unpaidAmount < 0
                  ? "Overpaid: "
                  : ""}
                {addCommas(absUnpaidAmount.toFixed(2))}
              </Typography>
            )}
          </TableCell>
          <TableCell padding="dense">
            {(showInvoiceAttribute || showTransferAttribute) && (
              <ExportPdfButton transaction={transaction} onClick={onClick} />
            )}
          </TableCell>
          <TableCell padding="dense" align="center">
            {showInvoiceAttribute && (
              <ShowCounterOrSendEmailButton
                transaction={transaction}
                handleOpenEmail={handleOpenEmail}
              />
            )}
          </TableCell>
        </TableRow>
      );
    });

  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox onChange={onChange} name="select_all" />
            </TableCell>
            <TableCell padding="dense">Transaction</TableCell>
            <TableCell padding="dense">Date created</TableCell>
            <TableCell padding="dense">Date due</TableCell>
            <TableCell padding="dense">Customer</TableCell>
            <TableCell padding="dense">Warehouse</TableCell>
            <TableCell padding="dense" align="right">
              Amount
            </TableCell>
            <TableCell padding="dense" align="right" />
            <TableCell padding="dense" align="right" />
          </TableRow>
        </TableHead>
        <TableBody>{transactionRows}</TableBody>
      </Table>

      <TablePagination
        component="div"
        count={filteredTransactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page"
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page"
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

TransactionsTable.propTypes = {
  transactions: PropTypes.array,
  onClick: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  selectedTransactions: PropTypes.array,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  data: PropTypes.object,
  filteredTransactionType: PropTypes.string,
  handleFilterTransactionType: PropTypes.func,
  handleOpenEmail: PropTypes.func.isRequired
};

export default withTheme()(
  withStyles(TransactionsTableStyle)(TransactionsTable)
);
