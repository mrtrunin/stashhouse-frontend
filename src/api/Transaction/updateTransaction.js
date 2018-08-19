import store from "store";
import axios from "axios";
import Message from "components/Message";

async function updateTransaction(transactionId, customerId) {
  let url = process.env.REACT_APP_SERVER_URL;

  let payload = {};

  payload.customer = customerId;

  store.dispatch({
    type: "TRANSACTION_STATE_FETCHING"
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

    store.dispatch({
      type: "TRANSACTION_STATE_FETCHED"
    });

    store.dispatch({
      type: "TRANSACTION_STATE_RESET"
    });

    Message("Transaction Updated!");

    return data;
  } catch (error) {
    Message(error);
  }
}

export default updateTransaction;
