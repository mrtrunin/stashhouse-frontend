import store from "store";

const handleDelete = async (transactionId, redirect, deleteTransaction) => {
  await deleteTransaction(transactionId);
  await store.dispatch({
    type: "TRANSACTION_STATE_RESET"
  });
  await redirect();
};

handleDelete.propTypes = {};

export default handleDelete;
