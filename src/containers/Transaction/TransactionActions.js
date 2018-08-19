import axios from "axios";
import Message from "components/Message";

export const FETCH_TRANSACTION = "FETCH_TRANSACTION";
export const FETCH_TRANSACTION_FULFILLED = "FETCH_TRANSACTION_FULFILLED";
export const FETCH_TRANSACTION_REJECTED = "FETCH_TRANSACTION_REJECTED";

export const TRANSACTION_STATE_SET_TRANSACTION_TYPE =
  "TRANSACTION_STATE_SET_TRANSACTION_TYPE";
export const TRANSACTION_STATE_ADD_EXISTING_TRANSACTION =
  "TRANSACTION_STATE_ADD_EXISTING_TRANSACTION";
export const TRANSACTION_STATE_CHANGE_CUSTOMER =
  "TRANSACTION_STATE_CHANGE_CUSTOMER";
export const TRANSACTION_STATE_CHANGE_FROM_WAREHOUSE =
  "TRANSACTION_STATE_CHANGE_FROM_WAREHOUSE";
export const TRANSACTION_STATE_CHANGE_TO_WAREHOUSE =
  "TRANSACTION_STATE_CHANGE_TO_WAREHOUSE";
export const TRANSACTION_STATE_ADD_PRODUCT = "TRANSACTION_STATE_ADD_PRODUCT";
export const TRANSACTION_STATE_REMOVE_PRODUCT =
  "TRANSACTION_STATE_REMOVE_PRODUCT";
export const TRANSACTION_STATE_CHANGE_PRODUCT_ATTRIBUTE =
  "TRANSACTION_STATE_CHANGE_PRODUCT_ATTRIBUTE";
export const TRANSACTION_STATE_FETCHING = "TRANSACTION_STATE_FETCHING";
export const TRANSACTION_STATE_FETCHED = "TRANSACTION_STATE_FETCHED";
export const TRANSACTION_STATE_RESET = "TRANSACTION_STATE_RESET";

const url = process.env.REACT_APP_SERVER_URL;

export function createTransaction(customerId, transactionType, business_name) {
  return async dispatch => {
    let payload = {};

    payload.customer = customerId || null;
    payload.type = transactionType;
    payload.business = {
      name: business_name
    };

    dispatch({
      type: TRANSACTION_STATE_FETCHING
    });

    try {
      const { data } = await axios.post(url + "/transactions/", payload, {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      });

      dispatch({
        type: TRANSACTION_STATE_FETCHED
      });

      dispatch({
        type: TRANSACTION_STATE_RESET
      });

      Message("Transaction Created!");

      return data;
    } catch (error) {
      Message(error, "error");
    }
  };
}

export function updateTransaction(transactionId, customerId) {
  return async dispatch => {
    let payload = {};

    payload.customer = customerId;

    dispatch({
      type: TRANSACTION_STATE_FETCHING
    });

    try {
      const { data } = await axios.patch(
        url + "/transactions/" + transactionId + "/",
        payload,
        {
          headers: {
            Authorization: "Bearer " + localStorage.jwtToken
          }
        }
      );

      dispatch({
        type: TRANSACTION_STATE_FETCHED
      });

      dispatch({
        type: TRANSACTION_STATE_RESET
      });

      Message("Transaction Updated!");

      return data;
    } catch (error) {
      Message(error);
    }
  };
}

export function deleteTransaction(id) {
  return async dispatch => {
    try {
      const { data } = await axios.delete(url + "/transactions/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      });

      Message("Transaction " + id + " deleted successfully!");
      return data;
    } catch (error) {
      Message(error);
    }
  };
}

export function fetchTransaction(id) {
  return async dispatch => {
    try {
      const { data } = await axios.get(url + "/transactions/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      });

      return data;
    } catch (error) {
      Message("Transaction " + id + ": " + error.response.data.detail);
      return error.response;
    }
  };
}