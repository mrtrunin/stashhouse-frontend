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
      const { data } = await axios.post(url + "/transactions/", payload);

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
        payload
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
      const { data } = await axios.delete(url + "/transactions/" + id);

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
      const { data } = await axios.get(url + "/transactions/" + id);

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
      const { data } = await axios.post(url + "/stock/", payload);

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
        url + "/stock/?transactionId=" + transactionId
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
      const { data } = await axios.get(url + "/stock/" + id);

      return data;
    } catch (error) {
      Message("Could not fetch stock: " + error);
    }
  };
}

export function fetchTransactionPdf(
  transactionId,
  transactionName,
  businessName
) {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        url +
          "/transactions/" +
          transactionId +
          "/pdf?business_name=" +
          businessName
      );

      const href = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = href;
      let filename = transactionName + ".pdf";
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      Message("PDF downloaded successfully!");
      return data;
    } catch (error) {
      Message("Could not download PDF: " + error, "error");
    }
  };
}

export function sendEmail(
  business_name,
  transactionId,
  recipients,
  subject,
  body
) {
  return async dispatch => {
    let formdata = new FormData();
    formdata.append("subject", subject);
    formdata.append("body", body);
    formdata.append("recipients", recipients);

    try {
      const { data } = await axios.post(
        url +
          "/transactions/" +
          transactionId +
          "/send-email?business_name=" +
          business_name,
        formdata
      );
      Message("Email sent successfully!", "success");
      return data;
    } catch (error) {
      Message("Sending email failed: " + error, "error");
    }
  };
}

export function resetTransaction() {
  return async dispatch => {
    dispatch({
      type: TRANSACTION_STATE_RESET
    });
  };
}
