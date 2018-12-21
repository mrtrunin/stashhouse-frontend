import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { DatePicker } from "material-ui-pickers";

import {
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Select
} from "@material-ui/core";

import moment from "moment";
import EditorButtons from "components/Editors/EditorComponents/EditorButtons";
import Editor from "components/Editors/EditorComponents/Editor";
import EditorHeader from "components/Editors/EditorComponents/EditorHeader";
import EditorContent from "components/Editors/EditorComponents/EditorContent";

import * as paymentActions from "./PaymentActions";
import * as paymentsActions from "containers/Payments/PaymentsActions";

import { addCommas } from "services/functions";
import { bindActionCreators } from "redux";

export class Payment extends Component {
  componentDidMount = async () => {
    const {
      invoiceId,
      actions: { resetPayment, fetchInvoices }
    } = this.props;

    resetPayment();
    await fetchInvoices();
    await this.fetchPayment();

    if (invoiceId) {
      await this.handleInvoiceChange(invoiceId);
    }
  };

  componentDidUpdate = async prevProps => {
    if (prevProps.paymentId !== this.props.paymentId) {
      await this.fetchPayment();
    }
  };

  fetchPayment = async () => {
    const {
      paymentId,
      actions: { fetchPayment }
    } = this.props;

    if (paymentId) {
      await fetchPayment(paymentId);
    }
  };

  handleInvoiceChange = async invoiceId => {
    this.handlePaymentChangeStore("transaction", invoiceId);
  };

  handleDateChange = async date => {
    this.handlePaymentChangeStore("date_payment", moment(date).format());
  };

  handlePaymentChange = e => {
    let field = e.target.name;
    let value = e.target.value;

    this.handlePaymentChangeStore(field, value);

    if (field === "date_payment") {
      value = moment(e.target.value).format();
    }
  };

  handlePaymentChangeStore = (field, value) => {
    const {
      actions: { updatePaymentField }
    } = this.props;

    updatePaymentField(field, value);
  };

  handleCreateOrUpdatePayment = async () => {
    const {
      payment,
      invoices,
      business,
      actions: { fetchPayments, updatePayment, createPayment }
    } = this.props;

    let relatedInvoice = invoices.find(invoice => {
      return invoice.full_transaction_number === payment.transaction;
    });

    if (payment.id) {
      await updatePayment(
        payment.date_payment,
        relatedInvoice.id,
        payment.amount,
        payment.sender_name,
        payment.payment_method,
        payment.description,
        payment.id
      );
    } else {
      await createPayment(
        payment.date_payment,
        relatedInvoice.id,
        payment.amount,
        payment.sender_name,
        payment.payment_method,
        payment.description,
        business.name
      );
    }
    await fetchPayments(business.name);
  };

  handleDeletePayment = async () => {
    const {
      payment,
      business,
      actions: { fetchPayments, deletePayment }
    } = this.props;
    await deletePayment(payment.id);
    await fetchPayments(business.name);
  };

  render() {
    const { payment, invoices, hidePayment, invoiceId } = this.props;

    const existsPayment = Object.keys(payment).length !== 0 && payment.id;
    const existsInvoices = Object.keys(invoices).length !== 0;

    let invoice = null;
    if (existsInvoices) {
      invoice = invoices.find(invoice => {
        return invoice.full_transaction_number === invoiceId;
      });
    }
    const unpaidAmountTolerance = 0.05;

    const invoicesList = existsInvoices
      ? invoices.map((invoice, index) => {
          const invoiceAmountWithTax = invoice.amount + invoice.tax;
          const paidAmount = invoice.paid_amount;
          const unpaidAmount = invoiceAmountWithTax - paidAmount;

          if (unpaidAmount >= unpaidAmountTolerance) {
            return (
              <MenuItem value={invoice.full_transaction_number} key={index}>
                <span>
                  <strong>{invoice.full_transaction_number}</strong>
                  {" (" +
                    addCommas(invoiceAmountWithTax.toFixed(2)) +
                    ") " +
                    invoice.customer.name}
                </span>
              </MenuItem>
            );
          } else return null;
        })
      : "Loading";

    if (!existsInvoices) {
      return (
        <Editor>
          <EditorHeader
            label="Whoa! No invoices, no payments."
            editedObjectSubheader="Please add at least one invoice to add payments"
            hideEditor={hidePayment}
          />
        </Editor>
      );
    }

    return (
      <Editor>
        <EditorHeader
          existsEditedObject={existsPayment}
          addNewObjectLabel={""}
          updateExistingObjectLabel={
            invoiceId
              ? "Payment for " + invoiceId
              : addCommas(payment.amount) +
                " " +
                payment.currency +
                " from " +
                payment.sender_name
          }
          hideEditor={hidePayment}
          editedObjectSubheader={
            invoice
              ? "Invoice amount: " +
                addCommas(invoice.amount + invoice.tax) +
                " " +
                (payment.currency ? payment.currency : "EUR")
              : ""
          }
        />

        <EditorContent>
          {invoiceId ? (
            ""
          ) : (
            <FormControl>
              <InputLabel htmlFor="transaction">Invoice</InputLabel>
              <Select
                value={payment.transaction ? payment.transaction : ""}
                onChange={this.handlePaymentChange}
                name="transaction"
                renderValue={value => value}
                input={<Input id="transaction" />}
              >
                {invoicesList}
              </Select>
            </FormControl>
          )}

          <DatePicker
            name="date_payment"
            format="YYYY-MM-DD"
            label="Date"
            autoOk
            keyboard
            value={payment.date_payment ? payment.date_payment : new Date()}
            onChange={this.handleDateChange}
          />

          <TextField
            name="currency"
            value={payment.currency ? payment.currency : "EUR"}
            label="Currency"
            margin="dense"
            onChange={this.handlePaymentChange}
          />

          <TextField
            name="amount"
            value={payment.amount ? payment.amount : ""}
            label="Amount"
            margin="dense"
            onChange={this.handlePaymentChange}
          />

          <TextField
            name="sender_name"
            value={payment.sender_name ? payment.sender_name : ""}
            label="Sender Name"
            margin="dense"
            onChange={this.handlePaymentChange}
          />

          <FormControl>
            <InputLabel htmlFor="payment_method">Payment Method</InputLabel>
            <Select
              value={payment.payment_method ? payment.payment_method : ""}
              onChange={this.handlePaymentChange}
              name="payment_method"
              renderValue={value => value}
              input={<Input id="payment_method" />}
            >
              <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
            </Select>
          </FormControl>

          <TextField
            name="description"
            value={payment.description ? payment.description : ""}
            label="Description"
            margin="dense"
            onChange={this.handlePaymentChange}
          />
        </EditorContent>

        <EditorButtons
          editedObjectLabel="Payment"
          editedObject={this.props.payment}
          deleteAction={this.handleDeletePayment}
          updateAction={this.handleCreateOrUpdatePayment}
          createAction={this.handleCreateOrUpdatePayment}
        />
      </Editor>
    );
  }
}

Payment.propTypes = {
  actions: PropTypes.object.isRequired,
  hidePayment: PropTypes.func.isRequired,
  payment: PropTypes.object,
  invoices: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  paymentId: PropTypes.string,
  invoiceId: PropTypes.string
};

const mapStateToProps = state => {
  return {
    payment: state.payment.payment,
    invoices: state.payments.invoices,
    business: state.business.business
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { ...paymentActions, ...paymentsActions },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
