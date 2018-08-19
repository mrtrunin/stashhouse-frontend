import store from "store";
import axios from "axios";

async function fetchCustomer(customerId) {
  let url = process.env.REACT_APP_SERVER_URL;

  store.dispatch({
    type: "FETCH_CUSTOMER"
  });

  try {
    const { data } = await axios.get(url + "/customers/" + customerId, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    store.dispatch({
      type: "FETCH_CUSTOMER_FULFILLED",
      payload: data
    });
  } catch (error) {
    store.dispatch({
      type: "FETCH_CUSTOMER_REJECTED",
      payload: error
    });
  }
}

export default fetchCustomer;
