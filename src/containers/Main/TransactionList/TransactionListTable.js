import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import addCommas from "functions/addCommas";

import { Link } from "react-router-dom";
import ExportPdfButton from "./ExportPdfButton";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
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
    marginTop: theme.spacing.unit * 2,
    overflowX: "auto"
  },
  unpaidAmount: {
    color: "red",
    textDecoration: "none"
  },
  overpaidAmount: {
    color: "blue"
  }
});

const TransactionListTable = props => {
  const { classes, transactions, selectedTransactions } = props;

  let linkTargetOptions = {
    INVOICE: "sell",
    PURCHASE: "buy",
    TRANSFER: "move"
  };

  let transactionRows = transactions.map(transaction => {
    let date_created = moment(transaction.date_created).format("DD-MMM-YYYY");
    let date_due = moment(transaction.date_due).format("DD-MMM-YYYY");

    let showInvoiceAttribute = transaction.type === "INVOICE";
    let linkTarget = linkTargetOptions[transaction.type];

    let transactionAmountWithTax = transaction.amount + transaction.tax;

    let paidAmount = transaction.paid_amount;
    let unpaidAmount = transactionAmountWithTax - paidAmount;
    let absUnpaidAmount = Math.abs(unpaidAmount);
    let showUnpaidAmount =
      transactionAmountWithTax !== paidAmount && showInvoiceAttribute;

    return (
      <TableRow key={transaction.id}>
        <TableCell padding="dense" name="checkbox">
          <Checkbox
            onChange={props.onChange}
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
          {transaction.merchant}
        </TableCell>
        <TableCell padding="dense" name="Total Amount" numeric>
          {addCommas(transactionAmountWithTax.toFixed(2))}
          {showUnpaidAmount && (
            <Typography
              variant="caption"
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
          {showInvoiceAttribute && (
            <ExportPdfButton
              transaction={transaction}
              onClick={props.onClick}
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
            <TableCell padding="dense">
              <Checkbox onChange={props.onChange} name="select_all" />
            </TableCell>
            <TableCell padding="dense">Transaction</TableCell>
            <TableCell padding="dense">Date created</TableCell>
            <TableCell padding="dense">Date due</TableCell>
            <TableCell padding="dense">Customer</TableCell>
            <TableCell padding="dense" numeric>
              Amount
            </TableCell>
            <TableCell padding="dense" numeric />
          </TableRow>
        </TableHead>
        <TableBody>{transactionRows}</TableBody>
      </Table>
    </Paper>
  );
};

TransactionListTable.propTypes = {
  transactions: PropTypes.array,
  onClick: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  selectedTransactions: PropTypes.array
};

export default withTheme()(withStyles(styles)(TransactionListTable));
