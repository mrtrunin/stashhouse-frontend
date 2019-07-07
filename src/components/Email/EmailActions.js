import axios from "axios";
import Message from "components/Message/Message";

export const FETCH_EMAILS = "FETCH_EMAILS";
export const FETCH_EMAILS_FULFILLED = "FETCH_EMAILS_FULFILLED";
export const FETCH_EMAILS_REJECTED = "FETCH_EMAILS_REJECTED";

const url = process.env.REACT_APP_SERVER_URL;

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

export function fetchEmails(business_name) {
  return async dispatch => {
    await dispatch({ type: FETCH_EMAILS });
    try {
      const { data } = await axios.get(
        url + "/emails/?business_name=" + business_name
      );
      await dispatch({
        type: FETCH_EMAILS_FULFILLED,
        payload: data
      });
    } catch (error) {
      Message("Error fetching emails: " + error, "error");
      dispatch({
        type: FETCH_EMAILS_REJECTED,
        payload: error
      });
    }
  };
}

export function fetchEmailsByPageUrl(pageUrl) {
  return async dispatch => {
    await dispatch({ type: FETCH_EMAILS });
    try {
      const { data } = await axios.get(pageUrl);
      await dispatch({
        type: FETCH_EMAILS_FULFILLED,
        payload: data
      });
    } catch (error) {
      Message("Error fetching emails: " + error, "error");
      dispatch({
        type: FETCH_EMAILS_REJECTED,
        payload: error
      });
    }
  };
}

export function fetchEmailsForTransaction(id) {
  return async dispatch => {
    await dispatch({ type: FETCH_EMAILS });
    try {
      const { data } = await axios.get(url + "/transactions/" + id);
      await dispatch({
        type: FETCH_EMAILS_FULFILLED,
        payload: data.sent_emails
      });
      return data;
    } catch (error) {
      await dispatch({
        type: FETCH_EMAILS_REJECTED,
        payload: error
      });
      Message(
        "Could not fetch emails for transaction " +
          id +
          ": " +
          error.response.data.detail,
        "error"
      );
    }
  };
}
