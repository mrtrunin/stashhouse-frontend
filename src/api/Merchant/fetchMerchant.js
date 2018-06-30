import store from "store";
import axios from "axios";

async function fetchMerchant(merchantId) {
  let url = process.env.REACT_APP_SERVER_URL;

  store.dispatch({
    type: "FETCH_MERCHANT"
  });

  try {
    const { data } = await axios.get(url + "/merchants/" + merchantId, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    store.dispatch({
      type: "FETCH_MERCHANT_FULFILLED",
      payload: data
    });
  } catch (error) {
    store.dispatch({
      type: "FETCH_MERCHANT_REJECTED",
      payload: error
    });
  }
}

export default fetchMerchant;
