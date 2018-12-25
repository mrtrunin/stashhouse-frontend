import axios from "axios";
import Message from "components/Message/Message";

export const FETCH_PAYMENT = "FETCH_PAYMENT";
export const FETCH_PAYMENT_FULFILLED = "FETCH_PAYMENT_FULFILLED";
export const PAYMENT_UPDATE_FIELD = "PAYMENT_UPDATE_FIELD";
export const FETCH_PAYMENT_REJECTED = "FETCH_PAYMENT_REJECTED";
export const RESET_PAYMENT = "RESET_PAYMENT";

const url = process.env.REACT_APP_SERVER_URL;

export function createPayment(
  date_payment,
  transactionId,
  amount,
  sender_name,
  payment_method,
  description,
  business_name
) {
  return async dispatch => {
    let payload = {};

    payload.date_payment = date_payment;
    payload.transaction = transactionId;
    payload.amount = amount;
    payload.sender_name = sender_name;
    payload.payment_method = payment_method;
    payload.description = description;
    payload.business = {
      name: business_name
    };

    try {
      const { data } = await axios.post(url + "/payments/", payload);

      Message("Payment Created!", "success");

      return data;
    } catch (error) {
      Message("Could not create payment: " + error, "error");
    }
  };
}

export function deletePayment(id) {
  return async dispatch => {
    try {
      const { data } = await axios.delete(url + "/payments/" + id + "/");

      Message("Payment " + id + " deleted successfully!", "success");
      return data;
    } catch (error) {
      Message("Could not delete Payment " + id + ": " + error, "error");
    }
  };
}

export function fetchPayment(paymentId) {
  return async dispatch => {
    dispatch({
      type: FETCH_PAYMENT
    });

    try {
      const { data } = await axios.get(url + "/payments/" + paymentId);

      dispatch({
        type: FETCH_PAYMENT_FULFILLED,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: FETCH_PAYMENT_REJECTED,
        payload: error
      });
    }
  };
}

export function updatePayment(
  date_payment,
  transactionId,
  amount,
  sender_name,
  payment_method,
  description,
  paymentId
) {
  return async dispatch => {
    let payload = {};

    payload.date_payment = date_payment;
    payload.transaction = transactionId;
    payload.amount = amount;
    payload.sender_name = sender_name;
    payload.payment_method = payment_method;
    payload.description = description;

    try {
      const { data } = await axios.patch(
        url + "/payments/" + paymentId + "/",
        payload
      );

      Message("Payment Updated Successfully!", "success");

      return data;
    } catch (error) {
      Message("Could not update payment: " + error, "error");
    }
  };
}

export function resetPayment() {
  return async dispatch => {
    dispatch({
      type: RESET_PAYMENT
    });
  };
}

export function updatePaymentField(field, value) {
  return async dispatch => {
    dispatch({
      type: PAYMENT_UPDATE_FIELD,
      field: field,
      payload: value
    });
  };
}
