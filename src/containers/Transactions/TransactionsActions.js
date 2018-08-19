import axios from "axios";
import Message from "components/Message";

export const FETCH_TRANSACTIONS = "FETCH_TRANSACTIONS";
export const FETCH_TRANSACTIONS_FULFILLED = "FETCH_TRANSACTIONS_FULFILLED";
export const FETCH_TRANSACTIONS_REJECTED = "FETCH_TRANSACTIONS_REJECTED";

const url = process.env.REACT_APP_SERVER_URL;

export function fetchTransactions(businessName) {
  return async dispatch => {
    await dispatch({ type: FETCH_TRANSACTIONS });
    try {
      const { data } = await axios.get(
        url + "/transactions/?business_name=" + businessName,
        {
          headers: {
            Authorization: "Bearer " + localStorage.jwtToken
          }
        }
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
        await axios.delete(url + "/transactions/" + transactionId, {
          headers: {
            Authorization: "Bearer " + localStorage.jwtToken
          }
        });

        Message("Transaction " + transactionId + " deleted successfully!");
      } catch (error) {
        Message(error);
      }
    }
  };
}
