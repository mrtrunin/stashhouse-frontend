import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PaymentsTable from "./components/PaymentsTable";
import Payment from "containers/Payment/Payment";

import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";

import * as actions from "./PaymentsActions";
import { withStyles } from "@material-ui/core";
import { PaymentsStyle } from "./PaymentsStyle";
import PaymentsImportBox from "./components/PaymentsImportBox";

import ButtonRow from "components/ButtonRow/ButtonRow";
import { Button } from "@material-ui/core";

export class Payments extends Component {
  state = {
    selectedPayments: [],
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

  handleCheckbox = e => {
    const { payments } = this.props;

    if (e.target.name === "select_all" && e.target.checked) {
      payments.forEach(payment => {
        this.addPaymentIdToState(parseInt(payment.id, 10));
      });
    }

    if (e.target.name === "select_all" && !e.target.checked) {
      payments.forEach(() => {
        this.setState({ selectedPayments: [] });
      });
    }

    if (e.target.checked) {
      this.addPaymentIdToState(e.target.id);
    } else {
      this.removePaymentIdFromState(e.target.id);
    }
  };

  addPaymentIdToState(paymentId) {
    this.setState(prevState => ({
      selectedPayments: [...prevState.selectedPayments, parseInt(paymentId, 10)]
    }));
  }

  removePaymentIdFromState(paymentId) {
    let index = this.state.selectedPayments.indexOf(parseInt(paymentId, 10));
    this.setState(prevState => ({
      selectedPayments: [
        ...prevState.selectedPayments.slice(0, index),
        ...prevState.selectedPayments.slice(index + 1)
      ]
    }));
  }

  handleDeletePayments = async () => {
    const {
      business,
      actions: { fetchPayments, deletePayments }
    } = this.props;
    await deletePayments(this.state.selectedPayments);
    await fetchPayments(business.name);
    await this.setState({ selectedPayments: [] });
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
    const { payments, fetched, classes } = this.props;
    const { showPaymentEditor, redirectToRoot, selectedPayments } = this.state;

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
      <div className={classes.root}>
        <PaymentsImportBox />
        <PaymentsTable
          payments={payments}
          selectedPayments={selectedPayments}
          onChange={this.handleCheckbox}
        />

        <ButtonRow show={selectedPayments.length > 0}>
          <Button
            color="secondary"
            variant="contained"
            onClick={this.handleDeletePayments}
          >
            Delete payments
          </Button>
        </ButtonRow>

        {showPaymentEditor && (
          <Payment
            hidePayment={this.hidePaymentEditor}
            paymentId={this.props.match.params.paymentId}
            invoiceId={this.props.match.params.invoiceId}
          />
        )}
      </div>
    );
  }
}

Payments.propTypes = {
  classes: PropTypes.object.isRequired,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(PaymentsStyle)(Payments));
