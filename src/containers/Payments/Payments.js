import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PaymentsTable from "./components/PaymentsTable";
import Payment from "containers/Payment/Payment";

import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";

import * as actions from "./PaymentsActions";

export class Payments extends Component {
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
    const {
      business,
      actions: { fetchPayments }
    } = this.props;
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
      this.props.match.path === "/payments/" ||
      this.props.match.path === "/payments";

    if (!fetched) {
      return <p>Loading...</p>;
    }

    if (redirectToRoot && !isOnRootPath) {
      return <Redirect exact to="/payments/" />;
    }

    return (
      <div>
        <PaymentsTable payments={payments} />

        {/* TODO: Introduce delete option for payments */}

        {showPaymentEditor && (
          <Payment
            hidePaymentEditor={this.hidePaymentEditor}
            paymentId={this.props.match.params.paymentId}
            invoiceId={this.props.match.params.invoiceId}
          />
        )}
      </div>
    );
  }
}

Payments.propTypes = {
  actions: PropTypes.object.isRequired,
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

const mapStateToProps = state => {
  return {
    payments: state.payments.payments,
    fetched: state.payments.fetched,
    business: state.business.business
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
