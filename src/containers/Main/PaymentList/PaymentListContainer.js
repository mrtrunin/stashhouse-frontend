import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import fetchPayments from "api/fetchPayments";

import { Button } from "@material-ui/core";

import PaymentListTable from "./PaymentListTable";
import PaymentEditor from "components/Editors/PaymentEditor";
import ButtonRow from "components/ButtonRow/ButtonRow";

export class PaymentListContainer extends Component {
  state = {
    showPaymentEditor: false
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
  };

  fetchData = () => {
    const { business } = this.props;
    fetchPayments(business.name);
  };

  showEditors = nextProps => {
    let props = nextProps ? nextProps : this.props;
    if (props.match.params.paymentId) {
      this.showPaymentEditor();
    }
  };

  showPaymentEditor = () => {
    this.setState(() => ({ showPaymentEditor: true }));
  };

  hidePaymentEditor = () => {
    this.setState(() => ({ showPaymentEditor: false }));
  };

  render() {
    const { payments, fetched } = this.props;
    const { showPaymentEditor } = this.state;

    if (!fetched) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <PaymentListTable payments={payments} />

        <ButtonRow show={!showPaymentEditor}>
          <Button
            color="primary"
            variant="raised"
            onClick={this.showPaymentEditor}
          >
            Add payment
          </Button>
        </ButtonRow>

        {showPaymentEditor && (
          <PaymentEditor
            hidePaymentEditor={this.hidePaymentEditor}
            paymentId={this.props.match.params.paymentId}
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
    params: PropTypes.shape({ paymentId: PropTypes.string })
  }),
  business: PropTypes.object.isRequired
};

export default connect(store => {
  return {
    payments: store.payments.payments,
    fetched: store.payments.fetched,
    business: store.user.business
  };
})(PaymentListContainer);
