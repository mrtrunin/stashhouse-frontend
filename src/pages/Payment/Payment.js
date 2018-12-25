import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import moment from "moment";

import * as paymentActions from "./PaymentActions";
import * as paymentsActions from "pages/Payments/PaymentsActions";

import { addCommas } from "services/functions";
import { bindActionCreators } from "redux";

import { MenuItem } from "@material-ui/core";
import Redirect from "react-router-dom/Redirect";

export class Payment extends Component {
  state = {
    redirectToRoot: false
  };

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

    if (this.state.redirectToRoot) {
      this.setState({ redirectToRoot: false });
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
    await this.setState({
      redirectToRoot: true
    });
  };

  render() {
    const { payment, invoices, invoiceId, children } = this.props;
    const { redirectToRoot } = this.state;
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
        handlePaymentChange: this.handlePaymentChange,
        handleDateChange: this.handleDateChange,
        handleDeletePayment: this.handleDeletePayment,
        handleCreateOrUpdatePayment: this.handleCreateOrUpdatePayment
      });
    });

    return (
      <div>
        {redirectToRoot && <Redirect to="/payments" />}
        {childrenWithProps}
      </div>
    );
  }
}

Payment.propTypes = {
  actions: PropTypes.object.isRequired,
  payment: PropTypes.object,
  invoices: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  paymentId: PropTypes.string,
  invoiceId: PropTypes.string,
  children: PropTypes.object.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string
  })
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
