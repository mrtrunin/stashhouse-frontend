import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import moment from "moment";

import * as paymentActions from "./PaymentActions";
import * as paymentsActions from "pages/Payments/PaymentsActions";

import { addCommas } from "services/functions";
import { bindActionCreators } from "redux";

import { MenuItem } from "@material-ui/core";

const Payment = props => {
  const {
    invoiceId,
    paymentId,
    payment,
    invoices,
    business,
    children,
    hidePaymentEditor,
    actions: {
      resetPayment,
      fetchInvoices,
      fetchPayment,
      updatePaymentField,
      fetchPayments,
      updatePayment,
      createPayment,
      deletePayment
    }
  } = props;

  useEffect(() => {
    resetPayment();
    fetchInvoices();
    fetchPayment(paymentId);
  }, [resetPayment, fetchInvoices, fetchPayment, paymentId]);

  const handlePaymentChangeStore = useCallback(
    (field, value) => {
      updatePaymentField(field, value);
    },
    [updatePaymentField]
  );

  const handleInvoiceChange = useCallback(
    async invoiceId => {
      handlePaymentChangeStore("transaction", invoiceId);
    },
    [handlePaymentChangeStore]
  );

  useEffect(() => {
    if (invoiceId) {
      handleInvoiceChange(invoiceId);
    }
  }, [invoiceId, handleInvoiceChange]);

  useEffect(() => {
    fetchPayment(paymentId);
  }, [paymentId, fetchPayment]);

  const handleDateChange = async date => {
    handlePaymentChangeStore("date_payment", moment(date).format());
  };

  const handlePaymentChange = e => {
    let field = e.target.name;
    let value = e.target.value;

    if (e.target.name === "date_payment") {
      value = moment(e.target.value).format();
    }

    handlePaymentChangeStore(field, value);
  };

  const handleCreatePayment = async () => {
    const relatedInvoice = invoices.find(invoice => {
      return invoice.full_transaction_number === payment.transaction;
    });

    await createPayment(
      payment.date_payment,
      relatedInvoice.id,
      payment.amount,
      payment.sender_name,
      payment.payment_method,
      payment.description,
      business.name
    );
    await fetchPayments(business.name);
  };

  const handleUpdatePayment = async () => {
    const relatedInvoice = invoices.find(invoice => {
      return invoice.full_transaction_number === payment.transaction;
    });

    await updatePayment(
      payment.date_payment,
      relatedInvoice.id,
      payment.amount,
      payment.sender_name,
      payment.payment_method,
      payment.description,
      payment.id
    );
    await fetchPayments(business.name);
    await hidePaymentEditor();
  };

  const handleDeletePayment = async () => {
    await deletePayment(payment.id);
    await fetchPayments(business.name);
    await hidePaymentEditor();
  };

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

  const childrenWithProps = React.Children.map(children, child => {
    return React.cloneElement(child, {
      payment: payment,
      invoicesList: invoicesList,
      invoice: invoice,
      invoiceId: invoiceId,
      handlePaymentChange: handlePaymentChange,
      handleDateChange: handleDateChange,
      handleDeletePayment: handleDeletePayment,
      handleCreatePayment: handleCreatePayment,
      handleUpdatePayment: handleUpdatePayment
    });
  });

  return <div>{childrenWithProps}</div>;
};

Payment.propTypes = {
  business: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  payment: PropTypes.object,
  invoices: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  paymentId: PropTypes.string,
  invoiceId: PropTypes.string,
  children: PropTypes.object.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string
  }),
  hidePaymentEditor: PropTypes.func.isRequired
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
