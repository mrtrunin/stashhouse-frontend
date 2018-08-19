import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { addCommas } from "services/functions";

import { Link } from "react-router-dom";
import ExportPdfButton from "./ExportPdfButton";
import SendEmailButton from "./SendEmailButton";

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

const styles = theme => ({
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
    handleSendEmail,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPage,
    page,
    filteredTransactionType
  } = props;

  let linkTargetOptions = {
    INVOICE: "sell",
    PURCHASE: "buy",
    TRANSFER: "move"
  };

  let transactionRows = transactions
    .filter(transaction => {
      if (filteredTransactionType === "ALL") {
        return true;
      }
      return transaction.type === filteredTransactionType;
    })
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(transaction => {
      let date_created = moment(transaction.date_created).format("DD-MMM-YYYY");
      let date_due = moment(transaction.date_due).format("DD-MMM-YYYY");

      let showInvoiceAttribute = transaction.type === "INVOICE";
      let showTransferAttribute = transaction.type === "TRANSFER";
      let linkTarget = linkTargetOptions[transaction.type];

      let transactionAmountWithTax = transaction.amount + transaction.tax;

      let paidAmount = transaction.paid_amount;
      let unpaidAmount = transactionAmountWithTax - paidAmount;
      let absUnpaidAmount = Math.abs(unpaidAmount);
      let showUnpaidAmount =
        transactionAmountWithTax !== paidAmount && showInvoiceAttribute;

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
            {transaction.customer || "-"}
          </TableCell>
          <TableCell padding="dense" name="Warehouse">
            {transaction.warehouse}
          </TableCell>
          <TableCell padding="dense" name="Total Amount" numeric>
            {addCommas(transactionAmountWithTax.toFixed(2))}
            {showUnpaidAmount && (
              <Typography
                variant="caption"
                component={Link}
                to={
                  "/payment-list/invoice/" +
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
          <TableCell padding="dense">
            {showInvoiceAttribute && (
              <SendEmailButton
                transaction={transaction}
                onClick={handleSendEmail}
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
            <TableCell padding="dense" numeric>
              Amount
            </TableCell>
            <TableCell padding="dense" numeric />
            <TableCell padding="dense" numeric />
          </TableRow>
        </TableHead>
        <TableBody>{transactionRows}</TableBody>
      </Table>

      <TablePagination
        component="div"
        count={transactions.length}
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
  handleSendEmail: PropTypes.func.isRequired
};

export default withTheme()(withStyles(styles)(TransactionsTable));
