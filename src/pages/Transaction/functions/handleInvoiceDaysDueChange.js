import store from "store";

const handleInvoiceDaysDueChange = e => {
  const daysDue = e.target.value;

  store.dispatch({
    type: "TRANSACTION_STATE_CHANGE_DAYS_DUE",
    payload: daysDue
  });
};

handleInvoiceDaysDueChange.propTypes = {};

export default handleInvoiceDaysDueChange;
