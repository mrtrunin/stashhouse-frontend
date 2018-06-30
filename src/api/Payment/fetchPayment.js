import store from "store";
import axios from "axios";

async function fetchPayment(paymentId) {
  let url = process.env.REACT_APP_SERVER_URL;

  store.dispatch({
    type: "FETCH_PAYMENT"
  });

  try {
    const { data } = await axios.get(url + "/payments/" + paymentId, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    store.dispatch({
      type: "FETCH_PAYMENT_FULFILLED",
      payload: data
    });
  } catch (error) {
    store.dispatch({
      type: "FETCH_PAYMENT_REJECTED",
      payload: error
    });
  }
}

export default fetchPayment;
