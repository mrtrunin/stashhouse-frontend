import store from "store";
import axios from "axios";
import Message from "components/Message";

async function fetchInvoices() {
  let url = process.env.REACT_APP_SERVER_URL;

  await store.dispatch({
    type: "FETCH_INVOICES"
  });

  try {
    const { data } = await axios.get(url + "/invoices/", {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    await store.dispatch({
      type: "FETCH_INVOICES_FULFILLED",
      payload: data
    });

    return data;
  } catch (error) {
    Message(error);
  }
}

export default fetchInvoices;
