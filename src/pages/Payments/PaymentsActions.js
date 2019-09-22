import axios from "axios";
import Message from "components/Message/Message";

export const FETCH_PAYMENTS = "FETCH_PAYMENTS";
export const FETCH_PAYMENTS_FULFILLED = "FETCH_PAYMENTS_FULFILLED";
export const FETCH_PAYMENTS_REJECTED = "FETCH_PAYMENTS_REJECTED";
export const FETCH_INVOICES = "FETCH_INVOICES";
export const FETCH_INVOICES_FULFILLED = "FETCH_INVOICES_FULFILLED";
export const FETCH_INVOICES_REJECTED = "FETCH_INVOICES_REJECTED";
export const IMPORT_STATEMENT = "IMPORT_STATEMENT";
export const IMPORT_STATEMENT_FULFILLED = "IMPORT_STATEMENT_FULFILLED";
export const IMPORT_STATEMENT_REJECTED = "IMPORT_STATEMENT_REJECTED";

const url = process.env.REACT_APP_SERVER_URL;

export function fetchPayments(businessName) {
  return async dispatch => {
    await dispatch({
      type: FETCH_PAYMENTS
    });

    try {
      const { data } = await axios.get(
        url + "/payments/?business_name=" + businessName
      );

      await dispatch({
        type: FETCH_PAYMENTS_FULFILLED,
        payload: data
      });
      return data;
    } catch (error) {
      dispatch({
        type: FETCH_PAYMENTS_REJECTED,
        payload: error
      });
      return error;
    }
  };
}

export function fetchPaymentsByPageUrl(pageUrl) {
  return async dispatch => {
    await dispatch({
      type: FETCH_PAYMENTS
    });

    try {
      const { data } = await axios.get(pageUrl);

      await dispatch({
        type: FETCH_PAYMENTS_FULFILLED,
        payload: data
      });
      return data;
    } catch (error) {
      dispatch({
        type: FETCH_PAYMENTS_REJECTED,
        payload: error
      });
      return error;
    }
  };
}

export function fetchInvoices() {
  return async dispatch => {
    await dispatch({
      type: FETCH_INVOICES
    });

    try {
      const { data } = await axios.get(url + "/invoices/");

      await dispatch({
        type: FETCH_INVOICES_FULFILLED,
        payload: data
      });

      return data;
    } catch (error) {
      dispatch({
        type: FETCH_INVOICES_REJECTED,
        payload: error
      });
      Message("Could not fetch invoices: " + error, "error");
    }
  };
}

export function fetchUnpaidInvoices() {
  return async dispatch => {
    await dispatch({
      type: FETCH_INVOICES
    });

    try {
      const { data } = await axios.get(url + "/invoices/", {
        params: {
          unpaid: true
        }
      });

      await dispatch({
        type: FETCH_INVOICES_FULFILLED,
        payload: data
      });

      return data;
    } catch (error) {
      dispatch({
        type: FETCH_INVOICES_REJECTED,
        payload: error
      });
      Message("Could not fetch invoices: " + error, "error");
    }
  };
}

export function importStatement(statementFile, businessName) {
  return async dispatch => {
    const formData = new FormData();
    formData.append("statementFile", statementFile);
    formData.append("business_name", businessName);

    try {
      const { data } = await axios.post(url + "/import_statement/", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      Message("Statement successfully imported! " + data, "success");
    } catch (error) {
      Message("Could not import statement invoices: " + error, "error");
    }
  };
}

export function deletePayments(paymentIds) {
  return async dispatch => {
    for (let paymentId of paymentIds) {
      try {
        await axios.delete(url + "/payments/" + paymentId);

        Message("Payment " + paymentId + " deleted successfully!", "success");
      } catch (error) {
        Message("Could not delete payments: " + error, "error");
      }
    }
  };
}
