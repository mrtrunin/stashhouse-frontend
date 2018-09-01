import axios from "axios";
import Message from "components/Message/Message";

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

      Message("Transaction Created!", "success");

      return data;
    } catch (error) {
      Message("Could not create transaction: " + error, "error");
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

      Message("Transaction Updated!", "success");

      return data;
    } catch (error) {
      Message("Could not update transaction: " + error, "error");
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
      Message("Could not delete transaction: " + error, "error");
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
      Message(
        "Could not fetch transaction " + id + ": " + error.response.data.detail,
        "error"
      );
    }
  };
}

export function addProductToTransaction(
  productId,
  fromWarehouseId = null,
  toWarehouseId = null,
  transactionId,
  quantity,
  price,
  tax_rate = null,
  business_name
) {
  return async dispatch => {
    let url = process.env.REACT_APP_SERVER_URL;
    let payload = {};

    payload.price = price;
    payload.tax_rate = tax_rate;
    payload.product = productId;
    payload.from_warehouse = fromWarehouseId;
    payload.to_warehouse = toWarehouseId;
    payload.transaction = transactionId;
    payload.quantity = quantity;
    payload.business = {
      name: business_name
    };

    try {
      const { data } = await axios.post(url + "/stock/", payload, {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      });

      return data;
    } catch (error) {
      Message("Cannot add product to transaction: " + error, "error");
    }
  };
}

export function deleteStockFromTransaction(transactionId) {
  return async dispatch => {
    try {
      const { data } = await axios.delete(
        url + "/stock/?transactionId=" + transactionId,
        {
          headers: {
            Authorization: "Bearer " + localStorage.jwtToken
          }
        }
      );

      Message("Stock deleted!", "success");

      return data;
    } catch (error) {
      Message("Could not delete stock: " + error, "error");
    }
  };
}

export function fetchStock(id) {
  return async dispatch => {
    try {
      const { data } = await axios.get(url + "/stock/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      });

      return data;
    } catch (error) {
      Message("Could not fetch stock: " + error);
    }
  };
}
