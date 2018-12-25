import React from "react";
import PropTypes from "prop-types";

import EditorButtons from "components/Editors/EditorComponents/EditorButtons";
import Editor from "components/Editors/EditorComponents/Editor";
import EditorHeader from "components/Editors/EditorComponents/EditorHeader";
import EditorContent from "components/Editors/EditorComponents/EditorContent";

import { DatePicker } from "material-ui-pickers";
import { addCommas } from "services/functions";

import {
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Select
} from "@material-ui/core";

import SelectInvoice from "./SelectInvoice";

const PaymentEditor = props => {
  const {
    payment,
    invoicesList,
    hidePayment,
    invoice,
    invoiceId,
    handlePaymentChange,
    handleDateChange,
    handleDeletePayment,
    handleCreateOrUpdatePayment
  } = props;

  const existsPayment = Object.keys(payment).length !== 0 && payment.id > 0;
  const existsInvoices = Object.keys(invoicesList).length !== 0;

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
        addNewObjectLabel={"Add payement for " + invoiceId}
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
              addCommas((invoice.amount + invoice.tax).toFixed(2)) +
              " " +
              (payment.currency ? payment.currency : "EUR")
            : ""
        }
      />

      <EditorContent>
        {invoiceId ? (
          ""
        ) : (
          <SelectInvoice
            payment={payment}
            invoicesList={invoicesList}
            onChange={handlePaymentChange}
          />
        )}

        <DatePicker
          name="date_payment"
          format="YYYY-MM-DD"
          label="Date"
          autoOk
          keyboard
          value={payment.date_payment ? payment.date_payment : new Date()}
          onChange={handleDateChange}
        />

        <TextField
          name="currency"
          value={payment.currency ? payment.currency : "EUR"}
          label="Currency"
          margin="dense"
          onChange={handlePaymentChange}
        />

        <TextField
          name="amount"
          value={payment.amount ? payment.amount : ""}
          label="Amount"
          margin="dense"
          onChange={handlePaymentChange}
        />

        <TextField
          name="sender_name"
          value={payment.sender_name ? payment.sender_name : ""}
          label="Sender Name"
          margin="dense"
          onChange={handlePaymentChange}
        />

        <FormControl>
          <InputLabel htmlFor="payment_method">Payment Method</InputLabel>
          <Select
            value={payment.payment_method ? payment.payment_method : ""}
            onChange={handlePaymentChange}
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
          onChange={handlePaymentChange}
        />
      </EditorContent>

      <EditorButtons
        editedObjectLabel="Payment"
        editedObject={payment}
        deleteAction={handleDeletePayment}
        updateAction={handleCreateOrUpdatePayment}
        createAction={handleCreateOrUpdatePayment}
      />
    </Editor>
  );
};

PaymentEditor.propTypes = {
  payment: PropTypes.object,
  invoicesList: PropTypes.array,
  hidePayment: PropTypes.func.isRequired,
  invoice: PropTypes.object,
  invoiceId: PropTypes.number,
  handlePaymentChange: PropTypes.func,
  handleDateChange: PropTypes.func,
  handleDeletePayment: PropTypes.func,
  handleCreateOrUpdatePayment: PropTypes.func
};

export default PaymentEditor;
