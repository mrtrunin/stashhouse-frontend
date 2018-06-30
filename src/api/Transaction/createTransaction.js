import store from "store";
import axios from "axios";
import Message from "components/Message";

async function createTransaction(merchant, transactionType) {
  let url = process.env.REACT_APP_SERVER_URL;

  let payload = {};

  payload.merchant = merchant || null;
  payload.type = transactionType;

  store.dispatch({
    type: "TRANSACTION_STATE_FETCHING"
  });

  try {
    const { data } = await axios.post(url + "/transactions/", payload, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    store.dispatch({
      type: "TRANSACTION_STATE_FETCHED"
    });

    store.dispatch({
      type: "TRANSACTION_STATE_RESET"
    });

    Message("Transaction Created!");

    return data;
  } catch (error) {
    Message(error, "error");
  }
}

export default createTransaction;
