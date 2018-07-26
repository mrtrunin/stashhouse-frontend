import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import fetchPayments from "api/fetchPayments";

import PaymentListTable from "./PaymentListTable";
import PaymentEditor from "components/Editors/PaymentEditor";

import { Redirect } from "react-router-dom";

export class PaymentListContainer extends Component {
  state = {
    showPaymentEditor: false,
    redirectToRoot: false
  };

  componentDidMount = () => {
    this.fetchData();
    this.showEditors();
  };

  componentDidUpdate = prevProps => {
    if (prevProps !== this.props) {
      this.showEditors(this.props);
    }

    if (prevProps.business !== this.props.business) {
      this.fetchData();
    }

    if (this.state.redirectToRoot) {
      this.setState(() => ({
        redirectToRoot: false
      }));
    }
  };

  fetchData = () => {
    const { business } = this.props;
    fetchPayments(business.name);
  };

  showEditors = nextProps => {
    let props = nextProps ? nextProps : this.props;
    const { paymentId, invoiceId } = props.match.params;

    if (paymentId || invoiceId) {
      this.showPaymentEditor();
    }
  };

  showPaymentEditor = () => {
    this.setState(() => ({ showPaymentEditor: true }));
  };

  hidePaymentEditor = async () => {
    await this.setState(() => ({
      showPaymentEditor: false,
      redirectToRoot: true
    }));
  };

  render() {
    const { payments, fetched } = this.props;
    const { showPaymentEditor, redirectToRoot } = this.state;

    const isOnRootPath =
      this.props.match.path === "/payment-list/" ||
      this.props.match.path === "/payment-list";

    if (!fetched) {
      return <p>Loading...</p>;
    }

    if (redirectToRoot && !isOnRootPath) {
      return <Redirect exact to="/payment-list/" />;
    }

    return (
      <div>
        <PaymentListTable payments={payments} />

        {/* TODO: Introduce delete option for payments */}

        {showPaymentEditor && (
          <PaymentEditor
            hidePaymentEditor={this.hidePaymentEditor}
            paymentId={this.props.match.params.paymentId}
            invoiceId={this.props.match.params.invoiceId}
          />
        )}
      </div>
    );
  }
}

PaymentListContainer.propTypes = {
  payments: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  fetched: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      paymentId: PropTypes.string,
      invoiceId: PropTypes.string
    }),
    path: PropTypes.string
  }),
  business: PropTypes.object.isRequired
};

export default connect(store => {
  return {
    payments: store.payments.payments,
    fetched: store.payments.fetched,
    business: store.business.business
  };
})(PaymentListContainer);
