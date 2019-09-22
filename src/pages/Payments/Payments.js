import React, { useState, useEffect, useCallback } from "react";
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
    count,
    next,
    previous,
    actions: { fetchPayments, deletePayments, fetchPaymentsByPageUrl },
    match: {
      params: { paymentId, invoiceId }
    }
  } = props;

  const [selectedPayments, setSelectedPayments] = useState([]);
  const [showPaymentEditor, setShowPaymentEditor] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [page, setPage] = useState(0);

  const fetchData = useCallback(() => {
    fetchPayments(business.name);
  }, [fetchPayments, business]);

  const showEditors = useCallback(() => {
    if (paymentId || invoiceId) {
      handleShowPaymentEditor();
    }
  }, [paymentId, invoiceId]);

  useEffect(() => {
    fetchData();
  }, [paymentId, fetchData]);

  useEffect(() => setRedirect(false), [redirect]);
  useEffect(() => {
    showEditors();
  }, [props, showEditors]);

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
    await handleHidePaymentEditor();
  };

  const handleShowPaymentEditor = () => {
    setShowPaymentEditor(true);
  };

  const handleHidePaymentEditor = async () => {
    await setShowPaymentEditor(false);
    await setRedirect(true);
  };

  const handleChangePage = async (e, nextPage) => {
    await fetchPaymentsByPageUrl(nextPage > page ? next : previous);
    await setPage(nextPage);
  };

  if (!fetched) {
    return <p>Loading...</p>;
  }

  if (redirect) return <Redirect exact to="/payments/" />;

  return (
    <div className={classes.root}>
      <PaymentsImportBox />
      <PaymentsTable
        payments={payments}
        selectedPayments={selectedPayments}
        onChange={handleCheckbox}
        count={count}
        page={page}
        handleChangePage={handleChangePage}
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
        <Payment
          paymentId={paymentId}
          invoiceId={invoiceId}
          hidePaymentEditor={handleHidePaymentEditor}
        >
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
  business: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  next: PropTypes.string,
  previous: PropTypes.string
};

const mapStateToProps = state => {
  return {
    payments: state.payments.payments,
    fetched: state.payments.fetched,
    business: state.business.business,
    count: state.payments.count,
    next: state.payments.next,
    previous: state.payments.previous
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
