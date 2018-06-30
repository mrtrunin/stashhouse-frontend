import store from "store";
import axios from "axios";

async function fetchPayments() {
  let url = process.env.REACT_APP_SERVER_URL;

  await store.dispatch({
    type: "FETCH_PAYMENTS"
  });

  try {
    const { data } = await axios.get(url + "/payments/", {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    await store.dispatch({
      type: "FETCH_PAYMENTS_FULFILLED",
      payload: data
    });
    return data;
  } catch (error) {
    store.dispatch({
      type: "FETCH_PAYMENTS_REJECTED",
      payload: error
    });
    return error;
  }
}

export default fetchPayments;
