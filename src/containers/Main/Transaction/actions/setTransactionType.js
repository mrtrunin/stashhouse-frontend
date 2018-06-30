import store from "store";

const setTransactionType = transactionType => {
  return store.dispatch({
    type: "TRANSACTION_STATE_SET_TRANSACTION_TYPE",
    payload: transactionType
  });
};

setTransactionType.propTypes = {};

export default setTransactionType;
