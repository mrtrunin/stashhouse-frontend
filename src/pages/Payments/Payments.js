import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PaymentsTable from "./components/PaymentsTable";
import Payment from "pages/Payment/Payment";

import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";

import * as actions from "./PaymentsActions";
import { withStyles } from "@material-ui/core";
import { PaymentsStyle } from "./PaymentsStyle";
import PaymentsImportBox from "./components/PaymentsImportBox";

import ButtonRow from "components/Buttons/ButtonRow";
import { Button } from "@material-ui/core";
import PaymentEditor from "../Payment/PaymentEditor";

const Payments = props => {
  const {
    business,
    payments,
    fetched,
    classes,
    actions: { fetchPayments, deletePayments },
    match: {
      params: { paymentId, invoiceId },
      path
    }
  } = props;

  const isOnRootPath = path === "/payments/" || path === "/payments";

  const [selectedPayments, setSelectedPayments] = useState([]);
  const [showPaymentEditor, setShowPaymentEditor] = useState(false);
  const [redirectToRoot, setRedirectToRoot] = useState(false);

  useEffect(() => {
    fetchData();
    showEditors();

    if (redirectToRoot) {
      setRedirectToRoot(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [business]);

  useEffect(() => {
    showEditors();
  }, [props]);

  const fetchData = () => {
    fetchPayments(business.name);
  };

  const handleCheckbox = e => {
    if (e.target.name === "select_all" && e.target.checked) {
      payments.forEach(payment => {
        addPaymentIdToState(parseInt(payment.id, 10));
      });
      return;
    }

    if (e.target.name === "select_all" && !e.target.checked) {
      payments.forEach(() => {
        setSelectedPayments([]);
      });
      return;
    }

    if (e.target.checked) {
      addPaymentIdToState(e.target.id);
    } else {
      removePaymentIdFromState(e.target.id);
    }
  };

  const addPaymentIdToState = paymentId => {
    setSelectedPayments(selectedPayments => [
      ...selectedPayments,
      parseInt(paymentId, 10)
    ]);
  };

  const removePaymentIdFromState = paymentId => {
    let index = selectedPayments.indexOf(parseInt(paymentId, 10));
    setSelectedPayments(selectedPayments => [
      ...selectedPayments.slice(0, index),
      ...selectedPayments.slice(index + 1)
    ]);
  };

  const handleDeletePayments = async () => {
    await deletePayments(selectedPayments);
    await fetchPayments(business.name);
    await setSelectedPayments([]);
    handleHidePaymentEditor();
  };

  const showEditors = async () => {
    if (paymentId || invoiceId) {
      handleShowPaymentEditor();
    } else {
      handleHidePaymentEditor();
    }
  };

  const handleShowPaymentEditor = () => {
    setShowPaymentEditor(true);
  };

  const handleHidePaymentEditor = () => {
    setShowPaymentEditor(false);
    setRedirectToRoot(true);
  };

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
        onChange={handleCheckbox}
      />

      <ButtonRow show={selectedPayments.length > 0}>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleDeletePayments}
        >
          Delete payments
        </Button>
      </ButtonRow>

      {showPaymentEditor && (
        <Payment paymentId={paymentId} invoiceId={invoiceId}>
          <PaymentEditor hidePayment={handleHidePaymentEditor} />
        </Payment>
      )}
    </div>
  );
};

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
