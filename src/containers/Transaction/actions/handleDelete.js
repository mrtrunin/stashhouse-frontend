import store from "store";
import deleteTransaction from "api/Transaction/deleteTransaction";

const handleDelete = async (transactionId, redirect) => {
  await deleteTransaction(transactionId);
  await store.dispatch({
    type: "TRANSACTION_STATE_RESET"
  });
  await redirect();
};

handleDelete.propTypes = {};

export default handleDelete;
