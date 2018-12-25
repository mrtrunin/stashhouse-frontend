import axios from "axios";
import Message from "components/Message/Message";

export const FETCH_TRANSACTIONS = "FETCH_TRANSACTIONS";
export const FETCH_TRANSACTIONS_FULFILLED = "FETCH_TRANSACTIONS_FULFILLED";
export const FETCH_TRANSACTIONS_REJECTED = "FETCH_TRANSACTIONS_REJECTED";

const url = process.env.REACT_APP_SERVER_URL;

export function fetchTransactions(businessName) {
  return async dispatch => {
    await dispatch({ type: FETCH_TRANSACTIONS });
    try {
      const { data } = await axios.get(
        url + "/transactions/?business_name=" + businessName
      );
      await dispatch({
        type: FETCH_TRANSACTIONS_FULFILLED,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: FETCH_TRANSACTIONS_REJECTED,
        payload: error
      });
    }
  };
}

export function deleteTransactions(transactionIds) {
  return async dispatch => {
    for (let transactionId of transactionIds) {
      try {
        await axios.delete(url + "/transactions/" + transactionId);

        Message(
          "Transaction " + transactionId + " deleted successfully!",
          "success"
        );
      } catch (error) {
        Message("Could not delete transactions: " + error, "error");
      }
    }
  };
}
