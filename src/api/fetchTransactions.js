import store from "store";
import axios from "axios";
import Message from "components/Message";

async function fetchTransactions() {
  let url = process.env.REACT_APP_SERVER_URL;

  await store.dispatch({
    type: "FETCH_TRANSACTIONS"
  });

  try {
    const { data } = await axios.get(url + "/transactions/", {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    await store.dispatch({
      type: "FETCH_TRANSACTIONS_FULFILLED",
      payload: data
    });

    return data;
  } catch (error) {
    Message(error);
    return error;
  }
}

export default fetchTransactions;
