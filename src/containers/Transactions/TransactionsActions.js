import axios from "axios";

export const FETCH_TRANSACTIONS = "FETCH_TRANSACTIONS";
export const FETCH_TRANSACTIONS_FULFILLED = "FETCH_TRANSACTIONS_FULFILLED";
export const FETCH_TRANSACTIONS_REJECTED = "FETCH_TRANSACTIONS_REJECTED";

const URL = process.env.REACT_APP_SERVER_URL;

export function fetchTransactions(businessName) {
  return async dispatch => {
    await dispatch({ type: FETCH_TRANSACTIONS });
    try {
      const { data } = await axios.get(
        URL + "/transactions/?business_name=" + businessName,
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
